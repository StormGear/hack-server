interface Config {
  port: number;
  geminiApiKey: string;
  nodeEnv: string;
}

export const appConfig: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  nodeEnv: process.env.NODE_ENV || 'development'
};

// Validate required config
if (!appConfig.geminiApiKey) {
  throw new Error('GEMINI_API_KEY environment variable is required');
}