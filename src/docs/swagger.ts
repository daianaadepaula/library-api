import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path'

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Library API',
			version: '1.0.0',
			description: 'Library Management API',
			contact: {
				name: 'Daiana de Paula',
				url: 'https://github.com/daianaadepaula',
			},
		},
		servers: [{ url: 'http://localhost:3001/api' }],
	},
	apis: [
		path.resolve(__dirname, '../routes/*.ts'),
		path.resolve(__dirname, '../docs/schemas/*.ts')
	],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
