import { Provider } from 'react-redux';
import './App.css';
import AppLayout from './components/layout';
import { store } from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListItem from './components/pages/list_item_page';
import HomePage from './components/pages/home_page';
import ViewProduct from './components/pages/view_product_page';
import CartPage from './components/pages/cart_page';
import OrdersPage from './components/pages/order_list_page';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index path='/' element={<HomePage />} />
            <Route path='/products' element={<ListItem />} />
            <Route path='/products/view' element={<ViewProduct />} />
            <Route path='/products/cart' element={<CartPage />} />
            <Route path='/products/orders' element={<OrdersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
