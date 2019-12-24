import collectionTypes from "../../constants/collections";

let initialState = {
  [collectionTypes.CATEGORIES]: {},
  [collectionTypes.REVIEWS]: {
    byUser: {},
    byPlace: {},
    latestReviews: {},
  },
  [collectionTypes.USERS]: {},
  [collectionTypes.PLACES]: {},
  [collectionTypes.OUTFITS]: {},
  [collectionTypes.BUNDLES]: {},
  fetchStatus: {
    [collectionTypes.CATEGORIES]: "NOT FETCHED",
  },
};

export default function collectionReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }
  var newState = Object.assign({}, state);

  switch (action.type) {
    case "ADD_DOCUMENTS_TO_COLLECTION": {
      newState[action.collectionName] = Object.assign({}, state[action.collectionName]);
      newState[action.collectionName] = {
        ...newState[action.collectionName],
        ...action.documents,
      };
      break;
    }

    case "UPDATE_DOCUMENT_IN_COLLECTION": {
      newState[action.collectionName] = Object.assign({}, state[action.collectionName]);
      newState[action.collectionName][action.docId] = Object.assign(
        {},
        state[action.collectionName][action.docId]
      );
      newState[action.collectionName][action.docId] = {
        ...newState[action.collectionName][action.docId],
        ...action.updatedDocument,
      };
      break;
    }

    case "DELETE_DOCUMENT_FROM_COLLECTION": {
      newState[action.collectionName] = Object.assign({}, state[action.collectionName]);
      delete newState[action.collectionName][action.docId];
      break;
    }

    case "DELETE_REVIEW_FROM_USER_COLLECTION": {
      newState[collectionTypes.REVIEWS]["byUser"][action.userId] = Object.assign(
        {},
        state[collectionTypes.REVIEWS]["byUser"][action.userId]
      );
      delete newState[collectionTypes.REVIEWS]["byUser"][action.userId][action.docId];
      break;
    }

    case "UPDATE_OBJECT_FIELD_IN_DOCUMENT": {
      newState[action.collectionName] = Object.assign({}, state[action.collectionName]);
      newState[action.collectionName][action.docId] = Object.assign(
        {},
        newState[action.collectionName][action.docId]
      );
      newState[action.collectionName][action.docId][action.fieldName] = Object.assign(
        {},
        newState[action.collectionName][action.docId][action.fieldName]
      );

      if (action.fieldValue === null) {
        delete newState[action.collectionName][action.docId][action.fieldName][action.fieldKey];
      } else {
        newState[action.collectionName][action.docId][action.fieldName][action.fieldKey] =
          action.fieldValue;
      }
      break;
    }

    case "CHANGE_FETCHING_STATUS_FOR_COLLECTION": {
      newState.fetchStatus = Object.assign({}, state.fetchStatus);
      newState.fetchStatus[action.collectionName] = action.status;
      break;
    }

    case "ADD_DOCUMENTS_TO_REVIEWS_COLLECTION": {
      newState[collectionTypes.REVIEWS] = Object.assign({}, state.reviews);

      if (action.groupName === "byUser") {
        newState[collectionTypes.REVIEWS]["byUser"] = Object.assign(
          {},
          state[collectionTypes.REVIEWS]["byUser"]
        );
        newState[collectionTypes.REVIEWS]["byUser"][action.documentId] = {
          ...newState[collectionTypes.REVIEWS]["byUser"][action.documentId],
          ...action.reviews,
        };
      } else if (action.groupName === "byPlace") {
        newState[collectionTypes.REVIEWS]["byPlace"] = Object.assign(
          {},
          state[collectionTypes.REVIEWS]["byPlace"]
        );
        newState[collectionTypes.REVIEWS]["byPlace"][action.documentId] = {
          ...newState[collectionTypes.REVIEWS]["byPlace"][action.documentId],
          ...action.reviews,
        };
      } else if (action.groupName === "latestReviews") {
        newState[collectionTypes.REVIEWS]["latestReviews"] = Object.assign(
          {},
          state[collectionTypes.REVIEWS]["latestReviews"]
        );
        newState[collectionTypes.REVIEWS]["latestReviews"] = {
          ...newState[collectionTypes.REVIEWS]["latestReviews"][action.documentId],
          ...action.reviews,
        };
      }
      break;
    }

    // case "ADD_DOCUMENTS_TO_AGGREGATED_COLLECTION": {
    //   // level 1
    //   newState[action.collectionName] = Object.assign({}, state[action.collectionName]);

    //   // level 2
    //   if (!newState[action.collectionName][action.aggregatorValue])
    //     newState[action.collectionName][action.aggregatorValue] = {};
    //   else
    //     newState[action.collectionName][action.aggregatorValue] = Object.assign(
    //       {},
    //       state[action.collectionName][action.aggregatorValue]
    //     );
    //   newState[action.collectionName][action.aggregatorValue] = {
    //     ...newState[action.collectionName][action.aggregatorValue],
    //     ...action.documents,
    //   };
    //   break;
    // }
    // case "UPDATE_DOCUMENT_IN_AGGREGATED_COLLECTION": {
    //   // level 1
    //   newState[action.collectionName] = Object.assign({}, newState[action.collectionName]);

    //   // level 2
    //   if (!newState[action.collectionName][action.aggregatorValue])
    //     newState[action.collectionName][action.aggregatorValue] = {};

    //   newState[action.collectionName][action.aggregatorValue] = Object.assign(
    //     {},
    //     newState[action.collectionName][action.aggregatorValue]
    //   );

    //   // level 3
    //   if (!newState[action.collectionName][action.aggregatorValue][action.docId])
    //     newState[action.collectionName][action.aggregatorValue][action.docId] = {};

    //   newState[action.collectionName][action.aggregatorValue][action.docId] = Object.assign(
    //     {},
    //     newState[action.collectionName][action.aggregatorValue][action.docId]
    //   );

    //   // level 4
    //   newState[action.collectionName][action.aggregatorValue][action.docId] = {
    //     ...newState[action.collectionName][action.aggregatorValue][action.docId],
    //     ...action.updatedDocument,
    //   };
    //   break;
    // }
    // case "DELETE_DOCUMENT_FROM_AGGREGATED_COLLECTION": {
    //   newState[action.collectionName] = Object.assign({}, state[action.collectionName]);
    //   if (newState[action.collectionName][action.aggregatorValue]) {
    //     newState[action.collectionName][action.aggregatorValue] = Object.assign(
    //       {},
    //       newState[action.collectionName][action.aggregatorValue]
    //     );
    //     delete newState[action.collectionName][action.aggregatorValue][action.docId];
    //   }
    //   break;
    // }

    // case "DELETE_OBJECT_KEY_FROM_DOCUMENT": {
    //   newState[action.collectionName] = Object.assign({}, state[action.collectionName]);
    //   newState[action.collectionName][action.docId] = Object.assign(
    //     {},
    //     newState[action.collectionName][action.docId]
    //   );
    //   newState[action.collectionName][action.docId][action.fieldName] = Object.assign(
    //     {},
    //     newState[action.collectionName][action.docId][action.fieldName]
    //   );

    //   delete newState[action.collectionName][action.docId][action.fieldName][action.fieldKey];
    //   break;
    // }
    case "RESET_STORE":
      newState = initialState;
      break;

    default:
      break;
  }
  return newState;
}
