import { useMemo } from 'react';
import MovieLists from '@/components/home/movie-lists';
import _get from 'lodash/get';

export default function Similar({ data, isLoading }) {
  const results = useMemo(() => {
    return _get(data, 'similar.results', []);
  }, [data]);

  return (
    <MovieLists
      title="Similar"
      isLoading={isLoading}
      results={results}
      linkTo={null}
    />
  );
}
