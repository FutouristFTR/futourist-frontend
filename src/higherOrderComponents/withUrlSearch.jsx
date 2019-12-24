import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";

import urlHandling from "utils/urlHandling";
import areArraysEquivalent from "utils/arrayEquivalence";

import { performSearch } from "api/algolia/algoliaQuery";

export default Component => {
  class WithUrlSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchParams: {
          keyword: "",
          sorting: "",
          categories: [],
          lat: null,
          lng: null,
          myLat: null,
          myLng: null,
          locationName: "null",
        },
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const newSearchParams = urlHandling.queryStringToObject(nextProps.location.search);
      const oldSearchParams = prevState.searchParams;

      if (
        oldSearchParams.keyword !== newSearchParams.keyword ||
        oldSearchParams.sorting !== newSearchParams.sorting ||
        oldSearchParams.lat !== newSearchParams.lat ||
        oldSearchParams.lng !== newSearchParams.lng ||
        oldSearchParams.myLat !== newSearchParams.myLat ||
        oldSearchParams.myLng !== newSearchParams.myLng ||
        oldSearchParams.locationName !== newSearchParams.locationName ||
        !areArraysEquivalent(oldSearchParams.categories, newSearchParams.categories)
      ) {
        performSearch(newSearchParams);
      }
      return {
        searchParams: newSearchParams,
      };
    }

    render() {
      return <Component search={this.props.search} />;
    }
  }

  const mapStateToProps = state => {
    return { search: state.search };
  };

  return compose(connect(mapStateToProps))(WithUrlSearch);
};
