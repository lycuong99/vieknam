import { Router } from 'express';

const router = Router();

router.post('/auth/org', async (req, res) => {
	res.send({
		message: 'Hello World!'
	});
});

export default router;
