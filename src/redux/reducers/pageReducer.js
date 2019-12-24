const initialState = {
  loading: true,
};

export default function pageReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }
  var newState = Object.assign({}, state);

  switch (action.type) {
    case "START_LOADER": {
      if (state.loading === false) newState.loading = true;
      break;
    }

    case "STOP_LOADER": {
      if (state.loading === true) newState.loading = false;
      break;
    }

    default:
      break;
  }
  return newState;
}
