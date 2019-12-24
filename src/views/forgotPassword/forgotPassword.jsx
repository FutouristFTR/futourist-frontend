import React, { Component } from "react";
import firebase from "firebase";

import ForgotPasswordView from "./forgotPasswordView";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      successfullReset: false,
      loading: false,
      error: null,
    };
  }

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  sendPasswordResetEmail = () => {
    this.setState({ loading: true, error: "" });

    const { email } = this.state;

    if (!email) return this.setState({ error: "Please enter your email" });
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ successfullReset: true, loading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false, error: error.message });
      });
  };

  render() {
    return (
      <ForgotPasswordView
        successfullReset={this.state.successfullReset}
        loading={this.state.loading}
        email={this.state.email}
        handleChangeEmail={this.handleChangeEmail}
        error={this.state.error}
        sendPasswordResetEmail={this.sendPasswordResetEmail}
      />
    );
  }
}

export default ForgotPassword;
