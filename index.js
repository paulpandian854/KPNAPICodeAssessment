const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var cors = require('cors');
const logger = require('./utilities/logger');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
};
const app = express()
const port = 3002;
app.use(cors());
require('dotenv'). config();
require('./controller/jwtLib')(app);
require('./controller/train-details.controller')(app);
require('./controller/departure-details.controller')(app);

app.use(cors());
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./controller/*.js'],
  };
const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`Train Details App listening at http://localhost:${port}`)
})