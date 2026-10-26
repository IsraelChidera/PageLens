import { GoogleGenAI, Type, type Schema } from "@google/genai";

export const CATEGORIES = ["UX", "SEO", "Accessibility", "Performance", "Content"] as const;
export const PRIORITIES = ["high", "medium", "low"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Priority = (typeof PRIORITIES)[number];

export type AuditReport = {
    summary: string;
    overallScore: number;
    categories: { name: Category; score: number; verdict: string }[];
    strengths: string[];
    recommendations: { title: string; detail: string; category: Category; priority: Priority }[];
};

const auditSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "2-3 sentence overview of the website." },
        overallScore: { type: Type.INTEGER, description: "Overall score from 0 to 100." },
        categories: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, format: "enum", enum: [...CATEGORIES] },
                    score: { type: Type.INTEGER },
                    verdict: { type: Type.STRING, description: "One sentence verdict." },
                },
                required: ["name", "score", "verdict"],
            },
        },
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    detail: { type: Type.STRING },
                    category: { type: Type.STRING, format: "enum", enum: [...CATEGORIES] },
                    priority: { type: Type.STRING, format: "enum", enum: [...PRIORITIES] },
                },
                required: ["title", "detail", "category", "priority"],
            },
        },
    },
    required: ["summary", "overallScore", "categories", "strengths", "recommendations"],
};

const buildPrompt = (url: string) => `You are a senior web consultant performing a website audit.

Audit the website at: ${url}

Evaluate it across five categories: UX, SEO, Accessibility, Performance and Content. Score each from 0 to 100 (be honest and critical; 90+ is exceptional) and give a one-sentence verdict.

Also provide an overallScore (0-100), a 2-3 sentence summary, 3-5 strengths, and 6-10 specific, actionable recommendations. Each recommendation needs a short title (max 8 words), a 1-2 sentence detail explaining what to change and why, its category, and a priority (high, medium or low).

Write in plain, friendly English for a non-technical site owner.`;

const clampScore = (value: unknown) => Math.max(0, Math.min(100, Math.round(Number(value) || 0)));

export async function runAudit(url: string): Promise<AuditReport> {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
        throw new Error("Missing Gemini API key. Add NEXT_PUBLIC_API_KEY to your .env.local file.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: buildPrompt(url),
        config: {
            responseMimeType: "application/json",
            responseSchema: auditSchema,
        },
    });

    let parsed: AuditReport;
    try {
        parsed = JSON.parse(response.text ?? "");
    } catch {
        throw new Error("We couldn't read the AI response. Please try again.");
    }

    return {
        summary: parsed.summary ?? "",
        overallScore: clampScore(parsed.overallScore),
        categories: (parsed.categories ?? []).map((c) => ({ ...c, score: clampScore(c.score) })),
        strengths: parsed.strengths ?? [],
        recommendations: [...(parsed.recommendations ?? [])].sort(
            (a, b) => PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority)
        ),
    };
}

export function reportToMarkdown(report: AuditReport, url: string): string {
    return [
        `# Website audit: ${url}`,
        ``,
        `**Overall score:** ${report.overallScore}/100`,
        ``,
        report.summary,
        ``,
        `## Scores`,
        ...report.categories.map((c) => `- **${c.name}:** ${c.score}/100 — ${c.verdict}`),
        ``,
        `## Recommendations`,
        ...report.recommendations.map(
            (r, i) => `${i + 1}. **${r.title}** (${r.category}, ${r.priority} priority) — ${r.detail}`
        ),
        ``,
        `## What's working`,
        ...report.strengths.map((s) => `- ${s}`),
    ].join("\n");
}
