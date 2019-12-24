import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "components/button";
import Icon from "components/icons";
import withLoginForm from "higherOrderComponents/withLoginForm";
import routes from "constants/routes";

const LoginModal = ({
  closeLoginModal,
  email,
  error,
  handleChangeEmail,
  handleChangePassword,
  isLoggedIn,
  isLoginModalOpen,
  loading,
  password,
  signInUserWithEmail,
  signInWithFacebook,
  signInWithGoogle,
}) =>
  isLoginModalOpen && !isLoggedIn ? (
    <div className="modalContainer" onClick={closeLoginModal}>
      <div className="loginModalInnerContainer" onClick={e => e.stopPropagation()}>
        <div className="loginHeaderContainer">
          <h4>Login</h4>
          <Icon
            name="close"
            color="#dce1e4"
            className="closeLoginModal"
            onClick={closeLoginModal}
          />
        </div>
        <div className="socialLoginSectionContainer">
          <p>with your Google account</p>
          <div className="socialLoginButtonContainer">
            <Button
              className="googleLoginButton socialButton"
              onClick={() => {
                signInWithGoogle();
              }}
            >
              <i className="fab fa-google" />
              Google
            </Button>
          </div>

          <div className="splitBetweenLoginsContainer">
            <span className="splitBetweenLogins">or</span>
          </div>
        </div>
        <div className="loginModalSectionContainer">
          <p>Email</p>
          <input
            type="email"
            className="customInput"
            placeholder="Enter your email"
            id="emailLogin"
            value={email}
            onChange={handleChangeEmail}
          />
          <p>Password</p>
          <input
            type="password"
            className="customInput"
            placeholder="Enter your password"
            id="passwordLogin"
            value={password}
            onChange={handleChangePassword}
          />
          {error !== "" ? (
            <div className="loginErrorContainer">
              <span className="errorMessage">{error}</span>
            </div>
          ) : null}
          <Button
            className="submitButton"
            onClick={event => {
              event.preventDefault();
              signInUserWithEmail(email, password);
            }}
          >
            {loading ? <i className="fas fa-spinner fa-spin" /> : "Log in"}
          </Button>
        </div>
        <div className="loginModalLinksContainer">
          <Link to={routes.REGISTER} onClick={closeLoginModal} className="loginModalLinks">
            Not a member? Sign up
          </Link>
          <Link to={routes.FORGOT_PASSWORD} onClick={closeLoginModal} className="loginModalLinks">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  ) : null;

LoginModal.propTypes = {
  closeLoginModal: PropTypes.func,
  email: PropTypes.string,
  handleChangeEmail: PropTypes.func,
  handleChangePassword: PropTypes.func,
  isLoginModalOpen: PropTypes.bool,
  loading: PropTypes.bool,
  password: PropTypes.string,
  signInUserWithEmail: PropTypes.func,
  signInWithFacebook: PropTypes.func,
  signInWithGoogle: PropTypes.func,
  user: PropTypes.object,
};

export default withLoginForm(LoginModal);
