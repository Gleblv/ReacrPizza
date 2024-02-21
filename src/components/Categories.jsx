import React from 'react';

const Categories = ({ activeCategory, onClickCategoty }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <>
      <div className="categories">
        <ul>
          {categories &&
            categories.map((category, i) => (
              <li
                key={i}
                onClick={() => onClickCategoty(i)}
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
