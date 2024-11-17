import { useLazyGetUpcomingMovieListsQuery } from '@/store/apis/tmdb';
import GeneralMovieList from '@/components/general-movie-list';

export default function UpcomingPage() {
  return (
    <GeneralMovieList
      title="Upcoming Movies"
      useLazyGetQueryFunc={useLazyGetUpcomingMovieListsQuery}
    />
  );
}
