import { useLazyGetNowPlayingMovieListsQuery } from '@/store/apis/tmdb';
import GeneralMovieList from '@/components/general-movie-list';

export default function NowPlayingPage() {
  return (
    <GeneralMovieList
      title="Now Plaing Movies"
      useLazyGetQueryFunc={useLazyGetNowPlayingMovieListsQuery}
    />
  );
}
