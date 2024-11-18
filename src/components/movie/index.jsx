import { useRouter } from 'next/router';
import { useGetMovieDetailsQuery } from '@/store/apis/tmdb';
import Intro from './intro';
import Cast from './cast';
import Trailer from './trailer';
import Recommendations from './recommendations';
import Similar from './similar';

export default function Movie() {
  const router = useRouter();
  const id = router.query?.id || null;

  // Get movie details with param 'appendToResponse'
  const { data, isFetching } = useGetMovieDetailsQuery(
    {
      id,
      appendToResponse: [
        'credits',
        'images',
        'keywords',
        'recommendations',
        'similar',
        'videos',
      ],
    },
    { skip: !id },
  );

  return (
    <>
      <Intro data={data} isFetching={isFetching} />
      <Cast data={data} isFetching={isFetching} />
      <Trailer data={data} isFetching={isFetching} />
      <Recommendations data={data} isFetching={isFetching} />
      <Similar data={data} isFetching={isFetching} />
    </>
  );
}
