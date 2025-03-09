import React, { useEffect, useState } from 'react';
import { Card } from 'antd';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id} style={{ marginBottom: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Order ID: {order.id}</h3>
              <p>
                <strong>Total Price:</strong> ${order.total.toFixed(2)}
              </p>
            </div>
            <h4>Items:</h4>
            {order.items.map((item) => (
              <div
                key={item.id}
                className='cartwrapper'
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ height: '50px', width: '50px', borderRadius: '5px' }}
                  />
                  <p>{item.title}</p>
                </div>
                <p>
                  <strong>{item.quantity}</strong> &nbsp;<strong>X</strong>&nbsp;
                  <strong>{item.price}</strong>&nbsp; <strong>=</strong>&nbsp;
                  <strong>$&nbsp;{(item.quantity * item.price).toFixed(2)}</strong>
                </p>
              </div>
            ))}
          </Card>
        ))
      )}
    </div>
  );
}

export default OrdersPage;
