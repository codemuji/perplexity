import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function register({ email, username, passoword }) {
  const response = await api.post("/api/auth/register", {
    email,
    passoword,
    username,
  });
  return response.data;
}

export async function login({ email, passoword }) {
  const response = await api.post("/api/auth/login", { email, passoword });
  return response.data;
}

export async function getMe() {
    const response  = await api.get("/api/auth/get-me")
}