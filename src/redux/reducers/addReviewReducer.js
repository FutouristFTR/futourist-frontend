const initialState = {
  isAddReviewModalOpen: false,
  placesSuggestions: [],
  currentPlace: {
    placeId: "",
    placeName: "",
  },
};

export default function authReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }
  var newState = Object.assign({}, state);

  switch (action.type) {
    case "OPEN_ADD_REVIEW_MODAL": {
      newState.isAddReviewModalOpen = true;
      break;
    }

    case "CLOSE_ADD_REVIEW_MODAL": {
      newState.isAddReviewModalOpen = false;
      newState.placesSuggestions = [];
      break;
    }

    case "ADD_REVIEW_PLACES_SUGGESTIONS": {
      newState.placesSuggestions = action.placesSuggestions;
      break;
    }

    case "ADD_REVIEW_CLEAR_SUGGESTIONS": {
      newState.placesSuggestions = [];
      break;
    }

    case "ADD_PLACE_TO_REVIEW_MODAL": {
      newState.currentPlace.placeId = action.placeId;
      newState.currentPlace.placeName = action.placeName;
      break;
    }

    case "CLEAR_PLACE_FROM_REVIEW_MODAL": {
      newState.currentPlace.placeId = "";
      newState.currentPlace.placeName = "";
      break;
    }

    default:
      break;
  }
  return newState;
}
