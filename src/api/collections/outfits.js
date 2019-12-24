import { getOutfit } from "api/firestore";

import store from "redux/store";
import { addDocumentsToCollection } from "redux/actions";

import collections from "constants/collections";

/**
 * Retrieve single outfit document with it's extras, store it into redux and return it
 *
 * @param   {string}  outfitId  Outfit ID
 * @return  {object}  Single outfit document with it's extras
 */
function pullOutfit(outfitId) {
  const outfit = store.getState().collections[collections.OUTFITS][outfitId];
  if (outfit) {
    return new Promise(resolve => resolve(outfit));
  }
  return getOutfit(outfitId).then(outfit => {
    addDocumentsToCollection({ [outfitId]: outfit }, collections.OUTFITS, store.dispatch);
    return outfit;
  });
}

export { pullOutfit };
