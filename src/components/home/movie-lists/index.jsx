import { SwiperSlide } from 'swiper/react';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import LoadingSkeleton from './loading-skeleton';
import SwiperCarouselImage from '@/components/common/swiper-carousel-image';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export default function MovieLists({ title, isLoading, results }) {
  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', '');

  return (
    <div className="container-fluid bg-body-secondary py-5 border-top">
      <div className="container-xl">
        <h3 className="text-danger mb-4 fw-bold">{title}</h3>
        {isLoading || _isEmpty(results) ? (
          <LoadingSkeleton />
        ) : (
          <SwiperCarouselImage>
            {results.map((result, index) => (
              <SwiperSlide key={index}>
                <div className="ratio" style={{ '--bs-aspect-ratio': '150%' }}>
                  <TmdbImage
                    linkTo={`/movie?id=${getMovieId(result)}`}
                    path={getPosterPath(result)}
                    type={TmdbImageTypes.poster}
                  />
                </div>
              </SwiperSlide>
            ))}
          </SwiperCarouselImage>
        )}
      </div>
    </div>
  );
}
