import { apiSlice } from "./apiSlice";

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
  creationAt: string;
  updatedAt: string;
}

// inject category-related endpoints into the shared api slice
export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetch all categories — usage: const { data, isLoading } = useGetCategoriesQuery()
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      // invalidate this cache when a category is added, updated, or deleted
      providesTags: ["Products"], // sharing tag for now or can add "Categories" if needed
    }),
  }),

  // do not override existing endpoints if this file is loaded twice
  overrideExisting: false,
});

// export the auto-generated hooks for use in components
export const {
  useGetCategoriesQuery,
} = categoriesApi;
