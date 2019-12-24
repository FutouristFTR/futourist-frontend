import React, { Component } from "react";

class LoadingSpinner extends Component {
  render() {
    return (
      <section>
        <div className="spinnerContainer">
          <div className="lightOverlay" />
          <div className="spinnerIconContainer">
            <img
              src="/assets/loader.svg"
              className="spinnerStyle"
              height="120px"
              width="70px"
              alt="spinner"
            />
            {/* <i className="fas fa-spinner fa-spin fa-5x spinnerStyle"></i> */}
          </div>
        </div>
      </section>
    );
  }
}

export default LoadingSpinner;
