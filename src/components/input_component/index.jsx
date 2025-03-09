import { Button, InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../../redux/slice/cart_slice';

function AddToCart({ item }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cartSlice.cart.find((cartItem) => cartItem.id === item.id));

  const [count, setCount] = useState(cartItem?.quantity || 0);

  useEffect(() => {
    if (cartItem) {
      setCount(cartItem.quantity);
    } else {
      setCount(0);
    }
  }, [cartItem]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setCount(newQuantity);
      if (cartItem) {
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
      } else {
        dispatch(
          addToCart({
            id: item.id,
            name: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
            quantity: newQuantity,
          })
        );
      }
    } else {
      setCount(0);
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <div>
      <Button onClick={() => handleQuantityChange(count + 1)}>+</Button>
      <InputNumber min={0} value={count} onChange={handleQuantityChange} />
      <Button onClick={() => handleQuantityChange(count - 1)}>-</Button>
    </div>
  );
}

export default AddToCart;
