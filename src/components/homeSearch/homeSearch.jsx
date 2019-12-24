import React from "react";

import withSearchForm from "higherOrderComponents/withSearchForm";

// import Tag from "components/tag/tag";
import LocationSuggestions from "components/locationSuggestions/locationSuggestions";
import Button from "components/button/button";

const HomeSearch = ({
  collectionsRedux,
  handleLocationInputClick,
  locationInputFocused,
  proceedToSearch,
  searchParams,
  selectedCategories,
  setSearchUrl,
  suggestions,
  loadingSearchResults,
  error,
}) => (
  <div className="col-lg-6 col-md-8">
    <div className="homeSearchContainer">
      <h1>Explore places in Slovenia</h1>
      <form className="homeSearchForm" autoComplete="off">
        <div>
          <label className="searchLabel">What?</label>
        </div>
        <div>
          <input
            type="text"
            className="customInput"
            placeholder="e.g.: 'burger'"
            name="keyword"
            value={searchParams.keyword}
            onChange={event => {
              setSearchUrl(event.target.name, event.target.value);
            }}
          />
        </div>
        <div>
          <label className="searchLabel">Where?</label>
        </div>
        <div className="searchLocationInputWrapper">
          <input
            id="homeSearchLocationInput"
            type="text"
            className="customInput"
            placeholder="e.g. 'Ljubljana'"
            name="locationName"
            value={searchParams.locationName}
            onFocus={handleLocationInputClick}
            onBlur={handleLocationInputClick}
            onChange={event => {
              setSearchUrl(event.target.name, event.target.value);
            }}
          />
          <div className="myLocation" onClick={() => setSearchUrl("locationName", "Nearby")}>
            Use my location
          </div>
          <LocationSuggestions
            locationQuery={searchParams.locationName}
            locationInputFocused={locationInputFocused}
            suggestions={suggestions}
            setSearchUrl={setSearchUrl}
          />
        </div>
        <div>
          <label className="searchLabel">categories</label>
        </div>
        <div className="categoriesContainer">
          {collectionsRedux.fetchStatus.categories === "DONE" ? (
            Object.keys(collectionsRedux.categories).map((category, index) => {
              return (
                <label key={index} className="categoryWraper">
                  <input
                    className="categoryInput"
                    type="checkbox"
                    name={category}
                    value={category}
                    checked={!!selectedCategories[category]}
                    onChange={event => {
                      setSearchUrl(category, event.target.checked);
                    }}
                  />
                  <span className="categoryLabel">{category}</span>
                </label>
              );
            })
          ) : (
            <div className="categoriesLoadingSpinner">
              <i className="fas fa-spinner fa-spin fa-2x spinnerStyle"></i>
            </div>
          )}
        </div>
        <Button
          className="submitButton"
          type="submit"
          value="Search"
          onClick={event => {
            event.preventDefault();
            proceedToSearch();
          }}
        >
          {loadingSearchResults ? <i className="fas fa-spinner fa-spin"></i> : "Search"}
        </Button>
      </form>
      {/* <div className="popularSearchesContainer">
        <span className="popularSearchesTitle">Explore popular searches:</span>
        <div className="popularSearchesLabelContainer">
          <Tag>Gin Tonic</Tag>
          <Tag>Ljubljana castle</Tag>
          <Tag>Tromostovje</Tag>
          <div className="morePopularSearchesButton">200 more...</div>
        </div>
      </div> */}
    </div>
  </div>
);

export default withSearchForm(HomeSearch);
