import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeCodeWithAI(code, fileName, context = {}) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-api-key-here') {
      console.warn('⚠️ OpenAI API key not configured, using pattern-based analysis');
      return generateMockIssues(code, fileName);
    }

    console.log(`🤖 AI analyzing ${fileName}...`);

    const prompt = `Analyze this ${context.language || 'code'} file for bugs and issues.

File: ${fileName}

Code:
\`\`\`
${code.substring(0, 4000)}
\`\`\`

Find bugs and return ONLY a JSON array (no other text):
[
  {
    "type": "LINTING|SYNTAX|LOGIC|IMPORT|TYPE|INDENTATION|SECURITY",
    "line": <number>,
    "message": "brief description",
    "severity": "critical|high|medium|low"
  }
]

Focus on:
- Syntax errors
- Unused imports
- Logic bugs
- Type errors
- Security issues
- Code smells

Return ONLY valid JSON array.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a code analyzer. Return ONLY valid JSON array of issues. No markdown, no explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 1000,
      timeout: 25000
    });

    const content = response.choices[0].message.content.trim();
    
    // Extract JSON from response
    let jsonStr = content;
    if (content.includes('```json')) {
      jsonStr = content.split('```json')[1].split('```')[0].trim();
    } else if (content.includes('```')) {
      jsonStr = content.split('```')[1].split('```')[0].trim();
    } else if (content.includes('[')) {
      jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
    }
    
    const issues = JSON.parse(jsonStr);
    
    if (!Array.isArray(issues)) {
      throw new Error('AI response is not an array');
    }
    
    console.log(`✅ AI found ${issues.length} issues in ${fileName}`);
    return issues.slice(0, 10); // Limit to 10 issues per file
  } catch (error) {
    console.error(`❌ AI Analysis Error for ${fileName}:`, error.message);
    // Fallback to pattern-based detection
    console.log(`⚙️ Using pattern-based detection for ${fileName}`);
    return generateMockIssues(code, fileName);
  }
}

function generateMockIssues(code, fileName) {
  const issues = [];
  const lines = code.split('\n');
  
  // Simple pattern-based detection
  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Detect unused imports
    if (line.includes('import') && line.includes('from') && !code.includes(line.match(/import\s+(\w+)/)?.[1] || '___')) {
      issues.push({
        type: 'IMPORT',
        line: lineNum,
        message: 'unused import statement',
        severity: 'low',
        suggestedFix: 'remove the import statement'
      });
    }
    
    // Detect console.log
    if (line.includes('console.log')) {
      issues.push({
        type: 'LINTING',
        line: lineNum,
        message: 'console.log statement found',
        severity: 'low',
        suggestedFix: 'remove console.log or use proper logging'
      });
    }
    
    // Detect missing semicolons (simple check)
    if (line.trim() && !line.trim().endsWith(';') && !line.trim().endsWith('{') && !line.trim().endsWith('}') && !line.includes('//')) {
      issues.push({
        type: 'SYNTAX',
        line: lineNum,
        message: 'missing semicolon',
        severity: 'medium',
        suggestedFix: 'add semicolon at end of statement'
      });
    }
    
    // Detect var usage
    if (line.includes('var ')) {
      issues.push({
        type: 'LINTING',
        line: lineNum,
        message: 'use let or const instead of var',
        severity: 'medium',
        suggestedFix: 'replace var with let or const'
      });
    }
  });
  
  console.log(`⚠️ Using mock analysis: found ${issues.length} issues in ${fileName}`);
  return issues.slice(0, 5); // Limit to 5 issues per file
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
