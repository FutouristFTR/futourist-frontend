import React, { Component } from "react";
import BundleCardView from "./bundleCardView";

import urlHandling from "utils/urlHandling";

class BundleCard extends Component {
  render() {
    const url =
      urlHandling.createUrlFromName(
        (this.props.bundle && this.props.bundle.title) || "collection-name"
      ) +
      "-" +
      ((this.props.bundle && this.props.bundle.objectID) || this.props.bundleId || "collectionID");
    return <BundleCardView bundle={this.props.bundle} url={url} />;
  }
}

export default BundleCard;
