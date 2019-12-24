import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { openWatchReviewModal, closeWatchReviewModal } from "redux/actions";

export default Component => {
  class WithWatchReview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return <Component {...this.props} watchReview={this.props.watchReview} />;
    }
  }

  const dispatchActions = function(dispatch) {
    return {
      openWatchReviewModal: function(currentIndex) {
        openWatchReviewModal(currentIndex, dispatch);
      },
      closeWatchReviewModal: function() {
        closeWatchReviewModal(dispatch);
      },
    };
  };

  const mapStateToProps = state => {
    return { watchReview: state.watchReview };
  };

  return compose(
    connect(
      mapStateToProps,
      dispatchActions
    )
  )(WithWatchReview);
};
