import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { appContext } from '../App';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const { activeCategoryId, activeSort, currnetPage } = useSelector((state) => state.filter);

  const [pizzasList, setPizzasList] = React.useState([]);
  const [pizzasIsLodaing, setPizzasIsLodaing] = React.useState(true);
  // const [pageNumber, setPageNumber] = React.useState(1);

  const { searchValue } = React.useContext(appContext);

  React.useEffect(() => {
    const categoryType = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';
    const filtredSortString = activeSort.index.replace('-', '');
    const filtredType = activeSort.index.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    setPizzasIsLodaing(true);

    axios
      .get(
        `https://65cbe753efec34d9ed8840df.mockapi.io/items?page=${currnetPage}&limit=4&${categoryType}&sortBy=${filtredSortString}&order=${filtredType}${search}`,
      )
      .then((res) => res.data)
      .then((data) => {
        setPizzasList(data);
        setPizzasIsLodaing(false);
      })
      .catch((err) => console.log(err));

    window.scrollTo(0, 0);
  }, [activeCategoryId, activeSort, searchValue, currnetPage]);

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
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Home;
