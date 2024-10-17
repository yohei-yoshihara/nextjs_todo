import bcrypt from "bcryptjs";

export async function generateHashedPassword(password: string) {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}
