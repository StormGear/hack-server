import { Router, Request, Response } from 'express';


const router = Router();
import { geminiController, anotherGeminiController, imageGenController } from '../controllers/gemini';
import { perplexityController } from '../controllers/perplexity';

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

/**
 * @openapi
 * /analyze-image:
 *  post:
 *    tags: [Gemini]
 *    description: Analyze an image using the Gemini API.
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *          schema:
 *           type: object
 *           properties:
 *             imageData:
 *               type: string 
 *             imageType:
 *               type: string
 *             bodyPart:
 *               type: string
 *             additionalInfo:
 *               type: string
 *             mimeType:
 *               type: string
 *               description: The MIME type of the image being analyzed.
 *          required:
 *            - imageData
 *            - imageType
 *            - bodyPart
 *            - mimeType
 */
router.post('/analyze-image', imageGenController)



router.post('/perplexity', perplexityController);

export default router;