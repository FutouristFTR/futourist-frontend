import React from "react";
import { addReviewClearSuggestions } from "redux/actions";
import store from "redux/store";

const PlacesSuggestions = ({ addReview, setPlace }) => (
  <div
    className={`placesSuggestionsDropdown${
      addReview.isAddReviewModalOpen && addReview.placesSuggestions.length > 0 ? "-visible" : ""
    }`}
  >
    <ul>
      {addReview.placesSuggestions &&
        addReview.placesSuggestions.map((suggestion, index) => {
          if (index < 5) {
            return (
              <li
                key={index}
                onClick={() => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  setPlace("placeId", suggestion.objectID, "placeName", suggestion.name);
                  addReviewClearSuggestions(store.dispatch);
                }}
                className="palceSuggestion"
              >
                {suggestion.name}
                {suggestion.city ? ", " + suggestion.city : null}
              </li>
            );
          }
          return null;
        })}
    </ul>
  </div>
);

export default PlacesSuggestions;
