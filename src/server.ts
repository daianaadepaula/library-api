import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './lib/db';

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api/docs`);
	connectDB();
});
