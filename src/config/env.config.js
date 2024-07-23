require('dotenv').config(); // Load environment variables from .env file

const SECRET = {
    SOCKET_SERVER: process.env.SOCKET_SERVER,
    PORT: process.env.PORT,
    ENVIRONMENT: process.env.ENVIRONMENT,
    MONGODB_URI_DEV: process.env.MONGODB_URI_DEV,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_AUTH_SECRET: process.env.JWT_AUTH_SECRET,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_PASSWORD: process.env.JWT_ACCESS_PASSWORD,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASS: process.env.GMAIL_PASS,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
    SERVER_URL: process.env.SERVER_URL
};

module.exports = SECRET;
