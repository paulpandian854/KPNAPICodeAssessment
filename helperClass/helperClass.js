const stations = require('../models/stations.js');
const jwt = require("jsonwebtoken");
// Class which contains all the common code 
async function helperResponse(req, res, args) {
    return res.status(args ? args.code : 403).json({
        //response: JSON.parse(args)
        body: args ? args : { code: 403, message: 'Unauthorized' } // Notparsing value for faster response
    });
}

async function validateJWT(req) {
    const authHeader = req
    const token = authHeader && authHeader.split('.')[1]
    if (token == null) return false// if there isn't any token

    return await jwt.verify(authHeader, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return false
        return true // pass the execution off to whatever request the client intended
    })
}

function prepareResponse(statusCode, Payload) {
    return { code: statusCode, message: Payload };
}

function prepareErrorResponse(statusCode, Payload) {
    return { code: statusCode, message: Payload };
}

async function generateJWT(req, res, args) {
    res.setHeader('content-type','application/json');
    return res.status(200).json({ code: 200, message: jwt.sign(args, process.env.TOKEN_SECRET) });
}

module.exports = {
    helperResponse,
    validateJWT,
    prepareResponse,
    prepareErrorResponse,
    generateJWT
}
