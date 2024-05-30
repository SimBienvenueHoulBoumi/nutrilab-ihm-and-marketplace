import jwt from 'jsonwebtoken';

const SECRET_KEY: string = process.env.SECRET_KEY!;

export default function isValidToken(token: string): boolean {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}
