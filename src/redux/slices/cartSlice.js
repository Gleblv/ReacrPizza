import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  cartPizzasList: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addPizza: (state, action) => {
    //   state.cartPizzasList.push(action.payload);

    //   state.totalPrice = state.cartPizzasList.reduce((sum, { price }) => sum + price, 0);
    // },
    addPizza: (state, action) => {
      const isItemFinded = state.cartPizzasList.find(({ id }) => id === action.payload.id);

      if (isItemFinded) {
        isItemFinded.count++;
      } else {
        state.cartPizzasList.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.cartPizzasList.reduce(
        (sum, { price, count }) => sum + price * count,
        0,
      );
    },
    substractPizza: (state, action) => {
      const cartItem = state.cartPizzasList.find(({ id }) => id === action.payload);

      if (cartItem.count > 1) {
        cartItem.count--;
      } else {
        state.cartPizzasList = state.cartPizzasList.filter((pizza) => pizza.id !== action.payload);
      }

      state.totalPrice = state.cartPizzasList.reduce(
        (sum, { price, count }) => sum + price * count,
        0,
      );
    },
    deletePizza: (state, action) => {
      state.cartPizzasList = state.cartPizzasList.filter((pizza) => pizza.id !== action.payload);

      state.totalPrice = state.cartPizzasList.reduce(
        (sum, { price, count }) => sum + price * count,
        0,
      );
    },
    clearPizzas: (state) => {
      state.cartPizzasList = [];
      state.totalPrice = 0;
    },
  },
});

export const { addPizza, deletePizza, clearPizzas, substractPizza } = cartSlice.actions;

export default cartSlice.reducer;
