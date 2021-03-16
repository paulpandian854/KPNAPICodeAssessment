const stations = require('../models/departures.js');

exports.departure = async function (req, res) {
    return await stations.getDepartures(req).then(value => {
        return value;
    }).catch((err) =>{
        return err;
    });
}
