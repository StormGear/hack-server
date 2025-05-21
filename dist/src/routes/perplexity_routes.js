"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perplexity_1 = require("../controllers/perplexity");
const express_1 = require("express");
const router = (0, express_1.Router)();
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
router.post('/query-perplexity', perplexity_1.perplexityController);
exports.default = router;
