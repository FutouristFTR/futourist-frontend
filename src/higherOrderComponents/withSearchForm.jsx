import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import routes from "constants/routes";

import beginAutocomplete from "api/here/core/autocomplete";
import transformTextToLatLng from "api/here/core/geocoding";

import urlHandling from "utils/urlHandling";
import withCollections from "./withCollections";

const INITIAL_SEARCH_PARAMS = {
  keyword: "",
  categories: [],
  lat: null,
  lng: null,
  myLat: null,
  myLng: null,
  locationName: "",
  sorting: "relevance",
};
export default Component => {
  class withSearchForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        searchParams: INITIAL_SEARCH_PARAMS,
        locationInputFocused: false,
        selectedCategories: {},
        suggestions: [],
        loadingSearchResults: false,
        error: "",
      };
    }

    setSearchUrl = (property, value) => {
      if (typeof value === "boolean") {
        let selectedCategories = { ...this.state.selectedCategories, [property]: value };

        let searchParams = {
          ...this.state.searchParams,
          categories: Object.keys(selectedCategories).filter(key => selectedCategories[key]),
        };
        this.setState({
          selectedCategories,
          searchParams,
        });
      } else {
        this.setState({ searchParams: { ...this.state.searchParams, [property]: value } });
      }
    };

    doAutocompleteRequest = () => {
      beginAutocomplete(this.state.searchParams.locationName).then(suggestions => {
        this.setState({ suggestions });
      });
    };

    handleLocationInputClick = () => {
      this.setState({ locationInputFocused: !this.state.locationInputFocused }, () => {
        if (this.state.locationInputFocused) {
          document.addEventListener("keyup", this.doAutocompleteRequest);
        } else {
          document.removeEventListener("keyup", this.doAutocompleteRequest);
        }
      });
    };

    proceedToSearch = doneCallback => {
      window.scrollTo(0, 0);
      if (this.state.searchParams.locationName !== "") {
        this.setState({ loadingSearchResults: true });
        transformTextToLatLng(this.state.searchParams.locationName)
          .then(location => {
            this.setState(
              {
                searchParams: {
                  ...this.state.searchParams,
                  lat: location.Latitude,
                  lng: location.Longitude,
                },
              },
              () => {
                this.props.history.push(
                  routes.SEARCH_RESULTS +
                    "?" +
                    urlHandling.objectToQueryString(this.state.searchParams)
                );
                this.setState({ searchParams: INITIAL_SEARCH_PARAMS, loadingSearchResults: false });
                if (doneCallback) doneCallback();
              }
            );
          })
          .catch(error => this.setState({ error: error.message }));
      } else {
        this.setState(
          {
            searchParams: {
              ...this.state.searchParams,
              lat: null,
              lng: null,
            },
          },
          () => {
            this.props.history.push(
              routes.SEARCH_RESULTS + "?" + urlHandling.objectToQueryString(this.state.searchParams)
            );
            this.setState({ searchParams: INITIAL_SEARCH_PARAMS, loadingSearchResults: false });
            if (doneCallback) doneCallback();
          }
        );
      }
    };

    render() {
      return (
        <Component
          collectionsRedux={this.props.collections}
          handleLocationInputClick={this.handleLocationInputClick}
          locationInputFocused={this.state.locationInputFocused}
          proceedToSearch={this.proceedToSearch}
          selectedCategories={this.state.selectedCategories}
          setLocationText={this.setLocationText}
          setSearchUrl={this.setSearchUrl}
          suggestions={this.state.suggestions}
          search={this.props.search}
          searchParams={this.state.searchParams}
          loadingSearchResults={this.state.loadingSearchResults}
          error={this.state.error}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return { search: state.search };
  };

  return compose(connect(mapStateToProps))(withCollections(withRouter(withSearchForm)));
};
