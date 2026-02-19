import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeCodeWithAI(code, fileName, context = {}) {
  try {
    const prompt = `You are an expert code analyzer. Analyze this code for bugs and issues.

File: ${fileName}
Language: ${context.language || 'JavaScript/TypeScript'}
Framework: ${context.framework || 'Unknown'}

Code:
\`\`\`
${code}
\`\`\`

Find and return a JSON array of issues with this exact format:
[
  {
    "type": "SYNTAX|TYPE|LOGIC|IMPORT|LINTING|INDENTATION|SECURITY",
    "line": <line_number>,
    "message": "Description of the issue",
    "severity": "critical|high|medium|low",
    "suggestedFix": "How to fix it"
  }
]

Focus on:
1. Syntax errors
2. Type errors
3. Logic bugs
4. Unused imports
5. Security vulnerabilities
6. Performance issues

Return ONLY the JSON array, no other text.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert code analyzer that finds bugs and suggests fixes. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2,
      max_tokens: 2000
    });

    const content = response.choices[0].message.content;
    
    // Parse JSON response
    const issues = JSON.parse(content);
    
    return issues;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

export async function generateFix(bugDescription, code, context = {}) {
  try {
    const prompt = `Generate a fix for this bug:

Bug: ${bugDescription}

Current Code:
\`\`\`
${code}
\`\`\`

Provide:
1. Fixed code
2. Explanation of the fix
3. Why this fix works

Return as JSON:
{
  "fixedCode": "...",
  "explanation": "...",
  "confidence": 0.0-1.0
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert programmer that fixes bugs. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('Fix Generation Error:', error);
    throw new Error(`Fix generation failed: ${error.message}`);
  }
}
