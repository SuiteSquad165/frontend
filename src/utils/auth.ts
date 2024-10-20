import { auth } from "@/firebase/config";

import { jwtDecode } from "jwt-decode";

type JWT = {
  exp: number;
  iat: number;
};

const TOKEN_KEY = "tokenData";

// Store token in sessionStorage
export const storeToken = (accessToken: string, expiresAt: number) => {
  const tokenData = { accessToken, expiresAt };
  sessionStorage.setItem(TOKEN_KEY, btoa(JSON.stringify(tokenData)));
};

const getStoredToken = () => {
  const tokenData = sessionStorage.getItem(TOKEN_KEY);
  return tokenData ? JSON.parse(atob(tokenData)) : null;
};

// Fetch a new token if no valid one exists
const fetchNewToken = async (): Promise<string> => {
  if (!auth.currentUser) throw new Error("No authenticated user found");

  const accessToken = await auth.currentUser.getIdToken(true); // Force refresh token
  const decoded = jwtDecode<JWT>(accessToken);
  const expiresAt = decoded.exp * 1000; // Convert to milliseconds

  storeToken(accessToken, expiresAt);
  return accessToken;
};

// Get access token, checking validity and refreshing if needed
export const getAccessToken = async (): Promise<string> => {
  const tokenData = getStoredToken();
  if (tokenData) {
    const { accessToken, expiresAt } = tokenData;
    const now = Date.now();
    if (expiresAt > now) return accessToken; // Token still valid
  }
  return await fetchNewToken(); // Fetch a new token if expired or not found
};
