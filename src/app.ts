import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import SwaggerParser from '@apidevtools/swagger-parser';
import path from 'path';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

async function setupSwagger() {
  const swaggerSpec = await SwaggerParser.bundle(path.join(__dirname, 'docs', 'swagger.yml'));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

setupSwagger();

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

export default app;
