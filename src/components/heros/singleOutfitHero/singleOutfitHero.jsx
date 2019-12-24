import React from "react";

const unavailableImage = "/assets/unavailableImage.jpg";

const SingleOutfitHero = props => (
  <div className="singleOutfitHeroContainer">
    <div
      style={{
        backgroundImage: `url(${
          props.outfit && props.outfit.coverPhoto
            ? props.outfit.coverPhoto.links["1920x680"]
            : unavailableImage
        })`,
      }}
      className="singleOutfitHeroBackground"
    />
    <div className="singleOutfitHeroContent">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{props.outfit.title}</h1>
            <p>{props.outfit.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SingleOutfitHero;
