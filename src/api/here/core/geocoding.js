const axios = require("axios");

function transformTextToLatLng(locationQuery) {
  if (locationQuery === "Nearby") {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({ Latitude: position.coords.latitude, Longitude: position.coords.longitude });
          },
          err => reject(err)
        );
      } else {
        reject({ message: "Geolocation is not supported by this browser." });
      }
    });
  } else {
    const params =
      "?" +
      "&app_id=" +
      process.env.REACT_APP_HERE_APP_ID +
      "&app_code=" +
      process.env.REACT_APP_HERE_APP_CODE +
      "&searchtext=" +
      locationQuery;

    return axios
      .get(process.env.REACT_APP_HERE_GEOCODING_URL + params)
      .then(response => response.data.Response.View[0].Result[0].Location.DisplayPosition);
  }
}

export default transformTextToLatLng;
