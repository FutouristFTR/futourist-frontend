import React from "react";
import SingleBundleHero from "components/heros/singleBundleHero/singleBundleHero";
import LoadingSpinner from "components/loadingSpinner/loadingSpinner";

const SingleBundleView = props => (
  <React.Fragment>
    {!props.loading ? (
      <React.Fragment>
        <SingleBundleHero bundle={props.bundle} />
        <section className="bundleContent">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <p className="bundleIntro">MEET THE PERFECT SELECTION FOR YOU</p>
                <p className="bundleDescription">{props.bundle.text}</p>
              </div>
            </div>
            <div className="row">{props.renderPlaces()}</div>
          </div>
        </section>
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    )}
  </React.Fragment>
);

export default SingleBundleView;
