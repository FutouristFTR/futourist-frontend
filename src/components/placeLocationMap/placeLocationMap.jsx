import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

class PlaceLocationMap extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "100%",
      latitude: this.props.lat,
      longitude: this.props.lng,
      zoom: 12,
    },
  };

  render() {
    return (
      <div className="googlemapsContainer">
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={viewport => this.setState({ viewport })}
        >
          <Marker
            latitude={this.props.lat}
            longitude={this.props.lng}
            offsetLeft={-25}
            offsetTop={-50}
          >
            <img src="/assets/mapMarker.svg" alt="marker" className="mapMarker" />
          </Marker>
        </ReactMapGL>
      </div>
    );
  }
}

export default PlaceLocationMap;
