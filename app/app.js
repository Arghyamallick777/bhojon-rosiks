require("dotenv").config();
const express = require("express");
const cors = require("cors");
const i18n = require('i18n');

/** Import Swagger */
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Initialize the redis connection
require('../connectors/redis.connector');

const v1Routes = require("../api/v1/routes");
const ErrHandlerEndware = require('../endwares/error-handler.endware');
const ResponseHandlerEndware = require('../endwares/response.endware');
const AuthMiddleware = require('../middlewares/auth.middleware');
const EncDecMiddleware = require('../middlewares/security.middleware');
const {envs} = require('../lib');
global.clog = function(...messages) {
  if(!envs.isProd()) {
    console.log(...messages);
  }
}
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

//Define Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.DOC_TITLE || "API documation",
      version: "1.0.0",
    },
    servers:[
      {
        url: `http://localhost:${PORT}/api/v1`
      }
      // Please add more versioning server endpoints
    ]
  },
  apis: [`${__dirname}../api/v1/routes/index.js`]
}
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

/**
 * Initialize the i18n middleware
 */
 i18n.configure({
  locales: ['en'],
  defaultLocale: 'en',
  autoReload: true,
  directory: __dirname + '/../languages',
  syncFiles: true,
  fallbackLng: "en",
});
app.use(i18n.init);
// Basic middleware to integrate some basic head.
app.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-uid");
  i18n.setLocale(req.headers["accept-language"] || 'en');
  next();
});
// Test route
app.get('/', (req, res) => {
  res.send("API is running...");
});
// API routes initiated
app.use("/api/v1", [
    AuthMiddleware.verifyAuth, 
    AuthMiddleware.verifySession, 
    EncDecMiddleware.decryptRequestPayload], 
    v1Routes);
// Add more version here

// Basic endwares to integrate the response or error handles (With Logger)
app.use(ErrHandlerEndware.errorLogger);
app.use(ErrHandlerEndware.errorResponder);
app.use(ErrHandlerEndware.failSafeHandler);
app.use(ResponseHandlerEndware.handleFinalResponse);

module.exports = app;