import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
} from '@/store/apis/tmdb';
import { SwiperSlide } from 'swiper/react';
import SwiperCarousel from '@/components/common/swiper-carousel';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import LoadingSkeleton from './loading-skeleton';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _filter from 'lodash/filter';

export default function Cast() {
  const router = useRouter();
  const id = router.query?.id || null;

  const { data: movieData, isLoading: movieDataIsLoading } =
    useGetMovieDetailsQuery({ id }, { skip: !id });

  // Query cast lists after querying movieData completed
  const { data, isLoading } = useGetMovieCreditsQuery(
    { id },
    { skip: !movieData || movieDataIsLoading },
  );

  // Get cast of type 'Acting'
  const results = useMemo(() => {
    if (_isEmpty(data)) return [];
    const cast = _get(data, 'cast', []);
    return _filter(
      cast,
      (person) => _get(person, 'known_for_department') === 'Acting',
    );
  }, [data]);

  const getProfilePath = (result) => _get(result, 'profile_path', '');

  const getActorName = (result) => _get(result, 'name', '');

  const getCharacterName = (result) => _get(result, 'character', '');

  return (
    <div className="container-fluid bg-body-secondary py-5 border-top">
      <div className="container-xl">
        <h3 className="mb-4 fw-bold">Cast</h3>
        {isLoading || _isEmpty(results) ? (
          <LoadingSkeleton />
        ) : (
          <SwiperCarousel>
            {results.map((result, index) => (
              <SwiperSlide key={index}>
                <div class="card rounded">
                  <div
                    className="card-img-top ratio"
                    style={{ '--bs-aspect-ratio': '150%' }}
                  >
                    <TmdbImage
                      path={getProfilePath(result)}
                      type={TmdbImageTypes.profile}
                    />
                  </div>
                  <div class="card-body">
                    <div class="card-title fw-bold text-truncate">
                      {getActorName(result)}
                    </div>
                    <div
                      class="card-text text-secondary-emphasis text-truncate"
                      style={{ fontSize: '12px' }}
                    >
                      {getCharacterName(result)}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperCarousel>
        )}
      </div>
    </div>
  );
}
