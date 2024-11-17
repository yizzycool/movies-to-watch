import { useLazyGetTopRatedMovieListsQuery } from '@/store/apis/tmdb';
import GeneralMovieList from '@/components/general-movie-list';

export default function TopRatedPage() {
  return (
    <GeneralMovieList
      title="Top Rated Movies"
      useLazyGetQueryFunc={useLazyGetTopRatedMovieListsQuery}
    />
  );
}
