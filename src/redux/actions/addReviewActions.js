export function openAddReviewModal(dispatch) {
  dispatch({
    type: "OPEN_ADD_REVIEW_MODAL",
  });
}

export function closeAddReviewModal(dispatch) {
  dispatch({
    type: "CLOSE_ADD_REVIEW_MODAL",
  });
}

export function addReviewPlacesSuggestions(suggestions, dispatch) {
  dispatch({
    type: "ADD_REVIEW_PLACES_SUGGESTIONS",
    placesSuggestions: suggestions,
  });
}

export function addReviewClearSuggestions(dispatch) {
  dispatch({
    type: "ADD_REVIEW_CLEAR_SUGGESTIONS",
  });
}

export function addPlaceToReviewModal(placeId, placeName, dispatch) {
  dispatch({
    type: "ADD_PLACE_TO_REVIEW_MODAL",
    placeId,
    placeName,
  });
}

export function clearPlaceFromReviewModal(dispatch) {
  dispatch({
    type: "CLEAR_PLACE_FROM_REVIEW_MODAL",
  });
}
