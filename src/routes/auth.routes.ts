import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { LoginAuthSchema, SignupAuthSchema } from '../dtos/auth.dto';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/auth/signup', validate(SignupAuthSchema), AuthController.signup);
router.post('/auth/login', validate(LoginAuthSchema), AuthController.login);
router.post('/auth/logout', authenticate, AuthController.logout);
router.post('/auth/refresh-token', AuthController.refreshToken);

export default router;
