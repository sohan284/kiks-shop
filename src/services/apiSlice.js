import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// this is the single shared api slice for the whole app
// all feature api files (e.g. productsApi.js) will inject their endpoints here
// so we keep one cache and one middleware in the store

export const apiSlice = createApi({
  // this key is used as the reducer key in the store — do not change it
  reducerPath: "api",

  // set your real backend base url here (or use an env variable)
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  }),

  // tag types are used for cache invalidation across endpoints
  // add new tags here when you add new feature apis
  tagTypes: ["Products", "Orders", "Users"],

  // endpoints are injected from feature files — do not add endpoints here directly
  endpoints: () => ({}),
});
