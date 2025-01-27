import styles from './index.module.scss';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/compat/router';
import useQueryAiRecommendedWatchlist from '@/hooks/watchlist/ai-recommended-watchlist/user-query-ai-recommended-watchlist';
import { useLazySearchMoviesQuery } from '@/store/apis/tmdb';
import { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbMovieCard from '@/components/common/tmdb-movie-card';
import LoadingSkeletonForMovieCard from './loading-skeleton/movie-card';
import SomethingWentWrong from './something-went-wrong';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _size from 'lodash/size';
import _range from 'lodash/range';
import _indexOf from 'lodash/indexOf';
import _map from 'lodash/map';
import _capitalize from 'lodash/capitalize';
import _toPairs from 'lodash/toPairs';
import _filter from 'lodash/filter';

export default forwardRef(function AiRecommendedWatchlist(
  { fetchedData, userSelection },
  ref,
) {
  const router = useRouter();

  // Hook to get ai recommendation movie lists
  const { run, setRun, aiRecommendations, aiRecommendationParams, isError } =
    useQueryAiRecommendedWatchlist({
      fetchedData,
      userSelection,
    });

  const [recommendationData, setRecommendationData] = useState([]);
  const [searchTrigger, result] = useLazySearchMoviesQuery();
  const { data, originalArgs } = result;

  const skeletonSize = useMemo(() => {
    if (run && !isError && _isEmpty(aiRecommendations)) return 10;
    return _size(aiRecommendations) - _size(recommendationData);
  }, [run, isError, aiRecommendations, recommendationData]);

  // Filter out empty arry
  const filteredAiRecommendationParams = useMemo(() => {
    const pairs = _toPairs(aiRecommendationParams);
    const filteredPairs = _filter(pairs, (pair) => !_isEmpty(pair[1]));
    return filteredPairs;
  }, [aiRecommendationParams]);

  // Trigger Tmdb search API after get ai recommendation list (movie titles)
  useEffect(() => {
    if (_isEmpty(aiRecommendations)) return;
    searchTrigger({ query: aiRecommendations[0] });
  }, [aiRecommendations]);

  // Loop query top 10 ai recommendation list
  useEffect(() => {
    if (_isEmpty(data)) return;
    if (skeletonSize <= 0) return;
    const lastQuery = _get(originalArgs, 'query');
    const lastIndex = _indexOf(aiRecommendations, lastQuery);
    if (lastIndex === -1) return;
    if (lastIndex === _size(aiRecommendations) - 1) {
      // Reset 'run' to be false after task run successfully
      setRun(false);
      return;
    }
    searchTrigger({ query: aiRecommendations[lastIndex + 1] });
  }, [data]);

  // Update recommendationData
  useEffect(() => {
    if (_isEmpty(data)) return;
    const result = _get(data, 'results.0');
    if (_isEmpty(result)) return;
    setRecommendationData((prev) => [...prev, result]);
  }, [data]);

  useImperativeHandle(ref, () => ({
    start: () => {
      setRecommendationData([]);
      setRun(true);
      // Scroll to bottom
      setTimeout(() => {
        const container = document.getElementById(
          'ai-recommendation-container',
        );
        window.scrollTo(0, container.offsetTop);
      }, 500);
    },
  }));

  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', null);

  // Navigate to /movie page
  const onMovieClick = (result) => {
    const url = `/movie?id=${getMovieId(result)}`;
    router.push(url);
  };

  if (!run && _isEmpty(data)) return null;

  return (
    <div
      id="ai-recommendation-container"
      className="container-xl text-center border-top"
    >
      <div className="fs-3 my-5">AI Recommended Watchlist</div>
      {isError ? (
        <SomethingWentWrong />
      ) : (
        <>
          {_map(filteredAiRecommendationParams, ([key, value]) => (
            <div key={key} className="d-flex align-items-center my-3 fw-bold">
              {_capitalize(key)}:
              {_map(value, (item) => (
                <div key={item} className={styles.label}>
                  {item}
                </div>
              ))}
            </div>
          ))}
          <div className="row gx-3 gy-3 my-2 py-4">
            {recommendationData.map((result, idx) => (
              <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <TmdbMovieCard
                  result={result}
                  linkTo={`/movie?id=${getMovieId(result)}`}
                  path={getPosterPath(result)}
                  type={TmdbImageTypes.poster}
                  onClick={() => onMovieClick(result)}
                />
                <div className="fw-bold mt-2">
                  {_get(result, 'original_title')}
                </div>
              </div>
            ))}
            {_range(skeletonSize).map((idx) => (
              <LoadingSkeletonForMovieCard key={idx} />
            ))}
          </div>
        </>
      )}
    </div>
  );
});
