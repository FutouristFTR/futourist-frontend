import React from "react";
import { Link } from "react-router-dom";
import routes from "constants/routes";

const unavailableImage = "/assets/unavailableImage.jpg";

const OutfitCardView = props => (
  <div className="col-12 col-md-6">
    <Link className="customLink" to={`${routes.SINGLE_OUTFIT + "/"}${props.url}`}>
      <div className="outfitCardContainer">
        <div className="outfitCardImageContainer">
          <div
            className="outfitCardImage"
            style={{
              backgroundImage: `url(${
                props.outfit && props.outfit.thumbPhoto && props.outfit.thumbPhoto.links["570x343"]
                  ? props.outfit.thumbPhoto.links["570x343"]
                  : unavailableImage
              })`,
            }}
          />
        </div>
        <h5>{(props.outfit && props.outfit.title) || "Outfit title unavailable"}</h5>
        <p> {(props.outfit && props.outfit.subtitle) || "Outfit subtitle unavailable"}</p>
      </div>
    </Link>
  </div>
);

export default OutfitCardView;
