import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART
} from "../actions/cartActions";
const { uuid: uuid } = require('uuid');

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;

  if (action.type === ADD_TO_CART) {
  
      const cartItem = cartItems.filter(item => item.id === product.id)[0];
      if (cartItem === undefined) {
        return [
          ...cartItems,
          {
            ...product,
            peopleCount: product.peopleCount ? product.peopleCount : 1,
            cartItemId: uuid()
          }
        ];
      } else {
        return cartItems.map(item =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                peopleCount: product.peopleCount
                  ? item.peopleCount + product.peopleCount
                  : item.peopleCount + 1
              }
            : item
        );
      }
    
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.peopleCount === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          cartItem => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map(item =>
        item.cartItemId === product.cartItemId
          ? { ...item, peopleCount: item.peopleCount - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter(cartItem => cartItem.cartItemId !== product.cartItemId);
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter(item => {
      return false;
    });
  }

  return state;
};

export default cartReducer;
