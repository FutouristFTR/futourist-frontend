export function openLoginModal(dispatch) {
  dispatch({
    type: "OPEN_LOGIN_MODAL",
  });
}

export function closeLoginModal(dispatch) {
  dispatch({
    type: "CLOSE_LOGIN_MODAL",
  });
}

export function signIn(userEmail, userUid, dispatch) {
  dispatch({
    type: "SIGN_IN",
    userEmail: userEmail,
    userUid: userUid,
  });
}

export function signOut(dispatch) {
  dispatch({
    type: "SIGN_OUT",
  });
}
