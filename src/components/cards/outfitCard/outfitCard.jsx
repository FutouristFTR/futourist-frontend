import React, { Component } from "react";

import OutfitCardView from "./outfitCardView";

import urlHandling from "utils/urlHandling";

class OutfitCard extends Component {
  render() {
    const url =
      urlHandling.createUrlFromName(
        (this.props.outfit && this.props.outfit.title) || "outfit-name"
      ) +
      "-" +
      ((this.props.outfit && this.props.outfit.objectID) || this.props.outfitId || "outfitID");

    return <OutfitCardView outfit={this.props.outfit} url={url} />;
  }
}

export default OutfitCard;
