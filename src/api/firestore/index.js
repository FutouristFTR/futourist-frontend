import collections from "constants/collections";
import get from "api/firestore/core/get";

/**
 * Retrieve single place document with it's extras
 *
 * @param   {string}    placeId  Place ID
 * @return  {promise}   Promise containing a single place document with it's extras
 */
function getPlace(placeId) {
  const placePromise = get.document(collections.PLACES, placeId);
  const placeExtrasPromise = get.document(collections.PLACES_EXTRAS, placeId);

  return Promise.all([placePromise, placeExtrasPromise]).then(results => {
    return { ...results[0], ...results[1] };
  });
}

function getOutfit(outfitId) {
  const outfitPromise = get.document(collections.OUTFITS, outfitId);

  return outfitPromise;
}

function getBundle(bundleId) {
  const bundlePromise = get.document(collections.BUNDLES, bundleId);

  return bundlePromise;
}

/**
 * Retrieve single user document with it's extras
 *
 * @param   {string}    userID  User ID
 * @return  {promise}   Promise containing a single user document with it's extras
 * */
function getUser(userId) {
  const userPromise = get.document(collections.USERS, userId);
  // const userExtrasPromise = get.document(collections.USERS_EXTRAS, userId);

  // return Promise.all([userPromise, userExtrasPromise]);
  return userPromise;
}

/**
 * Retrieve categories
 *
 * @return {promise} All categories
 */
function getCategories() {
  const categoriesQuery = { field: "isEnabled", operator: "==", value: true };
  const categoriesPromise = get.retrieveCollection(collections.CATEGORIES, categoriesQuery);
  return categoriesPromise;
}

/**
 * Retrieve queried reviews for specified place
 *
 * @param   {string}  placeId  Place ID
 * @return  {promise}  Single place document with it's extras
 */
function getReviewsByPlaceId(placeId, startAfter, limit) {
  const reviewQuery = [
    { field: "placeId", operator: "==", value: placeId },
    { field: "status", operator: "==", value: 100 },
  ];
  const orderBy = { field: "created", direction: "desc" };
  const reviewsPromise = get.retrieveCollection(
    collections.REVIEWS,
    reviewQuery,
    orderBy,
    startAfter,
    limit
  );
  return reviewsPromise;
}

/**
 * Retrieve reviews for a single user
 *
 * @param {string} userId   User ID
 * @return {promise}        All reviews for a single user
 */
function getReviewsByUserId(userId, startAfter, limit) {
  const reviewQuery = [
    { field: "userId", operator: "==", value: userId },
    { field: "status", operator: "==", value: 100 },
  ];
  const orderBy = { field: "created", direction: "desc" };
  const reviewsPromise = get.retrieveCollection(
    collections.REVIEWS,
    reviewQuery,
    orderBy,
    startAfter,
    limit
  );
  return reviewsPromise;
}

/**
 * Retrieve latest reviews
 *
 * @return {promise}
 */
function getLatestReviews(startAfter, limit) {
  const reviewQuery = [{ field: "status", operator: "==", value: 100 }];
  const orderBy = { field: "created", direction: "desc" };
  const reviewsPromise = get.retrieveCollection(
    collections.REVIEWS,
    reviewQuery,
    orderBy,
    startAfter,
    limit
  );
  return reviewsPromise;
}

export {
  getPlace,
  getOutfit,
  getBundle,
  getUser,
  getReviewsByPlaceId,
  getCategories,
  getReviewsByUserId,
  getLatestReviews,
};
