import axios from "axios";
const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendMessage = async ({message, chatId}) => {
  const response = await api.post("api/chats/message", { message, chatId });
  return response.data;
};

export const getChats = async () => {
  const response = await api.get("api/chats");
  return response.data;
};

export const getMessages = async (chatId) => {
  const response = await api.get(`api/chats/${chatId}/messages`);
  return response.data;
};
export const deleteChat = async (chatId) => {
  const response = await api.delete(`api/chats/delete/${chatId}`);
  return response.data;
}