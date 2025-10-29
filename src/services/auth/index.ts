import {
  SignInPayload,
  SignInResponse,
  SignUpPayload,
  SignUpResponse,
} from "../../types/auth";
import api from "../api";

export async function signIn(payload: SignInPayload): Promise<SignInResponse> {
  const { data } = await api.post<SignInResponse>("/auth/signin", payload);
  return data;
}

export async function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
  const { data } = await api.post<SignUpResponse>("/auth/signup", payload);
  return data;
}
