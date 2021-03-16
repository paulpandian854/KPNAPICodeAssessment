const express = require('express');
const stationService = require('../service/train-details.service');
const helperClass = require('../helperClass/helperClass');
const logger = require('../utilities/logger');

module.exports = function (app) {
  const router = express.Router();
  /**
   * @swagger
   * /train-details/stations/{auth}:
   *   get:
   *     summary: Retrieve a list of statins
   *     description: Retrieve a list of stations where users can use station code for departures.
   *     parameters:
   *       - in: path
   *         name: auth
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: A list of stations.
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
  router.get('/stations/:auth', async function (req, res) {
    // Middle ware to authenticate headers
    await helperClass.validateJWT(req.params.auth).then(async value => {
      logger.info(`Authentication for stations suceeded ${req.params.auth}`);
      if (value) {
        //Call to Generate Station
        await stationService.stations(res).then(async response => {
          logger.info(`Success Response of stations`);
          //Common middleware success response
          return await helperClass.helperResponse(req, res, response)
        })
      } else {
        //Common middlware response
        logger.info(`Failure Response of stations ${req.params.auth}`);
        return await helperClass.helperResponse(req, res)
      }
    });
  });

  app.use('/train-details', router);
};
