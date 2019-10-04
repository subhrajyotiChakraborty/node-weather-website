const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3ViaGFhdGlvbmljMyIsImEiOiJjazBucHNjNGYwMjhoM21wcGNvOWkwZzFiIn0.hnceTPvtgrbNa1ogT1eyUA&limit=1`
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect Mapbox API', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const placeName = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                placeName
            });
        }
    });

};


module.exports = geocode;