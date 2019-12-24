export function startLoader(dispatch) {
  dispatch({
    type: "START_LOADER",
  });
}

export function stopLoader(dispatch) {
  dispatch({
    type: "STOP_LOADER",
  });
}
