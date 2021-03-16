const request = require('request')
const helperClass = require('../helperClass/helperClass')
async function getDepartures(req) {
    return new Promise((resolve, reject) => {
        const value = process.env.value;
         request(
            {
                url: `${process.env.departure_url}?station=${req}`,
                headers: {
                    "Ocp-Apim-Subscription-Key": value
                }
            },
            function (error, response, body) {
                const parsedResponse = JSON.parse(body);
                if (parsedResponse.statusCode === undefined) {
                    //Factory pattorn to bring out common response
                    return resolve(helperClass.prepareResponse( 200, body));
                }
                else {
                     //Factory pattorn to bring out common error response
                    return reject(helperClass.prepareErrorResponse( parsedResponse.statusCode, parsedResponse.message));
                }
            }
        )})    
}

module.exports = {
    getDepartures
}