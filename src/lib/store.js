import { configureStore } from "@reduxjs/toolkit";

// import your feature slices here
import cartReducer from "@/features/cart/cartSlice";

// import your rtk query api slice here
import { apiSlice } from "@/services/apiSlice";

// configure the redux store
// add new slices and api reducers inside this object as the app grows
export const store = configureStore({
  reducer: {
    // feature slices
    cart: cartReducer,

    // rtk query api slice — key must match the api reducerPath
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  // add the rtk query middleware to enable caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
