import { getReviewsByPlaceId, getReviewsByUserId, getLatestReviews } from "api/firestore";

import store from "redux/store";
import { addDocumentsToReviewsCollection } from "redux/actions";

function pullReviewsForPlace(placeId, startAfter, limit) {
  return getReviewsByPlaceId(placeId, startAfter, limit).then(placeReviews => {
    let allReviews = {};

    if (placeReviews)
      placeReviews.forEach(review => {
        let reviewData = review.data();
        if (reviewData.created && reviewData.created.toDate)
          reviewData.created = reviewData.created.toDate();
        allReviews = { ...allReviews, [review.id]: reviewData };
      });
    addDocumentsToReviewsCollection(allReviews, placeId, "byPlace", store.dispatch);
    return allReviews;
  });
}

function pullReviewsForUser(userId, startAfter, limit) {
  return getReviewsByUserId(userId, startAfter, limit).then(userReviews => {
    let allReviews = {};

    if (userReviews)
      userReviews.forEach(review => {
        let reviewData = review.data();
        if (reviewData.created && reviewData.created.toDate)
          reviewData.created = reviewData.created.toDate();
        allReviews = { ...allReviews, [review.id]: reviewData };
      });
    addDocumentsToReviewsCollection(allReviews, userId, "byUser", store.dispatch);
    return allReviews;
  });
}

function pullLatestReviews(startAfter, limit) {
  return getLatestReviews(startAfter, limit).then(latestReviews => {
    let allReviews = {};

    if (latestReviews)
      latestReviews.forEach(review => {
        let reviewData = review.data();
        if (reviewData.created && reviewData.created.toDate)
          reviewData.created = reviewData.created.toDate();
        allReviews = { ...allReviews, [review.id]: reviewData };
      });
    addDocumentsToReviewsCollection(allReviews, "", "latestReviews", store.dispatch);
    return allReviews;
  });
}

export { pullReviewsForPlace, pullReviewsForUser, pullLatestReviews };
