import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SearchResultsView from "./searchResultsView";
import SortSearchResults from "components/sortSearchResults/sortSearchResults";
import routes from "constants/routes";
import collections from "constants/collections";

import PlaceCard from "components/cards/placeCard/placeCard";
import OutfitCard from "components/cards/outfitCard/outfitCard";
import BundleCard from "components/cards/bundleCard/bundleCard";
import withUrlSearch from "higherOrderComponents/withUrlSearch";

import { performSearch } from "api/algolia/algoliaQuery";
import urlHandling from "utils/urlHandling";
import LoadingSpinner from "components/loadingSpinner/loadingSpinner";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: collections.PLACES,
      contentName: "Places",
      searchDone: this.props.search.searchDone,
      shouldFetchMore: true,
      myLat: null,
      myLng: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let urlParams = urlHandling.queryStringToObject(nextProps.location.search);
    if (
      (nextProps.search.searchDone && !prevState.searchDone) ||
      nextProps.contentName !== prevState.contentName
    ) {
      if (urlParams.content === collections.PLACES && nextProps.search.results.places.length > 0) {
        return {
          content: collections.PLACES,
          contentName: "Places",
          searchDone: nextProps.search.searchDone,
        };
      } else if (
        urlParams.content === collections.OUTFITS &&
        nextProps.search.results.outfits.length > 0
      ) {
        return {
          content: collections.OUTFITS,
          contentName: "Outfits",
          searchDone: nextProps.search.searchDone,
        };
      } else if (
        urlParams.content === collections.BUNDLES &&
        nextProps.search.results.bundles.length > 0
      ) {
        return {
          content: collections.BUNDLES,
          contentName: "Collections",
          searchDone: nextProps.search.searchDone,
        };
      }
    }
    return null;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  sortSearchResults = typeOfSorting => {
    window.scrollTo(0, 0);

    if (typeOfSorting !== this.props.search.params.sorting) {
      let searchParams = this.props.search.params;
      searchParams["sorting"] = typeOfSorting;
      searchParams["myLat"] = null;
      searchParams["myLng"] = null;

      this.props.history.push(
        routes.SEARCH_RESULTS + "?" + urlHandling.objectToQueryString(searchParams)
      );
      performSearch(searchParams);
    }
  };

  renderPlaces = () => {
    let urlParams = urlHandling.queryStringToObject(this.props.location.search);
    urlParams.content = collections.PLACES;

    this.props.history.push(
      routes.SEARCH_RESULTS + "?" + urlHandling.objectToQueryString(urlParams)
    );

    this.setState({ content: collections.PLACES, contentName: "Places" });
  };

  renderOutfits = () => {
    let urlParams = urlHandling.queryStringToObject(this.props.location.search);
    urlParams.content = collections.OUTFITS;

    this.props.history.push(
      routes.SEARCH_RESULTS + "?" + urlHandling.objectToQueryString(urlParams)
    );
    this.setState({ content: collections.OUTFITS, contentName: "Travel Outfits" });
  };

  renderCollections = () => {
    let urlParams = urlHandling.queryStringToObject(this.props.location.search);
    urlParams.content = collections.BUNDLES;

    this.props.history.push(
      routes.SEARCH_RESULTS + "?" + urlHandling.objectToQueryString(urlParams)
    );
    this.setState({ content: collections.BUNDLES, contentName: "Collections" });
  };

  setNoResults = () => {
    this.setState({ contentName: "" });
  };

  renderContent = () => {
    if (
      this.props.search.searchDone === true &&
      this.props.search.results.outfits.length === 0 &&
      this.props.search.results.bundles.length === 0 &&
      this.props.search.results.places.length === 0
    ) {
      // this.setNoResults();
      return (
        <div className="col-12">
          <span className="noReslutsText">There are no results</span>
          {this.props.search.params.keyword ? (
            <React.Fragment>
              <span className="noReslutsText"> for keyword </span>
              <span className="noResultsTextBold">"{this.props.search.params.keyword}"</span>
            </React.Fragment>
          ) : null}
          {this.props.search.params.categories ? (
            <React.Fragment>
              <span className="noReslutsText"> in category </span>
              <span className="noResultsTextBold">
                "{this.props.search.params.categories.join(", ")}"
              </span>
            </React.Fragment>
          ) : null}
          {this.props.search.params.locationName ? (
            <React.Fragment>
              <span className="noReslutsText"> near </span>
              <span className="noResultsTextBold">"{this.props.search.params.locationName}"</span>
            </React.Fragment>
          ) : null}
        </div>
      );
    } else if (
      (this.state.content === collections.PLACES && this.props.search.results.places.length > 0) ||
      (this.props.search.results.outfits.length === 0 &&
        this.props.search.results.bundles.length === 0)
    ) {
      // this.renderPlaces();
      return this.props.search.results.places.map((place, index) => {
        return <PlaceCard key={index} place={place} />;
      });
    } else if (
      (this.state.content === collections.OUTFITS &&
        this.props.search.results.outfits.length > 0) ||
      (this.props.search.results.places.length === 0 &&
        this.props.search.results.bundles.length === 0)
    ) {
      // this.renderOutfits();
      return this.props.search.results.outfits.map((outfit, index) => {
        return <OutfitCard key={index} outfit={outfit} />;
      });
    } else if (
      (this.state.content === collections.BUNDLES &&
        this.props.search.results.bundles.length > 0) ||
      (this.props.search.results.places.length === 0 &&
        this.props.search.results.outfits.length === 0)
    ) {
      // this.renderCollections();
      return this.props.search.results.bundles.map((bundle, index) => {
        return <BundleCard key={index} bundle={bundle} />;
      });
    }
  };

  handleScroll = () => {
    const windowHeight =
      "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    let windowBottom = windowHeight + window.pageYOffset + 400;

    if (
      windowBottom > docHeight &&
      this.state.shouldFetchMore &&
      !this.props.search.pagesLoaded[this.state.content].allLoaded
    ) {
      this.setState({ shouldFetchMore: false }, () => {
        let searchParams = this.props.search.params;
        performSearch(
          searchParams,
          this.props.search.pagesLoaded[this.state.content].pages,
          this.state.content
        ).then(() => this.setState({ shouldFetchMore: true }));
      });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.search.searchDone !== this.props.search.searchDone ||
      nextState.content !== this.state.content ||
      nextState.contentName !== this.state.contentName
    );
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.search.searchDone && this.props.search.pagesLoaded.places.pages < 1 ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            <SortSearchResults
              search={this.props.search}
              sortSearchResults={this.sortSearchResults}
              getLocation={this.getLocation}
            />
            <SearchResultsView
              search={this.props.search}
              content={this.state.content}
              contentName={this.state.contentName}
              renderPlaces={this.renderPlaces}
              renderOutfits={this.renderOutfits}
              renderCollections={this.renderCollections}
              loading={!this.props.search.searchDone}
            >
              {this.renderContent()}
            </SearchResultsView>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withUrlSearch(withRouter(SearchResults));
