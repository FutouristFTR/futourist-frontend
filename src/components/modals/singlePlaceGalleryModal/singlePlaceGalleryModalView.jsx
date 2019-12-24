import React from "react";
import Button from "components/button/button";
import Icon from "components/icons/icons";

const SinglePlaceGalleryModalView = props => (
  <React.Fragment>
    <Button className="openGalleryButton" onClick={props.openGalleryModal}>
      View Photos (
      {(props.place && props.place.photos && Object.keys(props.place.photos).length) || "0"})
    </Button>

    {props.isGalleryModalOpen ? (
      <div className="modalContainer" onClick={props.closeGalleryModal}>
        <Icon
          name="close"
          color="#fff"
          className="closeGalleryButton"
          size={30}
          onClick={props.closeGalleryModal}
        />
        <div className="galleryImageContainer" onClick={e => e.stopPropagation()}>
          <img
            className="galleryImage"
            alt=""
            src={props.place.photos[props.index].links["1920x1080"]}
          ></img>
        </div>
        {Object.keys(props.place.photos).length > 1 ? (
          <Icon
            name="back"
            color="#fff"
            className="prevImageButton"
            size={50}
            onClick={e => {
              e.stopPropagation();
              props.prevPhoto();
            }}
          />
        ) : null}
        {Object.keys(props.place.photos).length > 1 ? (
          <Icon
            name="forward"
            color="#fff"
            className="nextImageButton"
            size={50}
            onClick={e => {
              e.stopPropagation();
              props.nextPhoto();
            }}
          />
        ) : null}
      </div>
    ) : null}
  </React.Fragment>
);

export default SinglePlaceGalleryModalView;
