import { combineReducers } from "redux";
import authReducer from "./authReducer";
import pageReducer from "./pageReducer";
import collectionReducer from "./collectionReducer";
import addReviewReducer from "./addReviewReducer";
import searchReducer from "./searchReducer";
import watchReviewReducer from "./watchReviewReducer";

const rootReducer = combineReducers({
  addReview: addReviewReducer,
  auth: authReducer,
  page: pageReducer,
  collections: collectionReducer,
  search: searchReducer,
  watchReview: watchReviewReducer,
});

export default rootReducer;
