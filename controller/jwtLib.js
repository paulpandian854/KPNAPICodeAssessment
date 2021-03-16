const express = require('express');
const stationService = require('../service/train-details.service');
const helperClass = require('../helperClass/helperClass');
module.exports = function (app) {
  const router = express.Router();

  /**
   * @swagger
   * /jwt/{userName}:
   *   get:
   *     summary: Generate JWT token
   *     description: Generate JWT token that can be used as a header.
   *     parameters:
   *       - in: path
   *         name: userName
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: JWT token.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *       400:
   *         description: Bad Request.
   *         content:
   *           application/json:
   *             schema:
   *               type: object  
   *       401:
   *         description: Unauthorized- Not authenticated.
   *         content:
   *           application/json:
   *             schema:
   *               type: object  
   *       404:
   *         description: Not Found.
   *         content:
   *           application/json:
   *             schema:
   *               type: object 
   *       500:
   *         description: Internal Server Error.
   *         content:
   *           application/json:
   *             schema:
   *               type: object 
   *                   
  */
  router.get('/jwt/:userName', async function (req, res) {
       const userName = req.params.userName;
       //Api Call to generate JWT
       return await helperClass.generateJWT(req, res, userName)
  });
  
  app.use('/', router);
};
