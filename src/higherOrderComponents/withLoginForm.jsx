import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import firebase from "firebase";
import firebaseConstructor from "firebase";

import { openLoginModal, closeLoginModal } from "redux/actions";

const googleProvider = new firebaseConstructor.auth.GoogleAuthProvider();
const facebookProvider = new firebaseConstructor.auth.FacebookAuthProvider();

const initState = {
  password: "",
  email: "",
  loading: false,
  error: "",
};

export default Component => {
  class WithLoginForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = initState;
    }

    signInWithGoogle = () => {
      firebase
        .auth()
        .signInWithRedirect(googleProvider)
        .catch(error => console.error(error));
    };

    signInWithFacebook = () => {
      firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .catch(error => console.error(error));
    };

    signInUserWithEmail = (email, password) => {
      this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.setState({ ...initState }))
        .catch(error => {
          this.setState({ loading: false, error: error.message });
          console.error(error);
        });
    };

    signOut = () =>
      firebase
        .auth()
        .signOut()
        .catch(console.error);

    handleChangeEmail = event => {
      this.setState({ email: event.target.value });
    };

    handleChangePassword = event => {
      this.setState({ password: event.target.value });
    };

    render() {
      const { email, password } = this.state;
      return (
        <React.Fragment>
          <Component
            {...this.props}
            {...this.props.auth}
            loading={this.state.loading}
            closeLoginModal={this.props.closeLoginModal}
            email={email}
            handleChangeEmail={this.handleChangeEmail}
            handleChangePassword={this.handleChangePassword}
            isLoginModalOpen={this.props.auth.isLoginModalOpen}
            openLoginModal={this.props.openLoginModal}
            password={password}
            signInUserWithEmail={this.signInUserWithEmail}
            signInWithFacebook={this.signInWithFacebook}
            signInWithGoogle={this.signInWithGoogle}
            signOut={this.signOut}
            error={this.state.error}
          />
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      auth: state.auth,
    };
  };

  const dispatchActions = function(dispatch) {
    return {
      openLoginModal: function() {
        openLoginModal(dispatch);
      },
      closeLoginModal: function() {
        closeLoginModal(dispatch);
      },
    };
  };

  return compose(connect(mapStateToProps, dispatchActions))(WithLoginForm);
};
