export const getCartPriceFromLS = () => {
  const data = localStorage.getItem('cartPrice');

  return data ? JSON.parse(data) : 0;
};
