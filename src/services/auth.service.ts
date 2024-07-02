"use server";

import { cookies } from "next/headers";
import { isValidToken } from "@/middleware";
import User from "@/interfaces/user.interface";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/interfaces/jwtPayload.interface";

const url = process.env.NEXT_PUBLIC_EXTERNAL_API_URL;

export async function VerifyUser(email: string, password: string) {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status !== 200) {
      console.error(
        `Login request failed with status: ${response.status} ${response.statusText}`
      );
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    cookies().set("token", data.access_token);
    return true;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
}

export async function getLocalUserId() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const decodedToken = jwtDecode<JwtPayload>(token);
    return decodedToken.sub.id;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Failed to retrieve local user ID");
  }
}

export async function getUserInfo() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${url}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return {
      id: data.sub.id,
      email: data.sub.email,
      firstname: data.sub.firstname,
      lastname: data.sub.lastname,
      role: data.role,
    } as User;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Network response was not ok");
  }
}

export async function isTokenHere() {
  const token = cookies().get("token")?.value || "";
  return isValidToken(
    token,
    new TextEncoder().encode(process.env.NEXT_PUBLIC_EXTERNAL_SECRET_KEY)
  );
}

export async function cleanAndRemoveToken(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete("token");
}

export async function registerUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<boolean> {
  try {
    const response = await fetch(`${url}/auth/register-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstname, lastname }),
    });

    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error during registration:", error);
    return false;
  }
}

export async function changePassword(
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  const token = cookies().get("token")?.value || "";
  if (!token) {
    console.error("No token found in cookies");
    return false;
  }
  try {
    const response = await fetch(`${url}/users/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });

    if (response.status === 201) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}

export async function sendPasswordResetEmail(email: string) {
  try {
    const response = await fetch(`${url}/auth/send-password-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 201) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error during password reset email:", error);
    return false;
  }
}

export async function resetPassword({
  password,
  token,
}: {
  password: string;
  token: string;
}): Promise<boolean> {
  try {
    await fetch(`${url}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, newPassword: password }),
    });
    return true;
  } catch (error) {
    return false;
  }
}
