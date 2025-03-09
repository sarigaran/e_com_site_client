import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AddToCart from '../components/input_component';
import { placeOrder } from '../redux/slice/order_slice';
import { removeFromCart } from '../redux/slice/cart_slice';

function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!cart.length) return;
    dispatch(placeOrder({ cart, totalPrice }));
    cart.forEach((item) => dispatch(removeFromCart(item.id)));

    navigate('/products/orders');
  };

  return (
    <div className='cartContinerWrapper'>
      <div style={{ width: '60%' }}>
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item) => (
            <Card key={item.id} style={{ marginBottom: '10px', padding: '10px' }}>
              <div className='cartwrapper'>
                <img src={item.image} alt={item.title} style={{ height: '80px', width: '80px' }} />
                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <AddToCart item={item} />
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
        <div className='totalItemWrapper'>
          <span>Total Items:</span>
          <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
        </div>

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
