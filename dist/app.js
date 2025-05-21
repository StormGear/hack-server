"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const gemini_routes_1 = __importDefault(require("./src/routes/gemini_routes"));
const perplexity_routes_1 = __importDefault(require("./src/routes/perplexity_routes"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api', gemini_routes_1.default);
app.use('/api/perplexity', perplexity_routes_1.default);
app.get('/', (req, res) => {
    res.send('Express server with TypeScript and Swagger');
});
app.listen(port, () => {
    console.log(`Server is running  port ${port}`);
});
