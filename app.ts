import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import geminiRoutes from './src/routes/gemini_routes';
import perplexityRoutes from './src/routes/perplexity_routes';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
const port = process.env.PORT || 3000;

console.log('Environment Variables: port', process.env.PORT);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HackServe API',
      version: '1.0.0',
      description: 'Backend Server for Hackathons I participate in',
    },
    servers: [
      {
        name: 'Local server',
        description: 'Development server',
        url: `http://localhost:${port}/api`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', geminiRoutes);
app.use('/api/perplexity', perplexityRoutes);

app.get('/', (req, res) => {
  res.send('Express server with TypeScript and Swagger');
});

app.listen(port, () => {
  console.log(`Server is running  port ${port}`);
});