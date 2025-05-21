"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiController = void 0;
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const geminiController = async (req, res) => {
    try {
        const { symptoms, age, gender } = req.body;
        console.log('Received request body:', req.body);
        // Validate request body
        if (!req.body || !symptoms || !age || !gender) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `
        As a medical assistant, analyze these symptoms for a ${age} year old ${gender}: "${symptoms}". 
                      Provide a structured JSON response with the following format:
                      {
                        "possibleConditions": ["list of top 3-5 possible conditions"],
                        "differentialDiagnosis": ["list of 3-5 alternative diagnoses to consider"],
                        "recommendations": ["list of 3-5 recommendations"],
                        "managementOptions": ["list of 3-5 management options"],
                        "severity": "low/medium/high based on symptoms",
                        "sources": [{"title": "Article title", "url": "URL to PubMed or trusted medical source"}]
                      }
                      Ensure the response is medically accurate, evidence-based, and focuses on only the most relevant conditions for the symptoms. Only return valid JSON.
        `,
            config: {
                temperature: 0.2,
                topK: 32,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        });
        const data = await response;
        res.status(200).json({
            message: 'Gemini controller response',
            data: data,
        });
    }
    catch (error) {
        console.error('Error in Gemini controller:', error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};
exports.geminiController = geminiController;
