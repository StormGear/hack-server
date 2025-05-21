import { Request, Response } from "express";
import { config } from 'dotenv';
import axios from 'axios';

config();

const apiKey = process.env.SONAR_API_KEY;

export const perplexityController = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { symptoms, age, gender } = req.body;
        console.log('Received request body:', req.body);
        // Validate request body
        if (!req.body || !symptoms || !age || !gender) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }
        
     const options = {
            method: 'POST',
            url: 'https://api.perplexity.ai/chat/completions',
            headers: {
                Authorization: `Bearer ${apiKey}`, 
                'Content-Type': 'application/json'
            },
            data: {
                model: "sonar-reasoning",
                messages: [
                    {
                        role: "system",
                        content: "Be precise and concise."
                    },
                    {
                        role: "user",
                        content: `
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
        `
                    }
                ]
            },
            max_tokens: 1024,
            temperature: 0.2,
            top_k: 32,
            top_p: 0.95,
        };

        const response = await axios(options);

        console.log('Perplexity response:', response.data);
        res.status(200).json({
            message: 'Perplexity controller response',
            data: response.data,
        });


    } catch (error) {
        console.error('Error in Perplexity controller:', error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};