// cartReducer.js

import ACTION_TYPES from '../../constants/actions';

// Helper function to generate a unique ID (you can use any method you prefer)
const generateUniqueId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Initial state
const initialState = {
  cartId: generateUniqueId(), // Generate a unique cart ID initially
  items: [], // Array to hold items in the cart
};

// Action types

// Action creators
export const addToCart = item => ({
  type: ACTION_TYPES.CART.ADD_TO_CART,
  payload: item,
});

export const removeFromCart = itemId => ({
  type: ACTION_TYPES.CART.REMOVE_FROM_CART,
  payload: itemId,
});

export const resetCart = () => ({
  type: ACTION_TYPES.CART.RESET_CART,
});

// Reducer function
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CART.ADD_TO_CART:
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        // If the item is already in the cart, update the quantity
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? {...item, quantity: action.payload.quantity}
            : item,
        );

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        return {
          ...state,
          items: [...state.items, {...action.payload, quantity: 1}],
        };
      }

    case ACTION_TYPES.CART.REMOVE_FROM_CART:
      const existingCartItem = state.items.find(
        item => item.id === action.payload,
      );

      if (existingCartItem && existingCartItem.quantity > 1) {
        // If the item is in the cart and has a quantity greater than 1, update the quantity
        const updatedItems = state.items.map(item =>
          item.id === action.payload
            ? {...item, quantity: item.quantity - 1}
            : item,
        );

        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // If the item is in the cart and has a quantity of 1, remove it
        const updatedItems = state.items.filter(
          item => item.id !== action.payload,
        );

        return {
          ...state,
          items: updatedItems,
        };
      }

    case ACTION_TYPES.CART.RESET_CART:
      // Reset the cart, generate a new cart ID
      return {
        cartId: generateUniqueId(),
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
