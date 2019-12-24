const initialState = {
  results: {
    outfits: [],
    places: [],
    bundles: [],
  },
  params: {
    keyword: null,
    categories: [],
    lat: null,
    lng: null,
    myLat: null,
    myLng: null,
    locationName: null,
    sorting: null,
  },
  searchDone: false,
  pagesLoaded: {
    outfits: {
      pages: 0,
      allLoaded: false,
    },
    places: {
      pages: 0,
      allLoaded: false,
    },
    bundles: {
      pages: 0,
      allLoaded: false,
    },
  },
};

export default function searchReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }
  var newState = Object.assign({}, state);

  switch (action.type) {
    case "START_SEARCH": {
      newState.params = Object.assign({}, action.searchParams);
      newState.params.keyword = action.searchParams.keyword;
      newState.params.categories = action.searchParams.categories;
      newState.params.lat = action.searchParams.lat;
      newState.params.lng = action.searchParams.lng;
      newState.params.myLat = action.searchParams.myLat;
      newState.params.myLng = action.searchParams.myLng;
      newState.params.radius = action.searchParams.radius;
      newState.params.locationName = action.searchParams.locationName;
      newState.params.sorting = action.searchParams.sorting;
      newState.searchDone = false;
      break;
    }

    // case "NEW_SORTING": {
    //   newState.params = Object.assign({}, state.params);
    //   newState.params.sorting = action.sortingType;
    //   newState.searchDone = false;
    //   break;
    // }

    case "SEARCH_COMPLETED": {
      newState.results = Object.assign({}, state.results);
      newState.results.places = action.placesHits || [];
      newState.results.outfits = action.outfitsHits || [];
      newState.results.bundles = action.bundlesHits || [];
      newState.pagesLoaded = {
        places: {
          pages: 1,
          allLoaded: !Math.floor(action.placesHits.length / 51),
        },
        outfits: {
          pages: 1,
          allLoaded: !Math.floor(action.outfitsHits.length / 51),
        },
        bundles: {
          pages: 1,
          allLoaded: !Math.floor(action.bundlesHits.length / 51),
        },
      };
      newState.searchDone = true;
      break;
    }

    case "SEARCH_NEXT_PAGE_COMPLETED": {
      newState.results = Object.assign({}, state.results);
      newState.results[action.collectionName] = [
        ...state.results[action.collectionName],
        ...action.hits,
      ];
      newState.pagesLoaded[action.collectionName].pages =
        state.pagesLoaded[action.collectionName].pages + 1;

      newState.pagesLoaded[action.collectionName].allLoaded = !Math.floor(action.hits.length / 51);

      newState.searchDone = true;
      break;
    }

    default:
      break;
  }
  return newState;
}
