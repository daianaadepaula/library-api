import path from 'path';
import SwaggerParser from '@apidevtools/swagger-parser';

const swaggerPath = path.join(__dirname, 'swagger.yml');

export async function getSwaggerSpec() {
  return await SwaggerParser.bundle(swaggerPath);
}
