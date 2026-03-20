import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
} from "@langchain/core/messages";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});
const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

// export async function testAi() {
//   model.invoke("Can you write code for me").then((response) => {
//     console.log(response.text);
//   });
// }

export async function generateResponse(messages) {
  const response = await model.invoke(
    messages.map((msg) => {
      if (msg.role === "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role === "ai") {
        return new AIMessage(msg.content);
      }
    }),
  );
  return response.text;
}

export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(
      "You are a helpful assistant that generates concise and relevant chat titles based on the content of the conversation. The title should be no more than 5 words and should capture the essence of the discussion. Please provide a title that accurately reflects the main topic or theme of the conversation.",
    ),
    new HumanMessage(
      `Generate a chat title for the following conversation: ${message}`,
    ),
  ]);

  return response.text;
}
