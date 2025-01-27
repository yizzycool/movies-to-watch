import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import _isEmpty from 'lodash/isEmpty';
import _join from 'lodash/join';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    // Proxy api route
    baseUrl: '/api/tmdb/',
  }),
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    authentication: builder.query({
      query: () => 'authentication',
    }),
    getConfiguration: builder.query({
      query: () => 'configuration',
    }),
    getGenreLists: builder.query({
      query: () => 'genre/movie/list',
    }),
    getNowPlayingMovieLists: builder.query({
      query: ({ language = 'en-US', page = 1 }) => {
        return `/movie/now_playing?language=${language}&page=${page}`;
      },
    }),
    getPopularMovieLists: builder.query({
      query: ({ language = 'en-US', page = 1 }) => {
        return `movie/popular?language=${language}&page=${page}`;
      },
    }),
    getTopRatedMovieLists: builder.query({
      query: ({ language = 'en-US', page = 1 }) => {
        return `movie/top_rated?language=${language}&page=${page}`;
      },
    }),
    getUpcomingMovieLists: builder.query({
      query: ({ language = 'en-US', page = 1 }) => {
        return `movie/upcoming?language=${language}&page=${page}`;
      },
    }),
    getMovieDetails: builder.query({
      query: ({ id, language = 'en-US', appendToResponse = [] }) => {
        let path = `movie/${id}?language=${language}`;
        if (!_isEmpty(appendToResponse)) {
          path += `&append_to_response=${_join(appendToResponse, ',')}`;
        }
        return path;
      },
    }),
    getMovieCredits: builder.query({
      query: ({ id, language = 'en-US' }) => {
        return `movie/${id}/credits?language=${language}`;
      },
    }),
    getMovieVideos: builder.query({
      query: ({ id, language = 'en-US' }) => {
        return `movie/${id}/videos?language=${language}`;
      },
    }),
    searchMovies: builder.query({
      query: ({
        query,
        page = 1,
        includeAdult = false,
        language = 'en-US',
      }) => {
        return `search/movie?query=${query}&page=${page}&include_adult=${includeAdult}&language=${language}`;
      },
    }),
  }),
});

export const {
  useAuthenticationQuery,
  useGetConfigurationQuery,
  useGetGenreListsQuery,
  useGetNowPlayingMovieListsQuery,
  useLazyGetNowPlayingMovieListsQuery,
  useGetPopularMovieListsQuery,
  useLazyGetPopularMovieListsQuery,
  useGetTopRatedMovieListsQuery,
  useLazyGetTopRatedMovieListsQuery,
  useGetUpcomingMovieListsQuery,
  useLazyGetUpcomingMovieListsQuery,
  useGetMovieDetailsQuery,
  useLazyGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetMovieVideosQuery,
  useLazySearchMoviesQuery,
} = tmdbApi;
