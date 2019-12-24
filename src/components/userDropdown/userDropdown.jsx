import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import routes from "constants/routes";

import withLoginForm from "higherOrderComponents/withLoginForm";
import Button from "components/button/button";
import Icon from "components/icons/icons";
import withCollections from "higherOrderComponents/withCollections";

const userPhoto = "/assets/user.jpg";

class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
      isMobileDropdownOpen: false,
      profilePhoto: "",
      userUpdated: null,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.closeDropdown);
    window.addEventListener("scroll", this.closeMobileDropdown);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.collections &&
      nextProps.collections.users &&
      nextProps.collections.users[nextProps.auth.userUid] &&
      nextProps.collections.users[nextProps.auth.userUid].profilePhoto &&
      nextProps.collections.users[nextProps.auth.userUid].profilePhoto["50x50"] !==
        prevState.profilePhoto
    ) {
      return {
        profilePhoto: nextProps.collections.users[nextProps.auth.userUid].profilePhoto["50x50"],
      };
    }
    return null;
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
    document.removeEventListener("click", this.closeDropdown);
    window.removeEventListener("scroll", this.closeDropdown);
    document.removeEventListener("click", this.closeMobileDropdown);
    window.removeEventListener("scroll", this.closeMoblieDropdown);
  }

  openDropdown = () => {
    this.setState({ isDropdownOpen: true });
    document.addEventListener("click", this.handleClick);
  };

  openMobileDropdown = () => {
    this.setState({ isMobileDropdownOpen: true });
    document.addEventListener("click", this.handleClick);
  };

  closeDropdown = () => {
    this.setState({ isDropdownOpen: false });
    document.removeEventListener("click", this.handleClick);
  };

  closeMobileDropdown = () => {
    this.setState({ isMobileDropdownOpen: false });
    document.removeEventListener("click", this.handleClick);
  };

  handleClick = () => {
    this.setState({
      isDropdownOpen: false,
      isMobileDropdownOpen: false,
    });
    document.removeEventListener("click", this.handleClick);
  };

  render() {
    const isNotHomeView = pathname => pathname !== routes.HOME;

    return (
      <React.Fragment>
        {this.props.isLoggedIn ? (
          <div onClick={this.openDropdown} className="usernameContainer">
            <img
              className="userProfilePhotoNav"
              src={this.state.profilePhoto !== "" ? this.state.profilePhoto : userPhoto}
              alt="user profile pic"
            />
            <span
              className={
                isNotHomeView(this.props.location.pathname) || this.props.shouldDisplay
                  ? "navBarFixedUsername"
                  : "navBarUsername"
              }
            >
              {(this.props.collections.users[this.props.auth.userUid] &&
                this.props.collections.users[this.props.auth.userUid].username) ||
                "username"}
            </span>
            <Icon
              name="drop"
              className="usernameDropdownIcon"
              color={
                isNotHomeView(this.props.location.pathname) || this.props.shouldDisplay
                  ? "#2ac7d3"
                  : "#fff"
              }
              size={12}
            />
            <div className={this.state.isDropdownOpen ? "userDropdown" : "userDropdownHidden"}>
              <Link
                className="dropdownLinkContainer"
                to={routes.USER_PROFILE + "/" + this.props.auth.userUid}
              >
                <div className="dropdownLink">View my profile</div>
              </Link>
              <Link
                className="dropdownLinkContainer"
                to={routes.USER_PROFILE + `/${this.props.auth.userUid}` + routes.EDIT_PROFILE}
              >
                <div className="dropdownLink">Edit my profile</div>
              </Link>
              <div className="dropdownLinkContaineNoBorder" onClick={this.props.signOut}>
                <span className="dropdownLink">Logout</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="loginContainer">
            <Button className="navbarLoginButton" onClick={this.props.openLoginModal}>
              <i className="fas fa-sign-in-alt" /> Log in
            </Button>
            <Link className="navbarRegisterButton" to={routes.REGISTER}>
              Sign Up
            </Link>
          </div>
        )}
        <div className="mobileDropdown" onClick={this.openMobileDropdown}>
          {this.props.isLoggedIn ? (
            <Icon name="user" size={24} />
          ) : (
            <Icon name="hamburger" size={24} />
          )}
          <div
            className={
              this.state.isMobileDropdownOpen ? "userDropdownMobile" : "userDropdownHidden"
            }
          >
            <Link className="dropdownLinkContainer" to="/search?&sorting=relevance&content=places">
              <div className="dropdownLink">Places</div>
            </Link>
            <Link className="dropdownLinkContainer" to="/search?&sorting=relevance&content=outfits">
              <div className="dropdownLink">Travel outfits</div>
            </Link>
            <Link className="dropdownLinkContainer" to="/search?&sorting=relevance&content=bundles">
              <div className="dropdownLink">Collections</div>
            </Link>
            {this.props.isLoggedIn ? (
              <React.Fragment>
                <Link
                  className="dropdownLinkContainer"
                  to={routes.USER_PROFILE + "/" + this.props.auth.userUid}
                >
                  <div className="dropdownLink">View my profile</div>
                </Link>
                <Link
                  className="dropdownLinkContainer"
                  to={routes.USER_PROFILE + `/${this.props.auth.userUid}` + routes.EDIT_PROFILE}
                >
                  <div className="dropdownLink">Edit my profile</div>
                </Link>
                <div className="dropdownLinkContaineNoBorder" onClick={this.props.signOut}>
                  <span className="dropdownLink">Logout</span>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="dropdownLinkContainer" onClick={this.props.openLoginModal}>
                  <span className="dropdownLink">Log in</span>
                </div>
                <Link
                  className="dropdownLinkContaineNoBorder"
                  onClick={this.props.signIn}
                  to={routes.REGISTER}
                >
                  <span className="dropdownLink">Sign Up</span>
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withCollections(withRouter(withLoginForm(UserDropdown)));
