import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import store from "redux/store";
import { updateDocumentInCollection } from "redux/actions";
import { pullUser } from "api/collections/users";

import { compose } from "redux";
import { connect } from "react-redux";

import firebase from "firebase";
import axios from "axios";

import EditProfileView from "./editProfileView";
import withLoginForm from "../../higherOrderComponents/withLoginForm";
import collections from "constants/collections";
import routes from "constants/routes";
import user from "constants/user";

const initStateErrors = {
  errors: {
    usernameWrongLength: false,
    usernameWrongCharacters: false,
    usernameNull: false,
    bioTooLong: false,
    userUpdated: null,
  },
};

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      username: "",
      bio: "",
      profilePhoto: "",
      isLoggedIn: false,
      errors: initStateErrors,
      shouldRedirect: false,
      error: "",
      saving: false,
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.id;
    pullUser(userId).then(user => {
      if (!user) return this.props.history.replace("/");

      this.setState({
        userId,
        username: user.username,
        bio: user.bio,
        profilePhoto: user.profilePhoto ? user.profilePhoto["100x100"] : "",
      });
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.users &&
      nextProps.users[nextProps.auth.userUid] &&
      nextProps.users[nextProps.auth.userUid].profilePhoto &&
      nextProps.users[nextProps.auth.userUid].profilePhoto["100x100"] !== prevState.profilePhoto
    ) {
      return {
        profilePhoto: nextProps.users[nextProps.auth.userUid].profilePhoto["100x100"],
      };
    }
    return null;
  }

  handleChangeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  saveChanges = () => {
    const usernameValidRegex = /^[a-z0-9_]*$/;
    this.setState({ saving: true });
    if (
      this.state.username.length >= user.USERNAME_MIN_LENGTH &&
      this.state.username.length <= user.USERNAME_MAX_LENGTH &&
      this.state.username.length !== 0 &&
      this.state.bio.length <= user.BIO_LENGTH
    ) {
      if (usernameValidRegex.test(this.state.username)) {
        return firebase
          .auth()
          .currentUser.getIdToken()
          .then(firebaseToken => ({
            Authorization: `Bearer ${firebaseToken}`,
          }))
          .then(headers =>
            axios({
              method: "post",
              url: process.env.REACT_APP_CLOUDFUNCTIONS_URL + "/af/changeUserData/",
              data: {
                user: {
                  username: this.state.username,
                  bio: this.state.bio,
                },
              },
              headers,
            })
          )
          .then(() => {
            updateDocumentInCollection(
              this.props.auth.userUid,
              { username: this.state.username, bio: this.state.bio },
              collections.USERS,
              store.dispatch
            );
            this.setState({ errors: { ...initStateErrors }, error: "", saving: false });
            this.props.history.push(routes.USER_PROFILE + "/" + this.props.auth.userUid);
          })
          .catch(error => {
            this.setState({
              saving: false,
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
      } else {
        this.setState({
          errors: { ...this.state.errors, usernameWrongCharacters: true, saving: false },
        });
      }
    } else if (
      this.state.username.length > user.USERNAME_MAX_LENGTH ||
      this.state.username.length < user.USERNAME_MIN_LENGTH
    ) {
      this.setState({
        errors: { ...this.state.errors, usernameWrongLength: true, saving: false },
      });
    } else if (this.state.username.length === 0) {
      this.setState({ errors: { ...this.state.errors, usernameNull: true, saving: false } });
    } else if (this.state.bio.length > user.BIO_LENGTH) {
      this.setState({ errors: { ...this.state.errors, bioTooLong: true, saving: false } });
    }
  };

  render() {
    const user = this.props.users[this.state.userId];

    if (
      this.props.auth.isLoggedIn === false ||
      (this.props.auth.isLoggedIn === true &&
        this.props.auth.userUid !== this.props.match.params.id)
    ) {
      this.props.history.replace(routes.USER_PROFILE + "/" + this.props.match.params.id);
    }
    return (
      <React.Fragment>
        <EditProfileView
          {...this.state}
          loading={!this.props.auth.isLoggedIn}
          user={user}
          username={this.state.username}
          bio={this.state.bio}
          profilePhoto={this.state.profilePhoto}
          auth={this.props.auth}
          handleChangeInput={this.handleChangeInput}
          saveChanges={this.saveChanges}
          errors={this.state.errors}
          error={this.state.error}
          saving={this.state.saving}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { places: state.collections.places, users: state.collections.users };
};

export default compose(
  connect(
    mapStateToProps,
    null
  )
)(withLoginForm(withRouter(EditProfile)));
