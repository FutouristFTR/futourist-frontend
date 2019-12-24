import React, { Component } from "react";

import { pullBundle } from "api/collections/bundle";
import { pullPlace } from "api/collections/places";

import urlHandling from "utils/urlHandling";

import PlaceCard from "components/cards/placeCard/placeCard";
import SingleBundleView from "./singleBundleView";
import withCollections from "higherOrderComponents/withCollections";

class SingleBundle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bundleId: null,
      loading: true,
      places: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const bundleId = urlHandling.idFromUrl();
    this.setState({ bundleId });
    pullBundle(bundleId).then(bundle => {
      const placePromises = bundle.places.map(placeId => {
        return pullPlace(placeId).then(place => {
          place.objectID = placeId;
          this.setState({ places: [...this.state.places, place] });
        });
      });
      return Promise.all(placePromises).then(() => this.setState({ loading: false }));
    });
  }

  renderPlaces = () => {
    return this.state.places.map((place, index) => {
      return <PlaceCard place={place} key={index} />;
    });
  };

  render() {
    const bundle = this.props.collections.bundles[this.state.bundleId];
    return (
      <SingleBundleView
        bundle={bundle}
        loading={this.state.loading}
        renderPlaces={this.renderPlaces}
      />
    );
  }
}
export default withCollections(SingleBundle);
