import React from "react";
import Button from "components/button/button";

const ForgotPasswordView = props => {
  return (
    <section className="forgotPasswordSection">
      <div className="registerModalInnerContainer">
        <div className="loginHeaderContainer">
          <h4>Forgot password?</h4>
        </div>

        <div className="loginModalSectionContainer">
          <input
            type="email"
            name="email"
            value={props.email}
            onChange={props.handleChangeEmail}
            className="customInput"
            placeholder="Enter your email"
          />
          {props.error !== "" ? (
            <div className="loginErrorContainer">
              <span className="errorMessage">{props.error}</span>
            </div>
          ) : null}
          {props.successfullReset ? (
            <div className="passwordResetSuccessContainer">
              <span className="successPasswordResetMessage">
                Password reset link successfully sent to <b>{props.email}</b>
              </span>
            </div>
          ) : null}
          <Button
            className="submitButton"
            onClick={event => {
              event.preventDefault();
              props.sendPasswordResetEmail();
            }}
          >
            {props.loading ? <i className="fas fa-spinner fa-spin" /> : "Send password reset email"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordView;
