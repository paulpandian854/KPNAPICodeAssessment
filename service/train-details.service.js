const stations = require('../models/stations.js');

exports.stations = async function (req, res) {
    return await stations.getStations().then(value => {
        return value;
    }).catch(err => {
        return err;
    });
}
