"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const gemini_1 = require("../controllers/gemini");
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
router.post('/query-gemini', gemini_1.geminiController);
exports.default = router;
