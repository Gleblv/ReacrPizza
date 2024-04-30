/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useAppDispatch } from '../redux/store';

import { SortListItem, list } from '../components/Sort';
import { selectFilter, setFiltersParams } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/index';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { activeCategoryId, activeSort, currnetPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzas);

  const isSearched = useRef(false);
  const isFirstRender = useRef(true);

  const fetchData = async () => {
    const categoryType = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';
    const filtredSortString = activeSort.index.replace('-', '');
    const filtredType = activeSort.index.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    // setPizzasIsLodaing(true);

    dispatch(
      fetchPizzas({
        categoryType,
        filtredSortString,
        filtredType,
        search,
        currnetPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  // Если был первый рендер то проверяем параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFiltersParams({
          searchValue: params.search as string,
          activeCategoryId: Number(params.categoryType),
          currnetPage: Number(params.currnetPage),
          activeSort: list.find((obj) => obj.index === params.filtredType) as SortListItem,
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

  const onClickCartBtn = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = e.target as HTMLAnchorElement;

    if (target.classList.contains('button')) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {status === 'error' ? (
            <div className="content__error">
              <h2>
                Произошла ошибка <span>😕</span>
              </h2>
              <p>К сожалению не удалось получить питсы. Попробуйте повторить попытку позже.</p>
            </div>
          ) : (
            <div className="content__items">
              {status === 'loading'
                ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
                : items &&
                  items.map((obj: any, i: any) => (
                    <Link onClick={(e) => onClickCartBtn(e)} key={i} to={`/pizzas/${obj.id}`}>
                      <PizzaBlock {...obj} />
                    </Link>
                  ))}
            </div>
          )}
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Home;
