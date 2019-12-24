import React from "react";

const SingleOutfitNavView = props => (
  <React.Fragment>
    <div className="singleOutfitNavContainer">
      <ul className="outfitNavItemList">{props.renderOutfitNavBar}</ul>
    </div>
    <div className="container">
      <div className="row">{props.children}</div>
    </div>
  </React.Fragment>
);

export default SingleOutfitNavView;
