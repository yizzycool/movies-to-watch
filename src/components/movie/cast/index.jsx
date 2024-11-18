import { useMemo } from 'react';
import { SwiperSlide } from 'swiper/react';
import SwiperCarouselImage from '@/components/common/swiper-carousel-image';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import LoadingSkeleton from './loading-skeleton';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _filter from 'lodash/filter';

export default function Cast({ data, isLoading }) {
  // Get cast of type 'Acting'
  const results = useMemo(() => {
    const cast = _get(data, 'credits.cast', []);
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
          <SwiperCarouselImage>
            {results.map((result, index) => (
              <SwiperSlide key={index}>
                <div className="card rounded overflow-hidden">
                  <div
                    className="card-img-top ratio"
                    style={{ '--bs-aspect-ratio': '150%' }}
                  >
                    <TmdbImage
                      path={getProfilePath(result)}
                      type={TmdbImageTypes.profile}
                      emptyContent={<i class="bi bi-person-square fs-1" />}
                    />
                  </div>
                  <div className="card-body">
                    <div className="card-title fw-bold text-truncate">
                      {getActorName(result)}
                    </div>
                    <div
                      className="card-text text-secondary-emphasis text-truncate"
                      style={{ fontSize: '12px' }}
                    >
                      {getCharacterName(result)}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperCarouselImage>
        )}
      </div>
    </div>
  );
}
