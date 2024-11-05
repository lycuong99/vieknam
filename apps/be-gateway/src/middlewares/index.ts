import { extractToken, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../lib/jwt';
import { AuthRequest, JWTPayload } from '../types';
import { NextFunction, Response } from 'express';

const HeaderKeys = {
	Authorization: 'Authorization',
	RefreshToken: 'RefreshToken'
};
export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
	const headers = req.headers;
	const authorization = headers.authorization;
	const refreshToken = headers.refreshtoken as string;

	try {
		const validToken = extractToken(authorization);

		if (validToken) {
			const { email, id, name, photo, ...rest } = validToken as JWTPayload;
			req.authen = {
				email,
				id,
				name,
				photo
			};

			return next();
		}

		const validRefeshToken = await verifyRefreshToken(refreshToken);
		if (validRefeshToken) {
			const user = validToken as JWTPayload;

			const accessToken = generateAccessToken({
				id: user.id,
				email: user.email,
				name: user.name,
				photo: user.photo
			});

			const refreshToken = generateRefreshToken({
				id: user.id,
				email: user.email,
				name: user.name,
				photo: user.photo
			});

			res.setHeader(HeaderKeys.Authorization, accessToken);
			res.setHeader(HeaderKeys.RefreshToken, refreshToken);

			req.authen = user;
		}

		return next();
	} catch (error) {
		console.log('authMiddlware::', error);
		return res.status(401).send({
			message: 'Unauthorized'
		});
	}
}
