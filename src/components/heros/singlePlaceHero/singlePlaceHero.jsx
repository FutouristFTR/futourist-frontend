import React from "react";

const unavailableImage = "/assets/unavailableImage.jpg";

const SinglePlaceHero = props => (
  <div className="singlePlaceHeroContainer">
    <div className="gradientFullSize" />
    <div
      style={{ backgroundImage: `url(${props.backgroundImage || unavailableImage})` }}
      className="singlePlaceHeroBackground"
    />
    <div className="singlePlaceHeroContent">
      <div className="container">
        <div className="row">
          <div className="col-12">{props.children}</div>
        </div>
      </div>
    </div>
  </div>
);

export default SinglePlaceHero;
