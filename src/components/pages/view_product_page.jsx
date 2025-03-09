// import { Button, Input } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSingleProduct } from '../../redux/slice';
// import { useNavigate } from 'react-router-dom';

// function ViewProduct() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { singleproductdata } = useSelector((state) => state.productSlice);
//   const [quantity, setQuantity] = useState(0);

//   const storedProductId = localStorage.getItem('selectedProductId');
//   useEffect(() => {
//     if (storedProductId) {
//       dispatch(getSingleProduct(storedProductId));
//     }
//   }, [dispatch]);

//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   useEffect(() => {
//     if (singleproductdata) {
//       const existingItem = cart.find((item) => item.id === singleproductdata.id);

//       if (existingItem) {
//         setQuantity(existingItem.quantity);
//       } else {
//         setQuantity(0);
//       }
//     }
//   }, [singleproductdata]);

//   useEffect(() => {
//     if (singleproductdata) {
//       updateCart(singleproductdata.id, quantity);
//     }
//   }, [quantity, singleproductdata]);

//   const updateCart = (id, newQuantity) => {
//     if (!singleproductdata) return;

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const existingItemIndex = cart.findIndex((item) => item.id === id);

//     if (newQuantity > 0) {
//       if (existingItemIndex !== -1) {
//         cart[existingItemIndex].quantity = newQuantity;
//       } else {
//         cart.push({ ...singleproductdata, quantity: newQuantity });
//       }
//     } else {
//       cart = cart.filter((item) => item.id !== id);
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//   };

//   if (!singleproductdata) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <div style={{ display: 'flex', gap: '20px' }}>
//       <Button onClick={() => navigate('/products')}>Back</Button>

//       <div className='imageWrapper'>
//         <img src={singleproductdata.image} alt='image' style={{ height: '200px', width: '200px' }} />
//       </div>

//       <div className='imageWrapper'>
//         <div>
//           <h1>{singleproductdata.title}</h1>
//           <p>{singleproductdata.description}</p>
//           <p>
//             <b>Price: $ {singleproductdata.price}</b>
//           </p>

//           <div className='inputContainer' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <Button onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</Button>
//             <Input
//               type='number'
//               style={{ width: '100px', textAlign: 'center' }}
//               value={quantity}
//               onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
//             />
//             <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewProduct;

import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../../redux/slice';
import { useNavigate } from 'react-router-dom';
import { updateCart } from '../../utils/cartUtils'; // Import updateCart function

function ViewProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleproductdata } = useSelector((state) => state.productSlice);
  const [quantity, setQuantity] = useState(0);

  const storedProductId = localStorage.getItem('selectedProductId');
  useEffect(() => {
    if (storedProductId) {
      dispatch(getSingleProduct(storedProductId));
    }
  }, [dispatch]);

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  useEffect(() => {
    if (singleproductdata) {
      const existingItem = cart.find((item) => item.id === singleproductdata.id);

      setQuantity(existingItem ? existingItem.quantity : 0);
    }
  }, [singleproductdata]);

  useEffect(() => {
    if (singleproductdata) {
      updateCart(singleproductdata, quantity);
    }
  }, [quantity, singleproductdata]);

  if (!singleproductdata) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Button onClick={() => navigate('/products')}>Back</Button>

      <div className='imageWrapper'>
        <img src={singleproductdata.image} alt='image' style={{ height: '200px', width: '200px' }} />
      </div>

      <div className='imageWrapper'>
        <div>
          <h1>{singleproductdata.title}</h1>
          <p>{singleproductdata.description}</p>
          <p>
            <b>Price: $ {singleproductdata.price}</b>
          </p>

          <div className='inputContainer' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button onClick={() => setQuantity(Math.max(0, quantity - 1))}>-</Button>
            <Input
              type='number'
              style={{ width: '100px', textAlign: 'center' }}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
            />
            <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
