import { Application, Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";



export const geminiController = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { symptoms, age, gender } = req.body;
        console.log('Received request body:', req.body);
        // Validate request body
        if (!req.body || !symptoms || !age || !gender) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
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
    console.log('Gemini response:', response.text);
    res.status(200).json({
        message: 'Gemini controller response',
        data: response.text,
    });
} catch (error) {
    console.error('Error in Gemini controller:', error);
    res.status(500).json({
        error: 'Internal server error',
    });
    }
};

export const anotherGeminiController = async (req: Request, res: Response) : Promise<void> => {
    const { symptoms, age, gender } = req.body;
    console.log('Received request body:', req.body);
    // Validate request body
    if (!req.body || !symptoms || !age || !gender) {
        res.status(400).json({ error: 'Invalid request body' });
        return;
    }
    const apiKey = process.env.GEMINI_API_KEY;
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `As a medical assistant, analyze these symptoms for a ${age} year old ${gender}: "${symptoms}". 
                      Provide a structured JSON response with the following format:
                      {
                        "possibleConditions": ["list of top 3-5 possible conditions"],
                        "differentialDiagnosis": ["list of 3-5 alternative diagnoses to consider"],
                        "recommendations": ["list of 3-5 recommendations"],
                        "managementOptions": ["list of 3-5 management options"],
                        "severity": "low/medium/high based on symptoms",
                        "sources": [{"title": "Article title", "url": "URL to PubMed or trusted medical source"}]
                      }
                      Ensure the response is medically accurate, evidence-based, and focuses on only the most relevant conditions for the symptoms. Only return valid JSON.`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                topK: 32,
                topP: 0.95,
                maxOutputTokens: 1024,
              }
            }),
          });
      
          const data = await response.json();
          console.log("Gemini API response:", data);
          res.status(200).json(data);
    } catch (error) {
        console.error('Error in Gemini controller:', error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};
   