export function openWatchReviewModal(currentIndex, dispatch) {
  dispatch({
    type: "OPEN_WATCH_REVIEW_MODAL",
    currentIndex,
  });
}

export function closeWatchReviewModal(dispatch) {
  dispatch({
    type: "CLOSE_WATCH_REVIEW_MODAL",
  });
}
