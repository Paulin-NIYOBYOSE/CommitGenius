import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function generateCommitMessage(diff) {
    try {
        const prompt = `Analyze the following Git diff and write a concise, professional commit message following conventional commit format. Focus on what changed and why:

${diff}

Requirements:
- Use imperative mood (e.g., "Add", "Fix", "Update")
- Be specific about what changed
- Keep it under 50 characters if possible
- Don't include quotes in your response

Commit message:`;
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 150,
        });
        return response.choices[0]?.message?.content?.trim() || 'Update code';
    }
    catch (err) {
        console.error(err);
        return 'Update code';
    }
}
//# sourceMappingURL=aiHelper.js.map