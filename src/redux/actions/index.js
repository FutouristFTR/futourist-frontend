import {
  // addCollectionToFetched,
  // addDocumentsToAggregatedCollection,
  // deleteDocumentFromAggregatedCollection,
  // deleteObjectKeyFromDocument,
  // updateDocumentInAggregatedCollection,
  addDocumentsToCollection,
  deleteDocumentFromCollection,
  updateDocumentInCollection,
  updateObjectKeyInDocument,
  changeFetchingStatus,
  addDocumentsToReviewsCollection,
  deleteReviewFromUserCollection,
} from "./collectionActions";

import { openLoginModal, closeLoginModal, signIn, signOut } from "./authActions";

import {
  openAddReviewModal,
  closeAddReviewModal,
  addReviewPlacesSuggestions,
  addReviewClearSuggestions,
  addPlaceToReviewModal,
  clearPlaceFromReviewModal,
} from "./addReviewActions";

import { openWatchReviewModal, closeWatchReviewModal } from "./watchReviewActions";

import {
  startSearch,
  searchCompleted,
  searchNextPageCompleted /*changeSorting*/,
} from "./searchActions";

export {
  // addCollectionToFetched,
  // addDocumentsToAggregatedCollection,
  // deleteDocumentFromAggregatedCollection,
  // deleteObjectKeyFromDocument,
  // updateDocumentInAggregatedCollection,
  addPlaceToReviewModal,
  clearPlaceFromReviewModal,
  addDocumentsToCollection,
  deleteDocumentFromCollection,
  updateDocumentInCollection,
  updateObjectKeyInDocument,
  changeFetchingStatus,
  addDocumentsToReviewsCollection,
  openLoginModal,
  closeLoginModal,
  signIn,
  signOut,
  openAddReviewModal,
  closeAddReviewModal,
  startSearch,
  searchCompleted,
  searchNextPageCompleted,
  // changeSorting,
  addReviewPlacesSuggestions,
  addReviewClearSuggestions,
  openWatchReviewModal,
  closeWatchReviewModal,
  deleteReviewFromUserCollection,
};
