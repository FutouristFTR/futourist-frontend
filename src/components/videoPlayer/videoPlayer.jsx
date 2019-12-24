import React, { Component } from "react";
import ReactPlayer from "react-player";
const setLoadingStyle = () => {
  let videoWrapper = document.getElementById("watchReviewModalContainer");
  if (videoWrapper) {
    if (window.innerHeight * 0.9 * 9 > window.innerWidth * 16) {
      // extremely tall screens
      videoWrapper.style.width = window.innerWidth + "px";
      videoWrapper.style.height = (window.innerWidth * 16) / 9 + "px";
    } else {
      // other screens
      videoWrapper.style.height = window.innerHeight * 0.9 + "px";
      videoWrapper.style.width = (window.innerHeight * 0.9 * 9) / 16 + "px";
    }
  }
};
const unsetLoadingStyle = () => {
  let videoWrapper = document.getElementById("watchReviewModalContainer");
  if (videoWrapper) {
    videoWrapper.style.height = "unset";
    videoWrapper.style.width = "unset";
  }
};
class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      src: this.props.src,
    };
  }
  componentDidMount() {
    this.startLoader();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.src !== prevState.src) {
      setLoadingStyle();
      return { src: nextProps.src, loading: true };
    }
    return null;
  }

  stopLoader() {
    this.setState({ loading: false });
    unsetLoadingStyle();
  }
  startLoader() {
    this.setState({ loading: true });
    setLoadingStyle();
  }
  componentWillUnmount() {
    this.startLoader();
  }
  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <div className="videoLoadingSpinnerContainer" onClick={e => e.stopPropagation()}>
            <div className="spinnerIconContainer">
              <img src="/assets/loader.svg" height="120px" width="70px" alt="spinner" />
            </div>
          </div>
        ) : null}
        <ReactPlayer
          className="videoPlayerWrapper"
          url={this.state.src}
          playing
          height="unset"
          config={{
            file: {
              attributes: {
                id: "videoReview",
                playsInline: true,
                style: { maxWidth: "100%", maxHeight: window.innerHeight * 0.9 },
              },
            },
          }}
          width="unset"
          loop
          onReady={e => {
            let videoElement = document.getElementById("videoReview");
            let videoHeight = videoElement.videoHeight;
            let screenHeight = window.innerHeight;
            let videoWidth = videoElement.videoWidth;
            let screenWidth = window.innerWidth;

            if (videoWidth / videoHeight > screenWidth / (screenHeight * 0.9)) {
              videoElement.style.height = "unset";
            } else {
              let height = screenHeight * 0.9;
              videoElement.style.height = `${height}px`;
            }

            this.stopLoader();
          }}
          onPlay={() => this.stopLoader()}
          onBufferEnd={() => this.stopLoader()}
          onClick={e => e.stopPropagation()}
        ></ReactPlayer>
      </React.Fragment>
    );
  }
}

export default VideoPlayer;
