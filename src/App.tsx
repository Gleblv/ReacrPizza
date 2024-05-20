import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/404';
import MainTemplate from './templates/MainTemplate';

import './scss/app.scss';

const Cart = React.lazy(() => import('./pages/Cart'));
const PizzaDetail = React.lazy(() => import('./pages/PizzaDetail'));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainTemplate />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <React.Suspense fallback={<div>Идёт загрузка корзины</div>}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path="pizzas/:id"
            element={
              <React.Suspense fallback={<div>Идёт загрузка питсы</div>}>
                <PizzaDetail />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
