import { getPlace } from "api/firestore";

import store from "redux/store";
import { addDocumentsToCollection } from "redux/actions";

import collections from "constants/collections";

/**
 * Retrieve single place document with it's extras, store it into redux and return it
 *
 * @param   {string}  placeId  Place ID
 * @return  {object}  Single place document with it's extras
 */
function pullPlace(placeId) {
  const place = store.getState().collections[collections.PLACES][placeId];
  if (place) {
    return new Promise(resolve => resolve(place));
  }
  return getPlace(placeId).then(place => {
    addDocumentsToCollection({ [placeId]: place }, collections.PLACES, store.dispatch);
    return place;
  });
}

export { pullPlace };
