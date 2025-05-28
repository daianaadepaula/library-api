import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';
import SwaggerParser from '@apidevtools/swagger-parser';
import path from 'path';

const app = express();
app.use(express.json());

async function setupSwagger() {
  const swaggerSpec = await SwaggerParser.bundle(path.join(__dirname, 'docs', 'swagger.yml'));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

setupSwagger(); // inicializa documentação Swagger

app.use('/api', userRoutes);
app.use(errorHandler);

export default app;
