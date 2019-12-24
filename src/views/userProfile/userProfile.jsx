import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import store from "redux/store";
import { deleteReviewFromUserCollection } from "redux/actions";

import firebase from "firebase";

import UserProfileView from "./userProfileView";
import WatchReviewModal from "components/modals/watchReviewModal";

import withLoginForm from "higherOrderComponents/withLoginForm";
import withWatchReview from "higherOrderComponents/withWatchReview";

import { pullReviewsForUser } from "api/collections/reviews";
import urlHandling from "utils/urlHandling";
import ReviewCard from "components/cards/reviewCard/reviewCard";

import reviewsConstants from "constants/reviews";
import { pullUser } from "api/collections/users";
import Icon from "components/icons/icons";
import Button from "components/button/button";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      lastReview: "",
      userId: null,
      loading: true,
      loadingReviews: false,
      allReviewsLoaded: false,
      deleteReviewPopupOpen: false,
      deleteReviewIndex: null,
      reviewDeleted: false,
    };
  }

  componentDidMount() {
    const userId = urlHandling.getUserIdFromUrl();

    pullUser(userId).then(user => {
      if (!user) return this.props.history.push("/");
      this.setState({
        loading: false,
        userId,
      });
    });

    this.pullReviews(userId, new Date());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.userId) {
      return { userId: nextProps.match.params.id, loading: true, reviews: [] };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userId !== this.state.userId) {
      pullUser(this.state.userId).then(() => {
        this.setState({
          loading: false,
        });
      });

      this.pullReviews(this.state.userId, new Date());
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  pullReviews = (userId, date) => {
    pullReviewsForUser(userId, date, reviewsConstants.PLACE_REVIEWS_TO_PULL + 1).then(reviews => {
      let reviewArray = [];

      Object.keys(reviews).forEach((review, index) => {
        if (index < reviewsConstants.PLACE_REVIEWS_TO_PULL) {
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
    this.pullReviews(this.state.userId, date);
  };

  openPopup = index => {
    this.setState({
      deleteReviewPopupOpen: true,
      deleteReviewIndex: index,
    });
    document.addEventListener("click", this.handleOutsideClick);
  };

  closePopup = () => {
    this.setState({ deleteReviewPopupOpen: false, deleteReviewIndex: null });
    document.removeEventListener("click", this.handleOutsideClick);
  };

  deleteReview = review => {
    const db = firebase.firestore();
    const userId = review[Object.keys(review)[0]].userId;
    const reviewId = Object.keys(review)[0];
    db.collection("reviews")
      .doc(reviewId)
      .update({ status: 200 })
      .then(() => {
        let newReviews = this.state.reviews.filter(stateReview => {
          let currentId = Object.keys(stateReview)[0];
          return currentId !== reviewId;
        });
        let lastReview = newReviews.length
          ? Object.values(newReviews[newReviews.length - 1])[0].created
          : new Date();
        console.log(newReviews);
        this.setState({
          reviews: newReviews,
          lastReview,
        });
        deleteReviewFromUserCollection(reviewId, userId, store.dispatch);
      })
      .catch(error => console.error(error));
  };

  handleOutsideClick = e => {
    if (this.node.contains(e.target)) {
      return;
    } else {
      this.setState({
        deleteReviewPopupOpen: false,
        deleteReviewIndex: null,
      });
      document.removeEventListener("click", this.handleOutsideClick);
    }
  };

  renderUserReviews = () => {
    if (this.state.reviews.length > 0) {
      return this.state.reviews.map((review, index) => {
        return (
          <div
            className="col-6 col-md-4 col-lg-3 px-1 px-md-2"
            key={Object.values(review)[0].created}
          >
            {this.state.userId === this.props.auth.userUid ? (
              <div
                className="deleteReviewButtonContainer"
                onClick={() => {
                  this.openPopup(index);
                }}
              >
                {this.state.deleteReviewPopupOpen && this.state.deleteReviewIndex === index ? (
                  <div className="deleteReviewPopupContainer">
                    <div
                      ref={node => {
                        this.node = node;
                      }}
                    >
                      <div className="deleteMessageContainer">
                        <span>Remove this review?</span>
                      </div>
                      <div>
                        <Button
                          className="yesButton"
                          onClick={e => {
                            e.stopPropagation();
                            this.deleteReview(review);
                            this.closePopup();
                          }}
                        >
                          YES
                        </Button>
                        <Button
                          className="noButton"
                          onClick={e => {
                            e.stopPropagation();
                            this.closePopup();
                          }}
                        >
                          NO
                        </Button>
                      </div>
                    </div>
                    <div className="arrowDown" />
                  </div>
                ) : null}
                <Icon name="close" size="100%" />
              </div>
            ) : null}
            <ReviewCard reviewData={review[Object.keys(review)]} indexInArray={index} />
          </div>
        );
      });
    } else if (this.state.allReviewsLoaded) {
      return (
        <div className="col-12">
          <span className="noReviewsYetText">This user did not add any reviews yet.</span>
        </div>
      );
    } else return null;
  };

  render() {
    const user = this.props.users[this.state.userId];

    return (
      <React.Fragment>
        {this.props.watchReview.isWatchReviewModalOpen ? (
          <WatchReviewModal
            loadMoreReviews={this.loadMoreReviews}
            reviews={this.state.reviews}
            allReviewsLoaded={this.state.allReviewsLoaded}
          />
        ) : null}
        <UserProfileView
          loading={this.state.loading}
          loadingReviews={this.state.loadingReviews}
          user={user}
          userId={this.state.userId}
          userUid={this.props.auth.userUid}
          renderUserReviews={this.renderUserReviews}
          loadMoreReviews={this.loadMoreReviews}
          reviews={this.state.reviews}
          allReviewsLoaded={this.state.allReviewsLoaded}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    places: state.collections.places,
    users: state.collections.users,
  };
};

export default compose(connect(mapStateToProps, null))(withWatchReview(withLoginForm(UserProfile)));
