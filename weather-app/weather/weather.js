const request = require("request");

var getWeather = (lat, lng, callback) => {
  request( {
    url: `https://api.darksky.net/forecast/14540215cee9bb3ae322c24cb53c0662/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback("Unable to Connect to Google Server");
    } else if(!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        humidity: body.currently.humidity,
        windSpeed: body.currently.windSpeed
      })
    } else {
      callback(" Unable to fetch the data from given location");
    }
  })
}

module.exports = {
  getWeather
}
