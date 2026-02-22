import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// this is the single shared api slice for the whole app
// all feature api files (e.g. productsApi.ts) will inject their endpoints here
// so we keep one cache and one middleware in the store

export const apiSlice = createApi({
  // this key is used as the reducer key in the store — do not change it
  reducerPath: "api",

  // set your real backend base url here
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1",
  }),

  // tag types are used for cache invalidation across endpoints
  // add new tags here when you add new feature apis
  tagTypes: ["Products", "Orders", "Users"],

  // endpoints are injected from feature files — do not add endpoints here directly
  endpoints: () => ({}),
});
