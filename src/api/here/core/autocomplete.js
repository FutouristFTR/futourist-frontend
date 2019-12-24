const axios = require("axios");

function beginAutocomplete(locationQuery) {
  const params =
    "?" +
    "query=" +
    locationQuery +
    "&maxresults=" +
    process.env.REACT_APP_HERE_NUMBER_OF_SUGGESTIONS +
    "&app_id=" +
    process.env.REACT_APP_HERE_APP_ID +
    "&app_code=" +
    process.env.REACT_APP_HERE_APP_CODE;

  return axios
    .get(process.env.REACT_APP_HERE_AUTOCOMPLETION_URL + params)
    .then(response => response.data.suggestions)
    .catch(console.error);
}

export default beginAutocomplete;
