import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { appContext } from '../App';
import { list } from '../components/Sort';
import { setFiltersParams } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeCategoryId, activeSort, currnetPage } = useSelector((state) => state.filter);

  const [pizzasList, setPizzasList] = React.useState([]);
  const [pizzasIsLodaing, setPizzasIsLodaing] = React.useState(true);

  const isSearched = useRef(false);
  const isFirstRender = useRef(true);

  const { searchValue } = React.useContext(appContext);

  const fetchData = () => {
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
  };

  // Если был первый рендер то проверяем параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFiltersParams({
          activeCategoryId: params.activeCategoryId,
          currnetPage: params.currnetPage,
          activeSort: list.find((obj) => obj.index === params.filtredType),
        }),
      );

      isSearched.current = true;
    }
  }, []);

  // Если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearched.current) {
      fetchData();
    }

    isSearched.current = false;
  }, [activeCategoryId, activeSort, searchValue, currnetPage]);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (!isFirstRender.current) {
      const query = qs.stringify({
        activeCategoryId,
        filtredType: activeSort.index,
        currnetPage,
      });

      navigate(`?${query}`);
    }

    isFirstRender.current = false;
  }, [activeCategoryId, activeSort, currnetPage]);

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
