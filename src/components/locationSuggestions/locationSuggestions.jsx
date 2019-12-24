import React from "react";

const LocationSuggestions = ({
  locationInputFocused,
  locationQuery,
  suggestions,
  setSearchUrl,
}) => (
  <div
    className={`suggestionsDropdown${
      locationInputFocused &&
      locationQuery &&
      locationQuery.length > 2 &&
      suggestions &&
      suggestions.length > 0
        ? "-visible"
        : ""
    }`}
  >
    {suggestions &&
      suggestions.map((suggestion, index) =>
        suggestion && suggestion.matchLevel === "city" ? (
          <div
            className="singleSuggestion"
            key={index}
            onMouseDown={() => {
              setSearchUrl(
                "locationName",
                `${suggestion.address.city}, ${suggestion.address.country}`
              );
            }}
          >
            {`${suggestion.address.city}, ${suggestion.address.country}`}
          </div>
        ) : null
      )}
  </div>
);

export default LocationSuggestions;
