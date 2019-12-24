import React, { Component } from "react";
import UserCardView from "./userCardView";
import EditProfilePhotoModal from "components/modals/editProfilePhotoModal/editProfilePhotoModal";

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay: false,
      openModal: false,
    };
  }

  showOverlay = () => {
    if (this.props.myProfile) {
      this.setState({ overlay: true });
    }
  };

  hideOverlay = () => {
    if (this.props.myProfile) {
      this.setState({ overlay: false });
    }
  };

  openModal = () => {
    if (this.props.myProfile) {
      this.setState({ openModal: true });
    }
  };

  closeModal = () => {
    if (this.props.myProfile) {
      this.setState({ openModal: false });
    }
  };

  render() {
    return (
      <UserCardView
        overlay={this.state.overlay}
        showOverlay={this.showOverlay}
        hideOverlay={this.hideOverlay}
        openModal={this.openModal}
        myProfile={this.props.myProfile}
        user={this.props.user}
        profilePhoto={this.props.profilePhoto}
        userId={this.props.userId}
        numberOfAllReviews={this.props.numberOfAllReviews}
      >
        <EditProfilePhotoModal
          userId={this.props.userId}
          openModal={this.state.openModal}
          closeModal={this.closeModal}
        />
      </UserCardView>
    );
  }
}

export default UserCard;
