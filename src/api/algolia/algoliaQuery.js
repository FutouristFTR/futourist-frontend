import store from "redux/store";
import {
  startSearch,
  searchCompleted,
  searchNextPageCompleted,
  addReviewPlacesSuggestions,
} from "redux/actions";

import collections from "constants/collections";

const algoliasearch = require("algoliasearch");

const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_API_KEY
);
const placesRatingIndex = client.initIndex(process.env.REACT_APP_ALGOLIA_PLACES_RATING_INDEX_NAME);
const placesIndex = client.initIndex(process.env.REACT_APP_ALGOLIA_PLACES_INDEX_NAME);
const bundlesIndex = client.initIndex(process.env.REACT_APP_ALGOLIA_BUNDLES_INDEX_NAME);
const outfitsIndex = client.initIndex(process.env.REACT_APP_ALGOLIA_OUTFITS_INDEX_NAME);

function performSearch(params, pageNumber, collectionName) {
  const searchCategories = [];
  if (params.categories) {
    for (let i = 0; i < params.categories.length; i++) {
      searchCategories[i] = "categories:" + params.categories[i];
    }
  }

  let reduxParams = {
    keyword: params.keyword,
    categories: params.categories,
    lat: null,
    lng: null,
    myLat: null,
    myLng: null,
    locationName: null,
    sorting: params.sorting,
  };

  let searchParams = {
    query: params.keyword,
    facetFilters: [searchCategories],
    page: pageNumber || 0,
  };

  if (params.lat && params.lng) {
    reduxParams.lat = params.lat;
    reduxParams.lng = params.lng;
    reduxParams.locationName = params.locationName;

    searchParams.aroundLatLng = `${params.lat}, ${params.lng}`;
    searchParams.aroundRadius = 10000;
  }

  startSearch(reduxParams, store.dispatch);

  const placesPromise = new Promise((resolve, reject) => {
    let index = params.sorting === "rating" ? placesRatingIndex : placesIndex;
    if (collectionName && collectionName !== collections.PLACES) resolve(null);
    index.search(searchParams, (err, { hits } = {}) => {
      if (err) return reject(err);
      return resolve(hits);
    });
  });

  const outfitsPromise = new Promise((resolve, reject) => {
    if (collectionName && collectionName !== collections.OUTFITS) resolve(null);
    outfitsIndex.search(searchParams, (err, { hits } = {}) => {
      if (err) return reject(err);
      return resolve(hits);
    });
  });

  const bundlesPromise = new Promise((resolve, reject) => {
    if (collectionName && collectionName !== collections.BUNDLES) resolve(null);
    bundlesIndex.search(searchParams, (err, { hits } = {}) => {
      if (err) return reject(err);
      return resolve(hits);
    });
  });

  const promises = [placesPromise, outfitsPromise, bundlesPromise];
  const collectionIndexes = {
    [collections.PLACES]: 0,
    [collections.OUTFITS]: 1,
    [collections.BUNDLES]: 2,
  };
  return Promise.all(promises)
    .then(results => {
      if (pageNumber > 0 && collectionName)
        return searchNextPageCompleted(
          results[collectionIndexes[collectionName]],
          collectionName,
          store.dispatch
        );
      else {
        return searchCompleted(results[0], results[1], results[2], store.dispatch);
      }
    })
    .catch(e => console.error(e));
}

function makeSuggestionForPlaceQuery(keyword) {
  let searchParams = {
    query: keyword,
  };

  placesIndex.search(searchParams, (err, { hits } = {}) => {
    if (err) throw err;
    addReviewPlacesSuggestions(hits, store.dispatch);
  });
}

export { performSearch, makeSuggestionForPlaceQuery };
