import { getCategories } from "api/firestore";

import store from "redux/store";
import { addDocumentsToCollection, changeFetchingStatus } from "redux/actions";

import collections from "constants/collections";
import fetchingStatuses from "constants/fetchingStatuses";

function pullCategories() {
  changeFetchingStatus(collections.CATEGORIES, fetchingStatuses.FETCHING, store.dispatch);
  return getCategories().then(categoriesSnapshot => {
    let allCategories = {};
    categoriesSnapshot.forEach(categoryDoc => {
      let category = categoryDoc.data();
      if (category.isEnabled) {
        allCategories[category.name] = true;
      }
    });
    addDocumentsToCollection(allCategories, collections.CATEGORIES, store.dispatch);

    changeFetchingStatus(collections.CATEGORIES, fetchingStatuses.DONE, store.dispatch);
  });
}

export default pullCategories;
