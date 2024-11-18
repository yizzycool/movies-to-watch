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
  const { data, isLoading } = useGetMovieDetailsQuery(
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
      <Intro data={data} isLoading={isLoading} />
      <Cast data={data} isLoading={isLoading} />
      <Trailer data={data} isLoading={isLoading} />
      <Recommendations data={data} isLoading={isLoading} />
      <Similar data={data} isLoading={isLoading} />
    </>
  );
}
