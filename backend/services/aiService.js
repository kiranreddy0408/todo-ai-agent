const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateTodoSummary(todos) {
  const prompt = `
    You are an expert productivity assistant.
    Given the following list of todos, generate a detailed, engaging summary with actionable insights.
    - Highlight key tasks and priorities.
    - Suggest improvements or next steps if possible.
    - Use clear, friendly language and add minimal relevant emojis.
    - Format the output in Markdown using bullet points (each point should start with "- ") and ensure each point is on a new line.

    Todo List:
    ${JSON.stringify(todos, null, 2)}
  `;
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent(prompt);

  let summary = result.response.text();

  summary = summary.replace(/(\r\n|\r|\n)/g, '\n\n');
  summary = summary.replace(/\*\*/g, '*').replace(/\*/g, '');

  return summary;
}

async function improveWriting(title, description) {
  const prompt = `
    Improve the following task title and description by fixing grammar, adding emojis, and making it more engaging.
    Provide the output in the following structured format:
    Title: <short improved title>
    Description: <short improved description>

    Title: ${title}
    Description: ${description}
  `;
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const result = await model.generateContent(prompt);
  const improvedText = result.response.text();
  console.log('Improved writing:', improvedText);

  // Parse the improved text into title and description
  const titleMatch = improvedText.match(/Title:\s*(.+)/);
  const descriptionMatch = improvedText.match(/Description:\s*(.+)/);

  return {
    title: titleMatch ? titleMatch[1].trim() : title,
    description: descriptionMatch ? descriptionMatch[1].trim() : description,
  };
}

module.exports = { generateTodoSummary, improveWriting };
