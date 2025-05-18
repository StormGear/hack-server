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
                model: "sonar",
                messages: [
                    {
                        role: "system",
                        content: "Be precise and concise."
                    },
                    {
                        role: "user",
                        content: "How many stars are there in our galaxy?"
                    }
                ]
            }
        };

        const response = await axios(options);

        console.log('Perplexity response:', response.data);

    } catch (error) {
        console.error('Error in Perplexity controller:', error);
        res.status(500).json({
            error: 'Internal server error',
        });
    }
};