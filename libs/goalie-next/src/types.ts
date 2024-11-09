import { User } from '@prisma/client';

export type GoalieUser = Pick<User, 'id' | 'email' | 'name' | 'photo'> & { exp: number };
