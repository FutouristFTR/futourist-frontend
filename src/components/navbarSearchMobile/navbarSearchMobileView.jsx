import React from "react";

import Icon from "components/icons/icons";
import LocationSuggestions from "components/locationSuggestions/locationSuggestions";
import Button from "components/button";

const NavbarSearchMobileView = ({
  collectionsRedux,
  handleLocationInputClick,
  locationInputFocused,
  searchParams,
  setSearchUrl,
  suggestions,
  openDropdown,
  isDropdownOpen,
  selectedCategories,
  proceedToSearch,
  closeDropdown,
  loading,
  handleInputClick,
  loadingSearchResults,
}) => {
  return (
    <div id="searchContainerMobile">
      <Icon
        name="search"
        color="#2ac7d3"
        size={24}
        className="searchIconMobile"
        onClick={handleInputClick}
      />
      {isDropdownOpen ? (
        <div className="searchDropdownMobile">
          <label className="searchLabel">What</label>
          <input
            id="keywordInput"
            className="customInput"
            placeholder="What are you exploring?"
            type="text"
            autoComplete="off"
            name="keyword"
            value={searchParams.keyword}
            onChange={event => {
              setSearchUrl(event.target.name, event.target.value);
            }}
          />
          <label className="searchLabel">Where</label>
          <div className="searchLocationInputWrapper">
            <input
              className="customInput"
              placeholder="Where you at?"
              name="locationName"
              autoComplete="off"
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
          <label className="searchLabel">Categories</label>
          <div className="categoriesContainer">
            {loading ? (
              <div className="categoriesLoadingSpinner">
                <i className="fas fa-spinner fa-spin spinnerStyle"></i>
              </div>
            ) : (
              Object.keys(collectionsRedux.categories).map((category, index) => {
                return (
                  <label key={index} className="categoryWraper">
                    <input
                      className="categoryInput"
                      type="checkbox"
                      name={category}
                      value={category}
                      checked={!!selectedCategories[category]}
                      onChange={event => setSearchUrl(category, event.target.checked)}
                    />
                    <span className="categoryLabel">{category}</span>
                  </label>
                );
              })
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
        </div>
      ) : null}
    </div>
  );
};

export default NavbarSearchMobileView;
