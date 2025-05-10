import { Router, Request, Response } from 'express';

const router = Router();
import { geminiController, anotherGeminiController } from '../controllers/gemini';

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


/**
 * @openapi
 * /another-gemini:
 *   post:
 *     tags: [Gemini]
 *     description: Another endpoint for Gemini API.
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
router.post('/another-gemini', anotherGeminiController);

export default router;