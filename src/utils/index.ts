import jwt from 'jsonwebtoken';
import type { AuthPayload } from '../types/auth-payload.js';
const SECRET = 'THISMYSECRET';

export function encodeToken(payload: any) {
  const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
  return token;
}

export function decodeToken(token: string): AuthPayload {
  const decode = jwt.verify(token, SECRET) as AuthPayload;
  return decode;
}
