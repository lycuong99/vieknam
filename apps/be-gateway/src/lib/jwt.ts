import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret';
const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY || 'secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '1d';

export function generateAccessToken(payload: object) {
	return sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
}

export function generateRefreshToken(payload: object) {
	return sign(payload, JWT_REFRESH_SECRET_KEY, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}

export function verifyToken(token: string) {
	return new Promise((resolve, reject) => {
		verify(token, JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

export function verifyRefreshToken(token: string) {
	return new Promise((resolve, reject) => {
		verify(token, JWT_REFRESH_SECRET_KEY, (err, decoded) => {
			if (err) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}
