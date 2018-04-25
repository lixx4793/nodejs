const request = require("request");

var geocodeAddress = (address, callback) => {
  var encodedUrl ="https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address);
  request({
    url: encodedUrl,
    json: true}, (error, response, body) => {
      if( error != null) {
        callback("Unable to connect to Google server");
      } else if( body.status === "ZERO_RESULTS") {
        callback("Unable to find the address");
      } else if( body.status === "OK") {
        callback(undefined, {
          Address: body.results[0].formatted_address,
          Lat: body.results[0].geometry.location.lat,
          Lng: body.results[0].geometry.location.lng
        });
    }
  });
}

module.exports = {
  geocodeAddress
}
