// useCart.js

import {
  addToCart,
  removeFromCart,
  resetCart,
  calculateTotal,
} from '../redux/reducers/cart';
import {useDispatch, useSelector} from 'react-redux';

const useCart = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.cartReducer);

  const addItemToCart = item => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = itemId => {
    dispatch(removeFromCart(itemId));
  };

  const resetCartItems = () => {
    dispatch(resetCart());
  };

  const getTotalPrice = () => {
    var price = 0;
    items.forEach(el => {
      price += el.selling_price * el.quantity;
    });
    return price;
  };

  const isCartEmpty = () => items.length === 0;

  const calculateTax = () => {
    // Assuming tax is 18% of the total price
    const tax = 0;
    return tax.toFixed(0);
  };

  const calculateDeliveryCharges = () => {
    // Assuming delivery charges are 149 if the cart value is less than 5000, else 0
    return getTotalPrice() < 5000 ? 149 : 0;
  };

  const totalCartValue = () => {
    const totalValue =
      getTotalPrice() +
      parseFloat(calculateTax()) +
      parseFloat(calculateDeliveryCharges());
    return totalValue.toFixed(2); // You can adjust the number of decimal places as needed
  };

  const getQuantityInCart = itemId => {
    const itemInCart = items.find(item => item.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  return {
    items,
    addItemToCart,
    removeItemFromCart,
    resetCartItems,
    getTotalPrice,
    isCartEmpty,
    calculateTax,
    calculateDeliveryCharges,
    totalCartValue,
    getQuantityInCart,
  };
};

export default useCart;
