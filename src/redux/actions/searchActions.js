export function startSearch(searchParams, dispatch) {
  dispatch({
    type: "START_SEARCH",
    searchParams,
  });
}

export function searchCompleted(placesHits, outfitsHits, bundlesHits, dispatch) {
  dispatch({
    type: "SEARCH_COMPLETED",
    placesHits,
    outfitsHits,
    bundlesHits,
  });
}

export function searchNextPageCompleted(hits, collectionName, dispatch) {
  dispatch({
    type: "SEARCH_NEXT_PAGE_COMPLETED",
    hits,
    collectionName,
  });
}

// export function changeSorting(sortingType, dispatch) {
//   dispatch({
//     type: "NEW_SORTING",
//     sortingType,
//   });
// }
