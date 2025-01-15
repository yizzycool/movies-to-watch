import { SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/compat/router';
import { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbMovieCard from '@/components/common/tmdb-movie-card';
import LoadingSkeleton from './loading-skeleton';
import SwiperCarouselImage from '@/components/common/swiper-carousel-image';
import NoData from './no-data';
import Link from 'next/link';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export default function MovieLists({
  title,
  isLoading,
  results,
  linkTo = '/',
}) {
  const router = useRouter();

  const noData = !isLoading && _isEmpty(results);

  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', '');

  const getTitle = (result) => _get(result, 'title', '');

  // Navigate to /movie page
  const onMovieClick = (result) => {
    const url = `/movie?id=${getMovieId(result)}`;
    router.push(url);
  };

  return (
    <div className="container-fluid bg-body-secondary py-5 border-top">
      <div className="container-xl">
        <h3 className="d-flex justify-content-between align-items-center mb-4 fw-bold">
          {title}
          {!!linkTo && (
            <Link
              href={linkTo}
              className="text-body-emphasis text-decoration-none fs-5"
            >
              See More
              <i className="bi bi-chevron-right ms-1"></i>
            </Link>
          )}
        </h3>
        {noData ? (
          <NoData />
        ) : isLoading || _isEmpty(results) ? (
          <LoadingSkeleton />
        ) : (
          <SwiperCarouselImage>
            {results.map((result, index) => (
              <SwiperSlide key={index}>
                <TmdbMovieCard
                  result={result}
                  linkTo={`/movie?id=${getMovieId(result)}`}
                  path={getPosterPath(result)}
                  type={TmdbImageTypes.poster}
                  onClick={() => onMovieClick(result)}
                />
                <div className="fw-bold mt-2 text-center">
                  {getTitle(result)}
                </div>
              </SwiperSlide>
            ))}
          </SwiperCarouselImage>
        )}
      </div>
    </div>
  );
}
