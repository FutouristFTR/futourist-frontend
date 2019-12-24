import React, { Component } from "react";

import { pullOutfit } from "api/collections/outfits";
import urlHandling from "utils/urlHandling";

import SingleOutfitView from "./singleOutfitView";
import withCollections from "higherOrderComponents/withCollections";

class SingleOutfit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outfitId: null,
      loading: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const outfitId = urlHandling.idFromUrl();
    this.setState({ outfitId });
    pullOutfit(outfitId).then(() => this.setState({ loading: false }));
  }

  render() {
    const outfit = this.props.collections.outfits[this.state.outfitId];

    return (
      <SingleOutfitView
        collections={this.props.collections}
        loading={this.state.loading}
        outfit={outfit}
      />
    );
  }
}

export default withCollections(SingleOutfit);
