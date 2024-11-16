import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const geminiApi = createApi({
  reducerPath: 'geminiApi',
  baseQuery: fetchBaseQuery({
    // Next.js api route
    baseUrl: '/api/ai-recommendation/',
  }),
  keepUnusedDataFor: 60,
  endpoints: (builder) => ({
    getAiRecommendation: builder.mutation({
      query: ({ watchlist, selectedGenres, currentMoods }) => ({
        url: '',
        method: 'POST',
        body: { watchlist, selectedGenres, currentMoods },
      }),
    }),
  }),
});

export const { useGetAiRecommendationMutation } = geminiApi;
