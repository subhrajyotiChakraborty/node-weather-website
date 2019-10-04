const request = require('request');


const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/5507005ceeb599a3419727c67eb7c6b4/${lat},${long}?units=si`;

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Dark sky API', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const {
                temperature,
                precipProbability,
            } = body.currently;

            const {
                summary
            } = body.daily.data[0];

            callback(undefined, `${summary} current temperature is ${temperature} degree celsius and ${precipProbability}% probability of rain.`);
        }
    });
};

module.exports = forecast;