import { User } from '@prisma/client';
import { Request } from 'express';

export type JWTPayload = Pick<User, 'id' | 'email' | 'name' | 'photo'>;

export interface AuthRequest extends Request {
	authen: JWTPayload;
}
