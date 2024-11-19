import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export const dbTransaction = prisma.$transaction;
export const projectModel = prisma.project;
export const memberModel = prisma.members;
export const userModel = prisma.user;
export const orgModel = prisma.organization;
export const orgMemberModel = prisma.organizationMembers;

export const taskModel = prisma.task;