import React, { useEffect, useState } from 'react';
import { Button, Card, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  useEffect(() => {
    if (Array.isArray(storedCart)) {
      setCart(storedCart);
    } else {
      setCart([]);
    }
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    let updatedCart;

    if (newQuantity < 1) {
      updatedCart = cart.filter((item) => item.id !== id);
    } else {
      updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!cart.length) return;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cart,
      total: totalPrice,
    };

    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/products/orders');
  };

  return (
    <div className='cartContinerWrapper'>
      <Button onClick={() => navigate('/')}>Back</Button>
      <div style={{ width: '60%' }}>
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item) => (
            <Card key={item.id} style={{ marginBottom: '10px', padding: '10px' }}>
              <div className='cartwrapper'>
                <img src={item.image} alt={item.title} style={{ height: '80px', width: '80px' }} />
                <div style={{ flex: 1 }}>
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                  <div className='cartwrapper'>
                    <Button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</Button>
                    <Input
                      type='number'
                      style={{ width: '60px', textAlign: 'center' }}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                    />
                    <Button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className='ordercontiner'>
        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className='orderWrapper'>
            <span style={{width:"60%"}}>{item.title}</span>
            <span>
              <strong>
                {item.quantity} x {item.price} : ${(item.quantity * item.price).toFixed(2)}
              </strong>
            </span>
          </div>
        ))}
        <hr />
        <div className='totalItemWrapper'>
          <span>Total Items:</span>
          <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>

        <div className='totalPriceWrapper'>
          <span>Total Price:</span>
          <span>${cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}</span>
        </div>

        <Button
          type='primary'
          onClick={handlePlaceOrder}
          disabled={cart.length === 0}
          style={{ marginTop: '20px', width: '100%' }}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}

export default CartPage;
