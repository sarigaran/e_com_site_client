import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../redux/slice/order_slice';

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cartSlice.cart);

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!cart.length) return;
    dispatch(placeOrder({ cart, totalPrice }));
    navigate('/products/orders');
  };

  return (
    <div className='cartContinerWrapper'>
      <div style={{ width: '60%' }}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item) => (
            <Card key={item.id} style={{ marginBottom: '10px', padding: '10px' }}>
              <div className='cartwrapper'>
                <img src={item.image} alt={item.name} style={{ height: '80px', width: '80px' }} />
                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
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
            <span style={{ width: '60%' }}>{item.name}</span>
            <span>
              <strong>
                {item.quantity} x {item.price} : ${(item.quantity * item.price).toFixed(2)}
              </strong>
            </span>
          </div>
        ))}
        <hr />
        <div className='totalPriceWrapper'>
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
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
