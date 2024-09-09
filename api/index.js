import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import bodyParser from 'body-parser';
import { logger } from './src/utilis/logger.js';
import { successMessage } from './src/helpers/httpStatusCodes.js';
import userRoutes from './src/routes/usersRoutes.js';

dotenv.config();

const app = express();

var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

const PORT = process.env.API_PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors(corsOptions));

app.get('/health', (req, res) => {
    successMessage(res, 'Api is healthy boss 😎👍');
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
    logger.info(`The server is running on port ${PORT}`);
});