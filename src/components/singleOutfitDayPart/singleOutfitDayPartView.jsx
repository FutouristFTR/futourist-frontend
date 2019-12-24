import React from "react";

const SingleOutfitDayPartView = props => (
  <div id={props.id} className="col-12 col-md-8 offset-md-2">
    <div className="outfitDayPartContainer">
      <div className="outfitDayPartTitleContainer">
        <div className="outfitTitleLine" />
        <span className="outfitDayPartTitle">{props.title}</span>
      </div>
      <p>{props.dayPart && props.dayPart.text}</p>
    </div>
    <div className="row">{props.renderPlaces()}</div>
  </div>
);

export default SingleOutfitDayPartView;
