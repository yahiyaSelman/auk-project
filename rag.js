import { GoogleGenerativeAI } from "@google/generative-ai";
import { searchDocuments } from './retrieval';

const API = "AIzaSyBunVJRRcxviu5BFoeJsaA_rCURmgqp0X8";
const genAI = new GoogleGenerativeAI(API);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function generate(prompt, userQuery) {
  try {
    // Retrieve relevant documents based on the user's query
    const retrievedDocs = searchDocuments(userQuery);

    // Retrieved documents into the full query
    const fullQuery = `
      ${prompt} 
      Here is some relevant information to help answer the question:
      ${retrievedDocs.map(doc => doc.content).join('\n')}
      Now answer the user's question: ${userQuery}
    `;

    const result = await model.generateContent(fullQuery);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

export { generate };
