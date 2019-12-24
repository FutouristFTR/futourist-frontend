import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Switch, Route, Router, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import firebase from "firebase";

import { signIn, signOut, addDocumentsToCollection } from "redux/actions";

import routes from "constants/routes";
import navbar from "utils/navbar";
import pullCategories from "api/collections/categories";

import Home from "views/home";
import Register from "views/register";
import SearchResults from "views/searchResults";
import SingleBundle from "views/singleBundle/singleBundle";
import SingleOutfit from "views/singleOutfit/singleOutfit";
import SinglePlace from "views/singlePlace";
import UserProfile from "views/userProfile";
import EditProfile from "views/editProfile";
import ForgotPassword from "views/forgotPassword/forgotPassword";
import PrivacyPolicy from "views/privacyPolicy/privacyPolicy";
import Terms from "views/terms/terms";

import AddReviewModal from "components/modals/addReviewModal";
import LoginModal from "components/modals/loginModal";
import NavbarFixed from "components/navbar/navbarFixed";
import collections from "constants/collections";

const hist = createBrowserHistory();
const firestore = firebase.firestore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      shouldDisplayFixedNavbar: false,
    };
  }

  componentDidMount() {
    pullCategories();
    window.scrollTo({ top: 0 });

    window.addEventListener("scroll", this.showFixedNavbarOnScroll);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firestore
          .collection("users")
          .doc(user.uid)
          .onSnapshot(doc => {
            if (doc.exists) {
              this.props.addDocumentsToCollection({ [user.uid]: doc.data() }, collections.USERS);
              this.props.signIn(user.email, user.uid);
            }
          });
      } else {
        this.props.signOut();
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.showFixedNavbarOnScroll);
  }

  showFixedNavbarOnScroll = () => {
    const shouldDisplayFixedNavbar = navbar.shouldDisplayFixedNavbar();

    if (shouldDisplayFixedNavbar !== this.state.shouldDisplayFixedNavbar) {
      this.setState({ shouldDisplayFixedNavbar });
    }
  };

  render() {
    return (
      <Router history={hist}>
        <NavbarFixed shouldDisplay={this.state.shouldDisplayFixedNavbar} />
        <LoginModal />
        <AddReviewModal />
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={routes.REGISTER} component={Register} />
          <Route exact path={routes.SINGLE_PLACE + "/:id"} component={SinglePlace} />
          <Route exact path={routes.SINGLE_OUTFIT + "/:id"} component={SingleOutfit} />
          <Route exact path={routes.SINGLE_BUNDLE + "/:id"} component={SingleBundle} />
          <Route exact path={routes.SEARCH_RESULTS} component={SearchResults} />
          <Route exact path={routes.USER_PROFILE + "/:id"} component={UserProfile} />
          <Route
            exact
            path={routes.USER_PROFILE + "/:id" + routes.EDIT_PROFILE}
            component={EditProfile}
          />
          <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route exact path={routes.PRIVACY_POLICY} component={PrivacyPolicy} />
          <Route exact path={routes.TERMS} component={Terms} />
          <Route path={"/"} render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

const dispatchActions = function(dispatch) {
  return {
    signIn: function(userEmail, userUid) {
      signIn(userEmail, userUid, dispatch);
    },
    signOut: function() {
      signOut(dispatch);
    },
    addDocumentsToCollection: function(documents, collectionName) {
      addDocumentsToCollection(documents, collectionName, dispatch);
    },
  };
};

export default compose(connect(null, dispatchActions))(App);
