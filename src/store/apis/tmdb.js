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
    getConfiguration: builder.query({
      query: () => 'configuration',
    }),
    getPopularMovieLists: builder.query({
      query: ({ language = 'en-US', page = 1 }) => {
        return `movie/popular?language=${language}&page=${page}`;
      },
    }),
    getMovieDetails: builder.query({
      query: ({ id, language = 'en-US' }) => {
        return `movie/${id}?language=${language}`;
      },
    }),
  }),
});

export const {
  useAuthenticationQuery,
  useGetConfigurationQuery,
  useGetPopularMovieListsQuery,
  useLazyGetPopularMovieListsQuery,
  useLazyGetMovieDetailsQuery,
} = tmdbApi;
