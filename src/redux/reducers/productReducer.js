
const initState = {
  products: [],
  fetching: false,
  fetched: false,
  error: null,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS": {
      return {...state, fetching: true}
    }
    case "FETCH_PRODUCTS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_PRODUCTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        products: action.payload,
      }
    }
    case "ADD_TWEET": {
      return {
        ...state,
        products: [...state.tweets, action.payload],
      }
    }
  
   default : return state;
  }
  
};

export default productReducer;
