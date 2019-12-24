import React, { Component } from "react";
import SingleOutfitDayPartView from "./singleOutfitDayPartView";
import { pullPlace } from "api/collections/places";

import PlaceCard from "components/cards/placeCard/placeCard";

class SingleOutfitDayPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    this.props.dayPart.places.forEach(placeId => {
      pullPlace(placeId).then(place => {
        place.objectID = placeId;
        this.setState({ places: [...this.state.places, place] });
      });
    });
  }

  renderPlaces = () => {
    return this.state.places.map((place, index) => {
      return <PlaceCard grid={"col-12 col-md-6"} place={place} key={index} />;
    });
  };

  render() {
    return (
      <SingleOutfitDayPartView
        id={this.props.id}
        title={this.props.title}
        dayPart={this.props.dayPart}
        renderPlaces={this.renderPlaces}
      />
    );
  }
}

export default SingleOutfitDayPart;
