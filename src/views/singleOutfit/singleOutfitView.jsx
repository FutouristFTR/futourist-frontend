import React from "react";
import SingleOutfitHero from "components/heros/singleOutfitHero/singleOutfitHero";
import SingleOutfitNav from "components/singleOutfitNav/singleOutfitNav";
import LoadingSpinner from "components/loadingSpinner/loadingSpinner";

const SingleOutfitView = props => (
  <React.Fragment>
    {!props.loading ? (
      <React.Fragment>
        <SingleOutfitHero outfit={props.outfit} />
        <section>
          <SingleOutfitNav outfit={props.outfit} collections={props.collections} />
        </section>
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    )}
  </React.Fragment>
);

export default SingleOutfitView;
