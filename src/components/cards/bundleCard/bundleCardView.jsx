import React from "react";
import { Link } from "react-router-dom";
import routes from "constants/routes";

import Icon from "../../icons/icons";

const unavailableImage = "/assets/unavailableImage.jpg";

const BundleCardView = props => (
  <div className="col-lg-3 col-md-4 col-12">
    <Link className="customLink" to={`${routes.SINGLE_BUNDLE + "/"}${props.url}`}>
      <div className="bundleCardContainer">
        <div className="bundleCardImageContainer">
          <div className="overlay" />
          <div
            className="bundleCardImage"
            style={{
              backgroundImage: `url(${
                props.bundle && props.bundle.thumbPhoto
                  ? props.bundle.thumbPhoto.links["278x420"]
                  : unavailableImage
              })`,
            }}
          />
          <div className="bundleCardContent">
            <hr />
            <p>{props.bundle.title}</p>
            <div className="numberOfPlacesContainer">
              {props.bundle.places ? (
                <React.Fragment>
                  <span className="numberOfPlaces">{props.bundle.places.length} place(s)</span>
                  <div className="arrowIconContainer">
                    <Icon name="forward" size={13} color="#2a4153" />
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default BundleCardView;
