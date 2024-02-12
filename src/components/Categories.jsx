import React from 'react';

const Categories = () => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <>
      <div className="categories">
        <ul>
          {categories &&
            categories.map((category, i) => (
              <li
                key={i}
                onClick={() => setActiveCategory(i)}
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
