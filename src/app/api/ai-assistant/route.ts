import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { extractText, getDocumentProxy } from "unpdf";

// Cache the parsed resume in memory and automatically re-parse whenever public/resume.pdf changes
let cachedResumeText = "";
let lastResumeMtime = 0;

async function getResumeData(): Promise<string> {
  const resumePath = path.join(process.cwd(), "public", "resume.pdf");

  if (!fs.existsSync(resumePath)) {
    throw new Error(
      "Resume PDF file not found at public/resume.pdf. Please make sure resume.pdf is placed in the public folder."
    );
  }

  const stat = fs.statSync(resumePath);

  // If text hasn't been extracted yet or the file was modified since last read, re-parse it
  if (!cachedResumeText || stat.mtimeMs !== lastResumeMtime) {
    const fileBuffer = fs.readFileSync(resumePath);
    const pdf = await getDocumentProxy(new Uint8Array(fileBuffer));
    const result = await extractText(pdf, { mergePages: true });
    cachedResumeText = result.text.trim();
    lastResumeMtime = stat.mtimeMs;
  }

  return cachedResumeText;
}

export async function POST(request: Request) {
  let body: { question?: unknown };
  try {
    body = (await request.json()) as { question?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI assistant is not configured. Set GROQ_API_KEY in .env.local." },
      { status: 503 }
    );
  }

  let resumeData = "";
  try {
    resumeData = await getResumeData();
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to read resume from public/resume.pdf",
      },
      { status: 500 }
    );
  }

  const isDetailedRequest =
    /\b(detail|elaborate|more|explain|tell me more|in depth|full|complete|comprehensive)\b/i.test(
      question
    );

  const systemPrompt = `You are an AI assistant representing Rajendra Pal, answering questions for visitors on his portfolio website.
Below is Rajendra's resume extracted directly from his resume PDF file:

--- RESUME START ---
${resumeData}
--- RESUME END ---

Rules:
1. Answer ONLY using the information provided in the resume above.
2. Never hallucinate or invent information.
3. If information is not mentioned in the resume, politely say "I don't have that information in Rajendra's resume."
4. Be professional, friendly, and conversational.
5. ${isDetailedRequest
      ? "The user wants a detailed answer — provide comprehensive, well-structured information with specifics from the resume."
      : "Provide clear, concise, and complete answers. Never stop or cut off mid-sentence. If listing items, make sure each listed item is fully finished."
    }
6. Speak in third person about Rajendra (e.g., "Rajendra is...", "He has worked on...").
7. Format responses in clean plain text. Bullet points "•" are recommended for lists. 
    Example - 

  ※ Programming Languages - 
  • Python  
  • C C++  
  • C++  
  • JavaScript
  • TypeScript  

  ※ Data Science & Machine Learning - 
  • NumPy 
  • Pandas
  • Matplotlib
  • Seaborn  
  • scikit‑learn 
  • data cleaning
  • data cleaning
  • exploratory 
  • data analysis (EDA)  


8. When asked for skills, projects, experience, or education, present them clearly with bullet points. For each project, briefly state what it is and the key technologies used.`;

  try {
    const client = new Groq({ apiKey });
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
      max_tokens: isDetailedRequest ? 1500 : 1024,
      temperature: 0.4,
    });

    const answer =
      response.choices[0]?.message?.content ?? "I couldn't generate a response.";
    return NextResponse.json({ answer });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected error." },
      { status: 500 }
    );
  }
}
