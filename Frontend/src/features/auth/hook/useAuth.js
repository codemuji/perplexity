import { useDispatch } from "react-redux";
import { register, login, getMe } from "../service/auth.api.js";
import { setUser, setLoading, setError } from "../auth.slice.js";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister(email, username, passoword) {
    try {
      dispatch(setLoading(true));
      const data = await register({ email, username, passoword });
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin(email, passoword) {
    try {
      dispatch(setLoading(true));
      const data = await login({ email, passoword });
      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Failed to fetch user data"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
}
