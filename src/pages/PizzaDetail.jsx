import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PizzaDetail = () => {
  const { id } = useParams();

  const [pizzaData, setPizzaData] = React.useState();

  React.useEffect(() => {
    axios
      .get(`https://65cbe753efec34d9ed8840df.mockapi.io/items/${id}`)
      .then((res) => setPizzaData(res.data))
      .catch((err) => {
        alert('Ошибка при получении питсы');
        console.log(err);
      });
  }, []);

  if (!pizzaData) {
    return '...Загрузка...';
  }

  return (
    <div className="container">
      <div className="img">
        <img src={pizzaData.imageUrl} alt="" />
      </div>
      <h2 className="title">{pizzaData.title}</h2>
      <h4 className="price">{pizzaData.price} ₽</h4>
    </div>
  );
};

export default PizzaDetail;
