const request = require('request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWxpazk4IiwiYSI6ImNrY3c4bDExdDA5MzMydm1wMHFoZzhqM2gifQ.s68nZmVbe5HQW8tx7hDpEg&limit=1`;

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error)
            callback('Unable to connect API', undefined);
        else if (!body.features.length)
            callback('not found', undefined);
        else
            callback(undefined, `latitude is ${body.features[0].center[1]} and longitude is ${body.features[0].center[0]}`);
    });
}

module.exports = geocode;