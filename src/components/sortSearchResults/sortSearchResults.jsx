import React, { Component } from "react";

class SortSearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="customBorderedRow">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="myCont">
                <span className="sortByLabel">Sort by:</span>
                <div className="sortingButtonsContainer">
                  {/* <div
                    className={`sortingButton${
                      this.props.search.params.sorting === "distance" ? "-active" : ""
                    }`}
                    onClick={() => {
                      this.props.getLocation();
                      // this.props.sortSearchResults("distance");
                    }}
                  >
                    Distance
                  </div> */}
                  <div
                    className={`sortingButton${
                      this.props.search.params.sorting === "relevance" ? "-active" : ""
                    }`}
                    onClick={() => this.props.sortSearchResults("relevance")}
                  >
                    Relevance
                  </div>
                  <div
                    className={`sortingButton${
                      this.props.search.params.sorting === "rating" ? "-active" : ""
                    }`}
                    onClick={() => this.props.sortSearchResults("rating")}
                  >
                    Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SortSearchResults;
