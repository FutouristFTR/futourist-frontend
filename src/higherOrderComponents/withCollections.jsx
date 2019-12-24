import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

const withCollections = Component => {
  class WithCollections extends React.Component {
    render() {
      return (
        <Component
          search={this.props.search}
          collections={this.props.collections}
          watchReview={this.props.watchReview}
        />
      );
    }
  }
  const mapStateToProps = state => {
    return { collections: state.collections };
  };

  return compose(
    connect(
      mapStateToProps,
      null
    )
  )(WithCollections);
};

export default withCollections;
