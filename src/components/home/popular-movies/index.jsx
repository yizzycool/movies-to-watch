import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetPopularMovieListsQuery } from '@/store/apis/tmdb';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import _get from 'lodash/get';

// Swiper configurations
const SwiperConfigs = {
  loop: true,
  slidesPerView: 3,
  slidesPerGroup: 2,
  spaceBetween: 8,
  loopAddBlankSlides: false,
  centerInsufficientSlides: true,
  breakpoints: {
    992: {
      slidesPerView: 6,
      slidesPerGroup: 6,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 25,
    },
  },
};

export default function PopularMovies() {
  // Get top 40 popular movies from TMDB API
  const { data } = useGetPopularMovieListsQuery({ page: 1 });
  const results = _get(data, 'results', []);

  const getPosterPath = (result) => _get(result, 'poster_path', '');

  return (
    <div className="container-fluid bg-body-secondary py-5">
      <div className="container-xl">
        <h3 className="text-danger mb-4 fw-bold">Popular Movies</h3>
        <Swiper {...SwiperConfigs}>
          {results.map((result, index) => (
            <SwiperSlide key={index}>
              <div className="ratio" style={{ '--bs-aspect-ratio': '150%' }}>
                <TmdbImage
                  path={getPosterPath(result)}
                  type={TmdbImageTypes.poster}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
