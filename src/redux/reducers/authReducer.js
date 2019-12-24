const initialState = {
  isLoginModalOpen: false,
  user: null,
  isLoggedIn: undefined,
  userEmail: null,
  userUid: null,
};

export default function authReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }
  var newState = Object.assign({}, state);

  switch (action.type) {
    case "OPEN_LOGIN_MODAL": {
      newState.isLoginModalOpen = true;
      break;
    }

    case "CLOSE_LOGIN_MODAL": {
      newState.isLoginModalOpen = false;
      break;
    }

    case "SIGN_IN": {
      newState.isLoggedIn = true;
      newState.isLoginModalOpen = false;
      newState.userEmail = action.userEmail;
      newState.userUid = action.userUid;
      break;
    }

    case "SIGN_OUT": {
      newState = initialState;
      newState.isLoggedIn = false;
      break;
    }

    default:
      break;
  }
  return newState;
}
