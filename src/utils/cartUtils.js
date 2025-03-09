export const updateCart = (item, newQuantity, setQuantities) => {
  if (!item) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

  if (newQuantity > 0) {
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = newQuantity;
    } else {
      cart.push({ ...item, quantity: newQuantity });
    }
  } else {
    cart = cart.filter((cartItem) => cartItem.id !== item.id);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  if (setQuantities) {
    setQuantities((prev) => ({ ...prev, [item.id]: newQuantity }));
  }
};
