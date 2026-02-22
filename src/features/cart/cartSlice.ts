import { createSlice } from "@reduxjs/toolkit";

// initial state for the cart
const initialState = {
  items: [], // list of { id, name, price, quantity, image }
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // add a product to the cart, or increase quantity if it already exists
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        // increase quantity if item is already in the cart
        existing.quantity += 1;
      } else {
        // add new item with quantity 1
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;
    },

    // decrease quantity by 1, remove the item if quantity reaches 0
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (!existing) return;

      state.totalQuantity -= 1;
      state.totalPrice -= existing.price;

      if (existing.quantity === 1) {
        // remove the item completely
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existing.quantity -= 1;
      }
    },

    // delete an item from the cart entirely regardless of quantity
    deleteFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (!existing) return;

      state.totalQuantity -= existing.quantity;
      state.totalPrice -= existing.price * existing.quantity;
      state.items = state.items.filter((item) => item.id !== id);
    },

    // wipe the entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// export individual actions for dispatch
export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;

// selectors — use these in components via useAppSelector
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
