import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useGetPopularMovieListsQuery } from '@/store/apis/tmdb';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import LoadingSkeleton from './loading-skeleton';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

// Swiper configurations
const SwiperConfigs = {
  loop: false,
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 8,
  loopAddBlankSlides: false,
  centerInsufficientSlides: true,
  navigation: true,
  modules: [Navigation],
  breakpoints: {
    992: {
      slidesPerView: 6,
      slidesPerGroup: 1,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 5,
      slidesPerGroup: 1,
      spaceBetween: 25,
    },
  },
};

export default function PopularMovies() {
  // Get top 20 popular movies from TMDB API
  const { data, isLoading } = useGetPopularMovieListsQuery({ page: 1 });
  const results = _get(data, 'results', []);

  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', '');

  return (
    <div className="container-fluid bg-body-secondary py-5">
      <div className="container-xl">
        <h3 className="text-danger mb-4 fw-bold">Popular Movies</h3>
        {isLoading || _isEmpty(results) ? (
          <LoadingSkeleton />
        ) : (
          <Swiper {...SwiperConfigs}>
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
          </Swiper>
        )}
      </div>
    </div>
  );
}
