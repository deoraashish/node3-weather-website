const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNoMjQ4Y29vbCIsImEiOiJjanoyb204cjgwN3pnM2NtbXozYTY3NnQ2In0.xiBUgFv4AQdgvYkCdOBcmg&limit=1'

    request({ url, json: true },(error, { body }) => {
        if (error) {
            callback('Unable to Connect to Servers', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find the location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;