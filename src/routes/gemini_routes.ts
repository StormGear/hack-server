import { Router, Request, Response } from 'express';

const router = Router();
import { geminiController } from '../controllers/gemini';

/**
 * @openapi
 * /query-gemini:
 *   post:
 *     tags: [Gemini]
 *     description: Query the Gemini API with symptoms, age, and gender.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symptoms:
 *                 type: string
 *               age:
 *                 type: string
 *               gender:
 *                 type: string
 *             required:
 *               - symptoms
 *               - age
 *               - gender
 */
router.post('/query-gemini', geminiController);

export default router;