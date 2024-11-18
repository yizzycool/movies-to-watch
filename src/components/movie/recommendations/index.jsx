import { useMemo } from 'react';
import MovieLists from '@/components/home/movie-lists';
import _get from 'lodash/get';

export default function Recommendations({ data, isFetching }) {
  const results = useMemo(() => {
    return _get(data, 'recommendations.results', []);
  }, [data]);

  return (
    <MovieLists
      title="Recommendations"
      isLoading={isFetching}
      results={results}
      linkTo={null}
    />
  );
}
