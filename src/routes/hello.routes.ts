import { Router } from 'express';
import { helloController } from '../controllers/hello.controllers';

const router = Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     tags:
 *       - Hello
 *     summary: Retorna uma mensagem de boas vindas
 *     responses:
 *       200:
 *         description: Hello world retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hello'
 */
router.get('/hello', helloController);

export default router;
