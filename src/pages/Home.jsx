import React from 'react';
import { useSelector } from 'react-redux';

import { appContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const { activeCategory, activeSort } = useSelector((state) => state.filter);

  const [pizzasList, setPizzasList] = React.useState([]);
  const [pizzasIsLodaing, setPizzasIsLodaing] = React.useState(true);
  const [pageNumber, setPageNumber] = React.useState(1);

  const { searchValue } = React.useContext(appContext);

  React.useEffect(() => {
    const categoryType = activeCategory > 0 ? `category=${activeCategory}` : '';
    const filtredSortString = activeSort.index.replace('-', '');
    const filtredType = activeSort.index.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    setPizzasIsLodaing(true);

    fetch(
      `https://65cbe753efec34d9ed8840df.mockapi.io/items?page=${pageNumber}&limit=4&${categoryType}&sortBy=${filtredSortString}&order=${filtredType}${search}`,
    )
      .then((res) => res.json())
      .then((data) => {
        return typeof data == 'object' && setPizzasList(data);
      })
      .then((_) => setPizzasIsLodaing(false));

    window.scrollTo(0, 0);
  }, [activeCategory, activeSort, searchValue, pageNumber]);

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzasIsLodaing
              ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
              : pizzasList && pizzasList.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
          </div>
          <Pagination setPageNumber={(number) => setPageNumber(number)} />
        </div>
      </div>
    </>
  );
};

export default Home;
