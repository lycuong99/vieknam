import { User, UserStatus } from '@prisma/client';
import { Router } from 'express';
import { mdUserAdd, mdUserFindEmail } from '@shared/models';
import { comparePassword, hashPassword } from '../../lib/password';
import { generateAccessToken, generateRefreshToken } from '../../lib/jwt';
import { validateRegisterUser } from '@shared/validation';

const router = Router();

router.post('/auth/sign-in', async (req, res) => {
	try {
		const body = req.body as Pick<User, 'email' | 'password'>;

		const foundUser = await mdUserFindEmail(body.email);

		if (!foundUser) {
			return res.status(400).json({ status: 400, message: 'Your credential is invalid' });
		}

		const matchPassword = await comparePassword(body.password, foundUser.password);

		if (!matchPassword) {
			return res.status(400).json({ status: 400, message: 'Your email or password is invalid' });
		}

		const accessToken = generateAccessToken({
			id: foundUser.id,
			email: foundUser.email,
			name: foundUser.name,
			photo: foundUser.photo
		});
		const refreshToken = generateRefreshToken({
			email: foundUser.email
		});

		res.setHeader('Authorization', accessToken);
		res.setHeader('RefreshToken', refreshToken);

		res.json({
			status: 200,
			message: 'Login success',
			data: {
				id: foundUser.id,
				name: foundUser.name,
				email: foundUser.email,
				photo: foundUser.photo
			}
		});
	} catch (error) {
		res.json({
			status: 500,
			message: error.message
		});
	}
});

router.post('/auth/sign-up', async (req, res) => {
	try {
		console.log(req.body);

		const body = req.body as User;
		const { error, errorArr, data } = validateRegisterUser(body);
		if (error && errorArr) {
			return res.json({ status: 400, error: errorArr });
		}

		const resultData = data as User;

		const foundUser = await mdUserFindEmail(body.email);
		if (foundUser) {
			return res.status(400).json({ status: 400, message: 'Your email is already registered' });
		}

		const hashedPassword = await hashPassword(resultData.password);

		const user = await mdUserAdd({
			email: resultData.email,
			password: hashedPassword,
			name: resultData.name,
			country: null,
			bio: null,
			dob: null,
			status: UserStatus.ACTIVE,
			photo: null,

			createdAt: new Date(),
			createdBy: null,
			updatedAt: null,
			updatedBy: null
		});

		res.json({
			message: 'Register success',
			data: user
		});
	} catch (error) {
		console.error(error);
		res.json({
			status: 500,
			error: error.message
		});
	}
});

export default router;
