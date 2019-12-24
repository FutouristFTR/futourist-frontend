function objectToQueryString(queryParams) {
  var str = [];
  for (let p in queryParams)
    if (queryParams.hasOwnProperty(p)) {
      if (
        queryParams[p] &&
        queryParams[p] !== null &&
        queryParams[p] !== "" &&
        queryParams[p].length !== 0
      ) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(queryParams[p]));
      }
    }
  return str.join("&");
}

function queryStringToObject(searchParams) {
  let searchParamsObject = {};
  searchParams = searchParams.substring(1);
  const splittedParams = decodeURIComponent(searchParams).split("&");

  for (let param in splittedParams) {
    const splittedParamToPropertyValue = splittedParams[param].split("=");

    let property = splittedParamToPropertyValue[0];
    let value = splittedParamToPropertyValue[1];

    if (property === "categories") {
      let splittedCategories = value.split(",");
      searchParamsObject[property] = [];

      for (let category in splittedCategories) {
        searchParamsObject[property].push(splittedCategories[category]);
      }
    } else {
      searchParamsObject[property] = value;
    }
  }
  return searchParamsObject;
}

function createUrlFromName(name) {
  const combining = /[\u0300-\u036F]/g;

  const urlFromName = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(combining, "")
    .split(" - ")
    .join("-")

    .split("- ")
    .join("-")

    .split(" -")
    .join("-")

    .split(" ")
    .join("-")

    .split(",")
    .join("")

    .split(".")
    .join("")

    .split(`"`)
    .join("")

    .split(`'`)
    .join("")

    .split("&")
    .join("and");

  return urlFromName;
}

function idFromUrl(path = window.location.pathname) {
  const id = path.split("-").pop();
  return id;
}

function getUserIdFromUrl(path = window.location.pathname) {
  const id = path.split("/").pop();
  return id;
}

export default {
  createUrlFromName,
  idFromUrl,
  objectToQueryString,
  queryStringToObject,
  getUserIdFromUrl,
};
