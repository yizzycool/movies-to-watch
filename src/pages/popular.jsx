import { useLazyGetPopularMovieListsQuery } from '@/store/apis/tmdb';
import GeneralMovieList from '@/components/general-movie-list';

export default function PopularPage() {
  return (
    <GeneralMovieList
      title="Popular Movies"
      useLazyGetQueryFunc={useLazyGetPopularMovieListsQuery}
    />
  );
}
