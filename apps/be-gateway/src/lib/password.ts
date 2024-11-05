import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(pwd: string) {
	return await bcrypt.hash(pwd, saltRounds);
}

export async function comparePassword(pwd: string, hash: string) {
	return await bcrypt.compare(pwd, hash);
}
