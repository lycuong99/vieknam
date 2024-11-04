import { Router } from 'express';

const router = Router();

router.post('/auth/sign-in', async (req, res) => {
	res.send({
		message: 'Hello World!'
	});
});

router.post('/auth/sign-up', async (req, res) => {
	res.send({
		message: 'Hello World!'
	});
});

export default router;
