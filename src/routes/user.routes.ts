import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../dtos/user.dto';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/users', authenticate, UserController.getAll);
router.get('/users/:id', authenticate, UserController.getById);
router.get('/users/search', authenticate, UserController.getByEmail);
router.post('/users', validate(createUserSchema), UserController.create);
router.put('/users/:id', authenticate, validate(updateUserSchema), UserController.update);
router.delete('/users/:id', authenticate, UserController.remove);

export default router;
