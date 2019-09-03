const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/c1d01edb582b56708096be85d4fb6dd1/' + lat + ',' + long;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to servers.', undefined);
        } else if (body.error) {
            callback('Incorrect coordinates passed. Please try again', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " It is currently "+body.currently.temperature+" degrees out. There is a "+body.currently.precipProbability+"% chance of rain.");
        }
    });
}

module.exports = forecast;