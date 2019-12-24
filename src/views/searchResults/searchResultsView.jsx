import React from "react";
import ResultsCard from "components/cards/resultsCard/resultsCard";
import collections from "constants/collections";

const placesImage = "/assets/futourist_places.jpg";
const outfitsImage = "/assets/futourist_outfits.jpg";
const bundlesImage = "/assets/futourist_collections.jpg";

const SearchResultsView = props => {
  const params = props.search.params;
  return (
    <section>
      <div className="container">
        <div className="searchResultsCardsSection">
          <div className="row">
            <div className="col-12">
              <div className="searchResultTitle">
                {!params.keyword && !params.categories && !params.locationName ? (
                  <span className="searchResultsTextBold">All results </span>
                ) : null}
                {params.keyword || params.categories || params.locationName ? (
                  <span className="searchResultsText">Results </span>
                ) : null}
                {params.keyword ? (
                  <React.Fragment>
                    <span className="searchResultsText">for </span>
                    <span className="searchResultsTextBold">"{params.keyword}" </span>
                  </React.Fragment>
                ) : null}
                {params.categories ? (
                  <React.Fragment>
                    <span className="searchResultsText">in </span>
                    <span className="searchResultsTextBold">
                      {params.categories.join(", ") + " "}
                    </span>
                  </React.Fragment>
                ) : null}{" "}
                {params.locationName ? (
                  <React.Fragment>
                    <span className="searchResultsText">near </span>
                    <span className="searchResultsTextBold">
                      {params.locationName === "Nearby" ? "me " : params.locationName + " "}
                    </span>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
            <ResultsCard
              active={props.content === collections.PLACES ? true : false}
              cardDescription="Restaurants, bars, venues, ..."
              cardImage={placesImage}
              cardName="Places"
              onClick={() => props.renderPlaces()}
              resultsLength={props.search.results.places.length}
            />
            <ResultsCard
              active={props.content === collections.OUTFITS ? true : false}
              cardDescription="Discover daily travel guides that fit you, ..."
              cardImage={outfitsImage}
              cardName="Travel Outfits"
              onClick={() => props.renderOutfits()}
              resultsLength={props.search.results.outfits.length}
            />
            <ResultsCard
              active={props.content === collections.BUNDLES ? true : false}
              cardDescription="Explore top places that match your, ..."
              cardImage={bundlesImage}
              cardName="Collections"
              onClick={() => props.renderCollections()}
              resultsLength={props.search.results.bundles.length}
            />
          </div>
        </div>
        <div className="searchResultsSection">
          <div className="row">
            <div className="col-12">
              <h2>{props.contentName}</h2>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResultsView;
