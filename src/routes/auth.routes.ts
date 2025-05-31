import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { LoginAuthSchema, SignupAuthSchema } from '../dtos/auth.dto';

const router = Router();

router.post('/auth/signup', validate(SignupAuthSchema), AuthController.signup);
router.post('/auth/login', validate(LoginAuthSchema), AuthController.login);
router.post('/auth/logout', AuthController.logout);

export default router;
