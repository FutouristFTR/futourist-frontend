import React, { Component } from "react";

import withAddReview from "higherOrderComponents/withAddReview";
import withWatchReview from "higherOrderComponents/withWatchReview";
import { pullLatestReviews } from "api/collections/reviews";

import reviewsConstants from "constants/reviews";

import HomeHero from "components/heros/homeHero";
import HomeSearch from "components/homeSearch";
import Navbar from "components/navbar";
import CardList from "components/cardList/cardList";
import ReviewCard from "components/cards/reviewCard";
import WatchReviewModal from "components/modals/watchReviewModal";
import LoadingSpinner from "components/loadingSpinner/loadingSpinner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      lastReview: "",
      loading: true,
      loadingReviews: false,
      allReviewsLoaded: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);

    this.setState({ loading: false });

    this.pullReviews(new Date());
  }

  pullReviews = date => {
    pullLatestReviews(date, reviewsConstants.LATEST_REVIEWS_TO_PULL + 1).then(reviews => {
      let reviewArray = [];

      Object.keys(reviews).forEach((review, index) => {
        if (index < reviewsConstants.LATEST_REVIEWS_TO_PULL) {
          reviewArray.push({ [review]: reviews[review] });
        }
      });

      reviewArray.sort(function(a, b) {
        if (a.created > b.created) {
          return -1;
        } else if (a.created === b.created) {
          return 0;
        }
        return 1;
      });

      if (Object.keys(reviews).length > reviewsConstants.LATEST_REVIEWS_TO_PULL)
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
    this.pullReviews(date);
  };

  renderLatestReviews = () => {
    if (this.state.reviews.length > 0) {
      return this.state.reviews.map((review, index) => {
        return (
          <div className="col-6 col-md-4 col-lg-3 px-1 px-md-2" key={index}>
            <ReviewCard reviewData={review[Object.keys(review)]} indexInArray={index} />
          </div>
        );
      });
    } else if (this.state.reviews.length === 0 && !this.state.loadingReviews) {
      return (
        <div className="col-12">
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <div className="col-12">
          <span className="noReviewsYetText">There are no reviews yet.</span>
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.watchReview.isWatchReviewModalOpen ? (
          <WatchReviewModal
            loadMoreReviews={this.loadMoreReviews}
            reviews={this.state.reviews}
            allReviewsLoaded={this.state.allReviewsLoaded}
          />
        ) : null}
        <Navbar />
        <HomeHero>
          <HomeSearch />
        </HomeHero>
        <section className="reviewSection">
          <CardList
            listTitle="Latest reviews"
            buttonText={
              !this.state.allReviewsLoaded
                ? this.state.loadingReviews
                  ? null
                  : "Load more latest reviews"
                : null
            }
            buttonAction={() => this.loadMoreReviews()}
          >
            {this.renderLatestReviews()}
          </CardList>
        </section>
      </React.Fragment>
    );
  }
}

export default withWatchReview(withAddReview(Home));
