const express = require('express');
const departureService = require('../service/departure-details.service');
const helperClass = require('../helperClass/helperClass');
const logger = require('../utilities/logger');

module.exports = function (app) {
  const router = express.Router();
  /**
   * @swagger
   * /train-details/departure/{station}/{auth}:
   *   get:
   *     summary: Retrieve a list of departures
   *     description: Retrieve a list of departures where station code can be used for departures.
   *     parameters:
   *       - name: station
   *         in: path
   *         required: true
   *         type: string
   *       - in: path
   *         name: auth
   *         type: string
   *         required: true
   *     responses:
   *       200:
   *         description: A list of departures.
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
  */
  router.get('/departure/:station/:auth', async function (req, res) {
    // Middle ware to authenticate headers
    await helperClass.validateJWT(req.params.auth).then(async value => {
      logger.info(`Authentication for departure suceeded ${req.params.auth}`); // save in trainLog.log file
      if (value) {
        await departureService.departure(req.params.station, res).then(async response => {
          // Common response for all calls
          logger.info(`Success Response of departure ${req.params.station}`);
          return await helperClass.helperResponse(req, res, response)
        })
      } else {
        // Common Middlwware response for all calls
        logger.info(`Failure Response of departure ${req.params.auth}`);
        return await helperClass.helperResponse(req, res);
      }
    })

  });

  app.use('/train-details', router);
};
