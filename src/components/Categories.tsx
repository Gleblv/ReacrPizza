import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';

const Categories: React.FC = () => {
  const dispatch = useDispatch();

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const activeCategory = useSelector((state: any) => state.filter.activeCategoryId);

  return (
    <>
      <div className="categories">
        <ul>
          {categories &&
            categories.map((category, i) => (
              <li
                key={i}
                onClick={() => dispatch(setCategoryId(i))}
                className={activeCategory === i ? 'active' : ''}>
                {category}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
