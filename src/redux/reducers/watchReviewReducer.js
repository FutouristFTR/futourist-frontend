const initialState = {
  isWatchReviewModalOpen: false,
  currentIndex: null,
};

export default function watchReviewReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }
  var newState = Object.assign({}, state);

  switch (action.type) {
    case "OPEN_WATCH_REVIEW_MODAL": {
      newState.isWatchReviewModalOpen = true;
      newState.currentIndex = action.currentIndex;
      break;
    }

    case "CLOSE_WATCH_REVIEW_MODAL": {
      newState.isWatchReviewModalOpen = false;
      newState.currentIndex = null;
      break;
    }

    default:
      break;
  }
  return newState;
}
