import { useState, useEffect } from 'react';
import { useGetAiRecommendationMutation } from '@/store/apis/gemini';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';

export default function useQueryAiRecommendedWatchlist({
  fetchedData,
  userSelection,
}) {
  const [run, setRun] = useState(false);
  const { selectedGenres, currentMoods } = userSelection;

  // Prepare data for useGetAiRecommendationMutation API
  const watchlist = _map(fetchedData, (data) => ({
    title: _get(data, 'original_title'),
    genres: _map(data.genres, (genre) => _get(genre, 'name')),
  }));

  const [trigger, { data }] = useGetAiRecommendationMutation();
  const { recommendations: aiRecommendations = [] } = data || {};

  // Call api to get ai recommendation data
  useEffect(() => {
    if (!run) return;
    trigger({ watchlist, selectedGenres, currentMoods });
  }, [run]);

  // Reset 'run' to be false after task run successfully
  useEffect(() => {
    if (_isEmpty(aiRecommendations)) return;
    setRun(false);
  }, [aiRecommendations]);

  return {
    run,
    setRun,
    aiRecommendations,
  };
}
