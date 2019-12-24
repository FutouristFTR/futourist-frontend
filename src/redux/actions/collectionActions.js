export function addDocumentsToCollection(documents, collectionName, dispatch) {
  dispatch({
    type: "ADD_DOCUMENTS_TO_COLLECTION",
    documents,
    collectionName,
  });
}

export function updateDocumentInCollection(docId, updatedDocument, collectionName, dispatch) {
  dispatch({
    type: "UPDATE_DOCUMENT_IN_COLLECTION",
    docId,
    updatedDocument,
    collectionName,
  });
}

export function deleteDocumentFromCollection(docId, collectionName, dispatch) {
  dispatch({
    type: "DELETE_DOCUMENT_FROM_COLLECTION",
    docId,
    collectionName,
  });
}

export function deleteReviewFromUserCollection(docId, userId, dispatch) {
  dispatch({
    type: "DELETE_REVIEW_FROM_USER_COLLECTION",
    docId,
    userId,
  });
}

export function updateObjectKeyInDocument(
  fieldName,
  fieldKey,
  fieldValue,
  docId,
  collectionName,
  dispatch
) {
  dispatch({
    type: "UPDATE_OBJECT_FIELD_IN_DOCUMENT",
    fieldName,
    fieldKey,
    fieldValue,
    docId,
    collectionName,
  });
}

export function changeFetchingStatus(collectionName, status, dispatch) {
  dispatch({
    type: "CHANGE_FETCHING_STATUS_FOR_COLLECTION",
    collectionName,
    status,
  });
}

export function addDocumentsToReviewsCollection(reviews, documentId, groupName, dispatch) {
  dispatch({
    type: "ADD_DOCUMENTS_TO_REVIEWS_COLLECTION",
    reviews,
    documentId,
    groupName,
  });
}

// export function addCollectionToFetched(collectionName, dispatch) {
//   dispatch({
//     type: "ADD_COLLECTION_TO_FETCHED",
//     collectionName,
//   });
// }

// export function addDocumentsToAggregatedCollection(
//   documents,
//   aggregatorValue,
//   collectionName,
//   dispatch
// ) {
//   dispatch({
//     type: "ADD_DOCUMENTS_TO_AGGREGATED_COLLECTION",
//     documents,
//     aggregatorValue,
//     collectionName,
//   });
// }

// export function updateDocumentInAggregatedCollection(
//   docId,
//   updatedDocument,
//   aggregatorValue,
//   collectionName,
//   dispatch
// ) {
//   dispatch({
//     type: "UPDATE_DOCUMENT_IN_AGGREGATED_COLLECTION",
//     docId,
//     updatedDocument,
//     aggregatorValue,
//     collectionName,
//   });
// }

// export function deleteDocumentFromAggregatedCollection(
//   docId,
//   aggregatorValue,
//   collectionName,
//   dispatch
// ) {
//   dispatch({
//     type: "DELETE_DOCUMENT_FROM_AGGREGATED_COLLECTION",
//     docId,
//     aggregatorValue,
//     collectionName,
//   });
// }

// export function deleteObjectKeyFromDocument(fieldName, fieldKey, docId, collectionName, dispatch) {
//   dispatch({
//     type: "DELETE_OBJECT_KEY_FROM_DOCUMENT",
//     fieldName,
//     fieldKey,
//     docId,
//     collectionName,
//   });
// }
