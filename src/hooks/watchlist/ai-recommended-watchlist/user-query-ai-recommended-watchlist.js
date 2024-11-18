import { useState, useEffect } from 'react';
import { useGetAiRecommendationMutation } from '@/store/apis/gemini';
import _get from 'lodash/get';
import _map from 'lodash/map';

export default function useQueryAiRecommendedWatchlist({
  fetchedData,
  userSelection,
}) {
  const [run, setRun] = useState(false);
  const [aiRecommendationParams, setAiRecommendationParams] = useState({
    genres: [],
    moods: [],
  });
  const { selectedGenres, currentMoods } = userSelection;

  // Prepare data for useGetAiRecommendationMutation API
  const watchlist = _map(fetchedData, (data) => ({
    title: _get(data, 'original_title'),
    genres: _map(data.genres, (genre) => _get(genre, 'name')),
  }));

  const [trigger, { data, isError }] = useGetAiRecommendationMutation();
  const { recommendations: aiRecommendations = [] } = data || {};

  // Call api to get ai recommendation data
  useEffect(() => {
    if (!run) return;
    setAiRecommendationParams({ genres: selectedGenres, moods: currentMoods });
    trigger({ watchlist, selectedGenres, currentMoods });
  }, [run]);

  return {
    run,
    setRun,
    aiRecommendations,
    aiRecommendationParams,
    isError,
  };
}
