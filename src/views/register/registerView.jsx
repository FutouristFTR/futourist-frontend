import React from "react";
import Button from "components/button";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterView = props => (
  <section className="registerSection">
    <div className="registerModalInnerContainer">
      <div className="loginHeaderContainer">
        <h4>Register</h4>
      </div>
      <div className="socialLoginSectionContainer">
        <p>with your Google account</p>
        <div className="socialLoginButtonContainer">
          <Button className="googleLoginButton socialButton" onClick={props.signInWithGoogle}>
            <i className="fab fa-google" />
            Google
          </Button>
        </div>

        <div className="splitBetweenLoginsContainer">
          <span className="splitBetweenLogins">or</span>
        </div>
      </div>
      <div className="loginModalSectionContainer">
        <p>Username</p>
        <input
          type="text"
          value={props.username}
          onChange={props.handleChangeUsername}
          className="customInput"
          placeholder="Enter your username"
          id="usernameRegister"
        />
        <p>Email</p>
        <input
          type="email"
          className="customInput"
          placeholder="Enter your email"
          id="emailLogin"
          value={props.email}
          onChange={props.handleChangeEmail}
        />
        <p>Password</p>
        <input
          type="password"
          className="customInput"
          placeholder="Enter your password"
          id="passwordLogin"
          value={props.password}
          onChange={props.handleChangePassword}
        />
        {props.error !== "" ? (
          <div className="loginErrorContainer">
            <span className="errorMessage">{props.error}</span>
          </div>
        ) : null}

        <ReCAPTCHA
          ref={props.recaptchaRef}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITEKEY}
          onChange={token => props.handleTokenChange(token)}
        />

        <Button
          className="submitButton registerSubmitButton"
          onClick={event => {
            event.preventDefault();
            props.createUser();
          }}
        >
          {props.loading ? <i className="fas fa-spinner fa-spin" /> : "Register"}
        </Button>
        <div className="alreadyHaveAccContainer">
          <span className="alreadyHaveAccBtn" onClick={props.openLoginModal}>
            Already have an account?
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default RegisterView;
