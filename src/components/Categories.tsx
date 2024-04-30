/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const activeCategory = useSelector((state: RootState) => state.filter.activeCategoryId);

  const onClickCategory = React.useCallback((i: number) => {
    dispatch(setCategoryId(i));
  }, []);

  return (
    <>
      <div className="categories">
        <ul>
          {categories &&
            categories.map((category: string, i: number) => (
              <li
                key={i}
                onClick={() => onClickCategory(i)}
                className={activeCategory === i ? 'active' : ''}>
                {category}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
});

export default Categories;
