import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';

function App() {
  const [pizzasList, setPizzasList] = React.useState([]);

  React.useEffect(() => {
    fetch('https://65cbe753efec34d9ed8840df.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => setPizzasList(data));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzasList && pizzasList.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
