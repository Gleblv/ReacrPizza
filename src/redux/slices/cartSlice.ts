import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { getCartItemsFromLS } from '../../utils/getCartItemsFromLS';
import { getCartPriceFromLS } from '../../utils/getCartPriceFromLS';

export type CartItem = {
  id: string;
  title: string;
  imageUrl: string;
  count: number;
  price: number;
  type: string;
  size: number;
};

interface CartSliceState {
  totalPrice: number;
  cartPizzasList: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: getCartPriceFromLS(),
  cartPizzasList: getCartItemsFromLS(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<CartItem>) => {
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
    substractPizza: (state, action: PayloadAction<string>) => {
      const cartItem = state.cartPizzasList.find(({ id }) => id === action.payload);

      if (cartItem && cartItem.count > 1) {
        cartItem.count--;
      } else {
        state.cartPizzasList = state.cartPizzasList.filter((pizza) => pizza.id !== action.payload);
      }

      state.totalPrice = state.cartPizzasList.reduce(
        (sum, { price, count }) => sum + price * count,
        0,
      );
    },
    deletePizza: (state, action: PayloadAction<string>) => {
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string | number) => (state: RootState) =>
  state.cart.cartPizzasList.find((obj: CartItem) => obj.id === id);

export const { addPizza, deletePizza, clearPizzas, substractPizza } = cartSlice.actions;

export default cartSlice.reducer;
