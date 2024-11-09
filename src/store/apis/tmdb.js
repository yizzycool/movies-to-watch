import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
    prepareHeaders: (headers, _api) => {
      headers.set(
        'Authorization',
        `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN}`,
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    authentication: builder.query({
      query: () => 'authentication',
    }),
    getPopularMovieLists: builder.query({
      query: ({ language = 'en-US', page = 1 }) => {
        return `movie/popular?language=${language}&page=${page}`;
      },
    }),
  }),
});

export const { useAuthenticationQuery, useLazyGetPopularMovieListsQuery } =
  tmdbApi;
