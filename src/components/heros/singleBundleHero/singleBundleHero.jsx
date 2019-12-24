import React from "react";

const unavailableImage = "/assets/unavailableImage.jpg";

const SingleBundleHero = props => (
  <div className="singleBundleHeroContainer">
    <div className="gradientFullSize" />
    <div
      style={{
        backgroundImage: `url(${
          props.bundle && props.bundle.coverPhoto
            ? props.bundle.coverPhoto.links["1920x750"]
            : unavailableImage
        })`,
      }}
      className="singleBundleHeroBackground"
    />
    <div className="singleBundleHeroContent">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>TRAVEL COLLECTION</h1>
            <h2>{props.bundle.title}</h2>
            <p>{props.bundle.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SingleBundleHero;
