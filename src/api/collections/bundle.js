import { getBundle } from "api/firestore";

import store from "redux/store";
import { addDocumentsToCollection } from "redux/actions";

import collections from "constants/collections";

/**
 * Retrieve single outfit document with it's extras, store it into redux and return it
 *
 * @param   {string}  bundleId  Outfit ID
 * @return  {object}  Single outfit document with it's extras
 */
function pullBundle(bundleId) {
  const bundle = store.getState().collections[collections.BUNDLES][bundleId];
  if (bundle) {
    return new Promise(resolve => resolve(bundle));
  }
  return getBundle(bundleId).then(bundle => {
    addDocumentsToCollection({ [bundleId]: bundle }, collections.BUNDLES, store.dispatch);
    return bundle;
  });
}

export { pullBundle };
