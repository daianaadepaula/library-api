import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { createUserSchema, updateUserSchema } from '../dtos/user.dto';

const router = Router();

router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getById);
router.post('/users', validate(createUserSchema), UserController.create);
router.put('/users/:id', validate(updateUserSchema), UserController.update);
router.delete('/users/:id', UserController.remove);

export default router;
