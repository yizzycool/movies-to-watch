import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  useGetMovieDetailsQuery,
  useGetMovieVideosQuery,
} from '@/store/apis/tmdb';
import Image from 'next/image';
import SwiperCarouselVideo from '@/components/common/swiper-carousel-video';
import YoutubeModal from '@/components/common/youtube-modal';
import { SwiperSlide } from 'swiper/react';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _filter from 'lodash/filter';

export default function Trailer() {
  // Show video info when user hovering
  const [hovering, setHovering] = useState(false);
  // Set youtube video key
  const [youtubeSrc, setYoutubeSrc] = useState(null);

  const router = useRouter();
  const id = router.query?.id || null;

  const { data: movieData, isLoading: movieDataIsLoading } =
    useGetMovieDetailsQuery({ id }, { skip: !id });

  // Query cast lists after querying movieData completed
  const { data } = useGetMovieVideosQuery(
    { id },
    { skip: !movieData || movieDataIsLoading },
  );
  const { results } = data || {};
  const filteredResults = _filter(
    results,
    (result) => result.site === 'YouTube',
  );

  // Get youtube image path
  const getImagePath = (result) => {
    const key = _get(result, 'key', '');
    if (!key) return null;
    return `https://img.youtube.com/vi/${key}/maxresdefault.jpg`;
  };

  const onPointerEnter = (idx) => setHovering(idx);

  const onPointerOut = () => setHovering(false);

  // Set youtube src and trigger YoutubeModal
  const onClick = (result) => {
    const key = _get(result, 'key', '');
    if (!key) {
      setYoutubeSrc(null);
      return;
    }
    setYoutubeSrc(`https://www.youtube.com/embed/${key}`);
    const modalEl = document.getElementById('youtube-modal');
    const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    modalBootstrap?.show();
  };

  if (_isEmpty(results)) {
    return null;
  }

  return (
    <div className="container-fluid bg-body-secondary py-5 border-top">
      <div className="container-xl">
        <h3 className="mb-4 fw-bold">Trailers</h3>
        <SwiperCarouselVideo>
          {filteredResults.map((result, idx) => (
            <SwiperSlide key={idx}>
              <button
                type="button"
                className="btn ratio rounded overflow-hidden"
                style={{
                  '--bs-aspect-ratio': '56.25%',
                  '--bs-btn-border-width': 0,
                }}
                onPointerEnter={() => onPointerEnter(idx)}
                onPointerOut={onPointerOut}
                onClick={() => onClick(result)}
                // data-bs-toggle="modal"
                // data-bs-target="#youtube-modal"
              >
                <Image
                  className="loading-skeleton w-100 h-100 object-fit-cover rounded user-select-none"
                  width={1600}
                  height={900}
                  src={getImagePath(result)}
                  loading="lazy"
                  alt=""
                />
                <div
                  className={
                    hovering === idx ? styles.maskHovering : styles.mask
                  }
                />
                <i className="bi bi-square-fill fs-5 d-flex justify-content-center align-items-center text-light shadow-lg" />
                <i className="bi bi-youtube fs-1 d-flex justify-content-center align-items-center text-danger shadow-lg " />
              </button>
            </SwiperSlide>
          ))}
        </SwiperCarouselVideo>
        <YoutubeModal src={youtubeSrc} />
      </div>
    </div>
  );
}
