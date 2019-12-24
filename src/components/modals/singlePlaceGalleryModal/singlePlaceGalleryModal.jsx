import React, { Component } from "react";
import SinglePlaceGalleryModalView from "./singlePlaceGalleryModalView";

class SinglePlaceGalleryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGalleryModalOpen: false,
      gallery: {},
      index: null,
    };
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  openGalleryModal = () => {
    document.addEventListener("keydown", this.handleKeyDown);
    if (this.props.place.photos) {
      this.setState({
        isGalleryModalOpen: true,
        gallery: this.props.place.photos,
        index: this.props.place.photos && Object.keys(this.props.place.photos)[0],
      });
    } else return null;
  };

  closeGalleryModal = () => {
    document.removeEventListener("keydown", this.handleKeyDown);
    this.setState({ isGalleryModalOpen: false });
  };

  nextPhoto = () => {
    this.setState({ index: (this.state.index + 1) % Object.keys(this.props.place.photos).length });
  };

  prevPhoto = () =>
    this.setState({
      index:
        (this.state.index - 1 + Object.keys(this.props.place.photos).length) %
        Object.keys(this.props.place.photos).length,
    });

  handleKeyDown = event => {
    // Esc key
    if (this.state.isGalleryModalOpen && event.keyCode === 27) {
      this.closeGalleryModal();
    }
    // Left arrow
    if (
      this.state.isGalleryModalOpen &&
      Object.keys(this.props.place.photos).length > 1 &&
      event.keyCode === 37
    ) {
      this.prevPhoto();
    }
    // Right arrow
    if (
      this.state.isGalleryModalOpen &&
      Object.keys(this.props.place.photos).length > 1 &&
      event.keyCode === 39
    ) {
      this.nextPhoto();
    }
  };

  render() {
    return (
      <SinglePlaceGalleryModalView
        place={this.props.place && this.props.place}
        gallery={this.state.gallery}
        index={this.state.index}
        nextPhoto={this.nextPhoto}
        prevPhoto={this.prevPhoto}
        closeGalleryModal={this.closeGalleryModal}
        isGalleryModalOpen={this.state.isGalleryModalOpen}
        openGalleryModal={this.openGalleryModal}
      />
    );
  }
}

export default SinglePlaceGalleryModal;
