import { compare, hash } from 'bcryptjs';

export async function hashedPassword(password) {
  const result = await hash(password, 5);
  return result;
}

export async function verifyPassword(password, hashedPass) {
  const result = await compare(password, hashedPass);
  return result;
}
