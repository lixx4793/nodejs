const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather/weather.js");
var argv = yargs.options({
  a:{
    demand: true,
    string: true,
    alias: "address",
    description: "Address to fetch the weather"
  }
})
.help()
.alias('help', 'h')
.argv;
geocode.geocodeAddress(argv.a, (errorMessage, result) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
      console.log(result.Address);
      // console.log(JSON.stringify(result, undefined, 2));
      //  Get weather information using lat and lng
      weather.getWeather(result.Lat,result.Lng, (errorMessage, result) => {
          if(errorMessage) {
            console.log(errorMessage);
          } else {
            console.log("temperature: ", result.temperature);
            console.log("It feels like: ", result.apparentTemperature);
            console.log("The windSpeed: ", result.windSpeed);
            console.log("humidity: ", result.humidity);
            // console.log(JSON.stringify(result, undefined, 2));
          }
        })

  }
});

//14540215cee9bb3ae322c24cb53c0662
