import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as axios from "axios";

import RegisterView from "./registerView";
import withLoginForm from "higherOrderComponents/withLoginForm";

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      loading: false,
      error: "",
      recaptchaToken: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isLoggedIn === true) {
      nextProps.history.push("/");
      return null;
    }
    return null;
  }

  recaptchaRef = React.createRef();

  signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function(result) {
        // var token = result.credential.accessToken;
        // var user = result.user;
        // console.log("successful google sign in");
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  signInWithFacebook = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(function(result) {
        // var token = result.credential.accessToken;
        // var user = result.user;
        // console.log("successful facebook sign in");
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  createUser = () => {
    const { email, password, username } = this.state;

    axios
      .post(process.env.REACT_APP_CLOUDFUNCTIONS_URL + "/pf/signup/", {
        email,
        username,
        password,
        recaptcha: this.state.recaptchaToken,
      })
      .then(() => {
        this.setState({ loading: true });
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch(error => {
        this.recaptchaRef.current.reset();
        this.setState({
          loading: false,
          recaptchaToken: "",
          error:
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.message
              ? error.response.data.error.message
              : "An unknown error occured. Please refresh and try again.",
        });
      });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  handleTokenChange = token => {
    this.setState({ recaptchaToken: token });
  };

  render() {
    return (
      <RegisterView
        signInWithGoogle={this.signInWithGoogle}
        signInWithFacebook={this.signInWithFacebook}
        createUser={this.createUser}
        handleChangeEmail={this.handleChangeEmail}
        handleChangePassword={this.handleChangePassword}
        handleChangeUsername={this.handleChangeUsername}
        handleTokenChange={this.handleTokenChange}
        username={this.state.username}
        email={this.state.email}
        password={this.state.password}
        loading={this.state.loading}
        error={this.state.error}
        openLoginModal={this.props.openLoginModal}
        recaptchaRef={this.recaptchaRef}
      />
    );
  }
}

export default withLoginForm(Login);
