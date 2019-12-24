import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import { pullPlace } from "api/collections/places";
import { pullReviewsForPlace } from "api/collections/reviews";

import withWatchReview from "higherOrderComponents/withWatchReview";

import urlHandling from "utils/urlHandling";
import reviewsConstants from "constants/reviews";

import SinglePlaceView from "./singlePlaceView";
import WatchReviewModal from "components/modals/watchReviewModal";
import OutfitCard from "components/cards/outfitCard/outfitCard";
import BundleCard from "components/cards/bundleCard/bundleCard";
import ReviewCard from "components/cards/reviewCard/reviewCard";

class SinglePlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      outfits: {},
      bundles: {},
      reviews: [],
      lastReview: "",
      placeId: null,
      loading: true,
      loadingReviews: false,
      allReviewsLoaded: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const placeId = urlHandling.idFromUrl();
    this.setState({ placeId });
    pullPlace(placeId).then(place => {
      this.setState({
        loading: false,
        outfits: place.outfits,
        bundles: place.bundles,
      });
    });

    this.pullReviews(placeId, new Date());
  }

  pullReviews = (placeId, date) => {
    pullReviewsForPlace(placeId, date, reviewsConstants.PLACE_REVIEWS_TO_PULL + 1).then(reviews => {
      let reviewArray = [];

      Object.keys(reviews).forEach((review, index) => {
        if (index < reviewsConstants.PLACE_REVIEWS_TO_PULL) {
          reviewArray.push({ [review]: reviews[review] });
        }
      });

      reviewArray.sort((a, b) => {
        if (a.created > b.created) {
          return -1;
        } else if (a.created === b.created) {
          return 0;
        }
        return 1;
      });

      if (Object.keys(reviews).length > reviewsConstants.PLACE_REVIEWS_TO_PULL)
        this.setState({ allReviewsLoaded: false });
      else this.setState({ allReviewsLoaded: true });

      if (reviewArray.length > 0) {
        let lastReviewId = Object.keys(reviewArray[reviewArray.length - 1]);
        let lastReview = reviewArray[reviewArray.length - 1][lastReviewId].created;
        this.setState({
          lastReview,
          loadingReviews: false,
          reviews: [...this.state.reviews, ...reviewArray],
        });
      }
    });
  };

  loadMoreReviews = () => {
    let date = this.state.lastReview;

    this.setState({ loadingReviews: true });
    this.pullReviews(this.state.placeId, date);
  };

  renderPlaceOutfits = () => {
    if (this.state.outfits) {
      return Object.keys(this.state.outfits).map((outfitId, index) => {
        if (index <= 1) {
          const outfit = this.state.outfits[outfitId];
          return <OutfitCard outfitId={outfitId} outfit={outfit} key={index} />;
        }
        return null;
      });
    }
  };

  renderPlaceBundles = () => {
    if (this.state.bundles) {
      return Object.keys(this.state.bundles).map((bundleId, index) => {
        if (index <= 3) {
          const bundle = this.state.bundles[bundleId];
          return <BundleCard bundleId={bundleId} bundle={bundle} key={index} />;
        }
        return null;
      });
    }
  };

  renderPlaceReviews = () => {
    if (this.state.reviews.length > 0) {
      return this.state.reviews.map((review, index) => {
        return (
          <div className="col-6 col-md-4 col-lg-3 px-1 px-md-2" key={index}>
            <ReviewCard reviewData={review[Object.keys(review)]} indexInArray={index} />
          </div>
        );
      });
    } else {
      return (
        <div className="col-12">
          <span className="noReviewsYetText">
            No reviews yet. Be the first one to review this place!
          </span>
        </div>
      );
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.placeId !== nextState.placeId ||
      this.state.reviews !== nextState.reviews ||
      this.props.watchReview.isWatchReviewModalOpen !==
        nextProps.watchReview.isWatchReviewModalOpen ||
      this.state.loading !== nextState.loading ||
      this.state.allReviewsLoaded !== nextState.allReviewsLoaded ||
      this.state.loadingReviews !== nextState.loadingReviews
    );
  }

  render() {
    const place = this.props.places[this.state.placeId];

    return (
      <React.Fragment>
        {this.props.watchReview.isWatchReviewModalOpen ? (
          <WatchReviewModal
            loadMoreReviews={this.loadMoreReviews}
            reviews={this.state.reviews}
            allReviewsLoaded={this.state.allReviewsLoaded}
          />
        ) : null}
        <SinglePlaceView
          loading={this.state.loading}
          loadingReviews={this.state.loadingReviews}
          place={place}
          placeId={this.state.placeId}
          renderPlaceOutfits={this.renderPlaceOutfits}
          renderPlaceBundles={this.renderPlaceBundles}
          renderPlaceReviews={this.renderPlaceReviews}
          loadMoreReviews={this.loadMoreReviews}
          reviews={this.state.reviews}
          allReviewsLoaded={this.state.allReviewsLoaded}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { places: state.collections.places, users: state.collections.users };
};

export default compose(connect(mapStateToProps, null))(withWatchReview(SinglePlace));
