import React from "react";
import firebase from "firebase";

const height = window.innerHeight;

const HomeHero = props => (
  <div className="homeHeroContainer" style={{ height: height + "px" }}>
    <div className="gradientTopToBottom" />
    <video
      className="videoBackground"
      src={`https://${firebase.apps[0].options.projectId}.firebaseapp.com/assets/homeBackgroundVideo.mp4`}
      poster="/assets/homeBackgroundVideo_thumbnail.jpg"
      autoPlay
      muted
      playsInline
      loop
      controls={false}
    />

    <div className="heroContent">
      <div className="container">
        <div className="row">{props.children}</div>
      </div>
    </div>
  </div>
);

export default HomeHero;
