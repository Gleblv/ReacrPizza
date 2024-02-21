import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [pizzasList, setPizzasList] = React.useState([]);
  const [pizzasIsLodaing, setPizzasIsLodaing] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activeSort, setActiveSort] = React.useState({ name: 'популярности', index: 'rating' });

  React.useEffect(() => {
    const categoryType = activeCategory > 0 ? `category=${activeCategory}` : '';
    const filtredSortString = activeSort.index.replace('-', '');
    const filtredType = activeSort.index.includes('-') ? 'asc' : 'desc';

    setPizzasIsLodaing(true);

    fetch(
      `https://65cbe753efec34d9ed8840df.mockapi.io/items?${categoryType}&sortBy=${filtredSortString}&order=${filtredType}`,
    )
      .then((res) => res.json())
      .then((data) => setPizzasList(data))
      .then((_) => setPizzasIsLodaing(false));

    window.scrollTo(0, 0);
  }, [activeCategory, activeSort]);

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories
              activeCategory={activeCategory}
              onClickCategoty={(i) => setActiveCategory(i)}
            />
            <Sort activeSort={activeSort} onClickSort={(obj) => setActiveSort(obj)} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzasIsLodaing
              ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
              : pizzasList && pizzasList.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
