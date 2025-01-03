"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getUserById } from "./data";

export type SessionPayload = {
  userId: number;
  role: string;
  expiresAt: Date;
};

const secretKey = "dummy-secret";
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    console.log("decrypt: secretKey = ", secretKey);
    console.log("decrypt: session = ", session);
    console.log("decrypt: encodedKey = ", encodedKey);
    const result = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    console.log("decrypt, result = ", result);
    return result.payload;
  } catch (error) {
    console.trace();
    console.log("Failed to verify session, error = ", error);
  }
}

export async function createSession(id: number, role: string) {
  console.log(`createSession, id = ${id}, role = ${role}`);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId: id, role, expiresAt });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: false, // this must be true if running on a production
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  console.log("createSession finished");
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: false, // this must be true if running on a production
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function getUserFromSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);
  if (!session || !payload) {
    return null;
  }
  return await getUserById(payload.userId);
}

export async function deleteSession() {
  (await cookies()).delete("session");
}
