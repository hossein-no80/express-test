// types/auth-payload.ts
import type { JwtPayload } from 'jsonwebtoken';

export interface AuthPayload extends JwtPayload {
  id: string;
}
