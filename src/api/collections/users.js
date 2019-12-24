import { getUser } from "api/firestore";

import store from "redux/store";
import { addDocumentsToCollection } from "redux/actions";

import collections from "constants/collections";

/**
 * Retrieve single user document with it's extras, store it into redux and return it
 *
 * @param   {string}  userId  User ID
 * @return  {object}  Single user document with it's extras
 */
function pullUser(userId) {
  const user = store.getState().collections[collections.USERS][userId];
  if (user) {
    return new Promise(resolve => resolve(user));
  }
  return getUser(userId)
    .then((user /*, userExtras*/) => {
      if (user.status === 100) {
        addDocumentsToCollection({ [userId]: user }, collections.USERS, store.dispatch);
      } else {
        user = null;
      }
      // addDocumentsToCollection({ [userId]: userExtras }, collections.USERS_EXTRAS, store.dispatch);
      return user;
    })
    .catch(err => false);
}

export { pullUser };
