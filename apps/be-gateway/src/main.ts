/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express, { Application } from 'express';
import * as path from 'path';
import cors from 'cors';
import router from './routers';
const app: Application = express();

app.use(
	cors({
		exposedHeaders: ['Authorization', 'RefreshToken']
	})
);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
	res.send({ message: 'Welcome to be-gateway!' });
});

app.use('/api', router);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
