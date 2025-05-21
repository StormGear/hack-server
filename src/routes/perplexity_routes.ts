
import { perplexityController } from '../controllers/perplexity';
import { Router } from 'express';


const router = Router();
/**
 * @openapi
 * /query-perplexity:
 *   post:
 *     tags: [Perplexity]
 *     description: Query the Perplexity API with symptoms, age, and gender.
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
router.post('/query-perplexity', perplexityController);

export default router;