import React from "react";
import { Link } from "react-router-dom";

const UserCardView = props => {
  return (
    <div className="userCardContainer">
      {props.children}
      <div
        className="profileImageContainer"
        onMouseEnter={props.showOverlay}
        onMouseLeave={props.hideOverlay}
        onClick={props.openModal}
      >
        <img
          src={
            props.myProfile
              ? props.profilePhoto
                ? props.profilePhoto
                : "/assets/user.jpg"
              : props.user && props.user.profilePhoto && props.user.profilePhoto["100x100"]
              ? props.user.profilePhoto["100x100"]
              : "/assets/user.jpg"
          }
          className="userProfilePicture"
          alt="user profile pic"
        />
        {props.overlay ? (
          <div className="editProfileImageContainer">
            <div className="darkOverlay" />
            <i className="fas fa-camera fa-2x iconAndTextPosition" />
            <span className="iconAndTextPosition">Edit</span>
          </div>
        ) : null}
      </div>
      <h3>{props.user && props.user.username}</h3>
      {props.myProfile ? (
        <Link to={"/user/" + props.userId} className="backLinkProfile">
          View my profile
        </Link>
      ) : null}
    </div>
  );
};

export default UserCardView;
