import React from "react";

import SinglePlaceHero from "components/heros/singlePlaceHero/singlePlaceHero";
import SinglePlaceGalleryModal from "components/modals/singlePlaceGalleryModal/singlePlaceGalleryModal";
import SinglePlaceDescription from "components/singlePlaceDescription/singlePlaceDescription";
import CardList from "components/cardList/cardList";
import LoadingSpinner from "components/loadingSpinner/loadingSpinner";

const SinglePlaceView = props => (
  <React.Fragment>
    {!props.loading ? (
      <React.Fragment>
        <SinglePlaceHero
          backgroundImage={
            props.place &&
            props.place.photos &&
            props.place.photos[Object.keys(props.place.photos)[0]].links["1920x1080"]
          }
        >
          <SinglePlaceGalleryModal {...props} />
        </SinglePlaceHero>
        <section>
          <SinglePlaceDescription {...props} placeId={props.placeId} />
        </section>
        <section className="reviewSection">
          <CardList
            listTitle={`All Reviews from ${props.place && props.place.name}`}
            buttonText={
              !props.allReviewsLoaded ? (props.loadingReviews ? null : "Load more reviews") : null
            }
            buttonAction={() => props.loadMoreReviews()}
          >
            {props.renderPlaceReviews()}
          </CardList>
        </section>
        {props.place.outfits && Object.keys(props.place.outfits).length > 0 ? (
          <section>
            <CardList
              listTitle="Included in Travel Outfits"
              listDescription="Discover daily travel guides that fit you perfectly"
              linkText="Show All Travel Outfits"
              linkPath="/search?sorting=relevance&content=outfits"
            >
              {props.renderPlaceOutfits()}
            </CardList>
          </section>
        ) : null}
        {props.place.bundles && Object.keys(props.place.bundles).length > 0 ? (
          <section>
            <CardList
              listTitle="Included in Collections"
              listDescription="Explore top places that match your current cravings"
              linkText="Show All Collections"
              linkPath="/search?sorting=relevance&content=bundles"
            >
              {props.renderPlaceBundles()}
            </CardList>
          </section>
        ) : null}
      </React.Fragment>
    ) : (
      <LoadingSpinner />
    )}
  </React.Fragment>
);

export default SinglePlaceView;
