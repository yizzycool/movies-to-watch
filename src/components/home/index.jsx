import {
  useGetNowPlayingMovieListsQuery,
  useGetPopularMovieListsQuery,
  useGetTopRatedMovieListsQuery,
  useGetUpcomingMovieListsQuery,
} from '@/store/apis/tmdb';
import MovieLists from './movie-lists';
import TopBanner from './top-banner';
import _get from 'lodash/get';

export default function Home() {
  // API for now plaing movies
  const { data: nowPlayingData, isLoading: nowPlayingDataIsLoading } =
    useGetNowPlayingMovieListsQuery({});

  // API for popular movies
  const { data: popularData, isLoading: popularDataIsLoading } =
    useGetPopularMovieListsQuery(
      {},
      { skip: !nowPlayingData || nowPlayingDataIsLoading },
    );

  // API for top rated movies
  const { data: topRatedData, isLoading: topRatedDataIsLoading } =
    useGetTopRatedMovieListsQuery(
      {},
      {
        skip: !popularData || popularDataIsLoading,
      },
    );

  // API for upcoming movies
  const { data: upcomingData, isLoading: upcomingDataIsLoading } =
    useGetUpcomingMovieListsQuery(
      {},
      {
        skip: !topRatedData || topRatedDataIsLoading,
      },
    );

  return (
    <>
      <TopBanner />
      <MovieLists
        title="Now Playing"
        results={_get(nowPlayingData, 'results', [])}
        isLoading={nowPlayingDataIsLoading}
      />
      <MovieLists
        title="Popular"
        results={_get(popularData, 'results', [])}
        isLoading={popularDataIsLoading}
      />
      <MovieLists
        title="Top Rated"
        results={_get(topRatedData, 'results', [])}
        isLoading={topRatedDataIsLoading}
      />
      <MovieLists
        title="Upcoming"
        results={_get(upcomingData, 'results', [])}
        isLoading={upcomingDataIsLoading}
      />
    </>
  );
}
