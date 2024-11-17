import 'swiper/css';
import 'swiper/css/navigation';
import styles from './index.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useState, useRef } from 'react';
import TmdbImage from '@/components/common/tmdb-image';
import Image from 'next/image';
import _get from 'lodash/get';

// Swiper configurations
const SwiperConfigs = {
  loop: true,
  allowTouchMove: false,
  direction: 'vertical',
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  loopAddBlankSlides: false,
  centerInsufficientSlides: false,
  autoplay: {
    delay: 0,
    reverseDirection: true,
  },
  speed: 1000,
  modules: [Autoplay],
};

export default function SlotMachine({ fetchedData }) {
  const swiperRef = useRef(null);
  const timerRef = useRef(null);

  const [spinning, setSpinning] = useState(false);
  const [waitForStop, setWaitForStop] = useState(false);

  // Handle both 'start' and 'stop'
  const onClick = () => {
    setSpinning((prev) => !prev);
    if (!spinning) {
      // Handle for start
      swiperRef.current.autoplay.start();
      onStart();
    } else {
      setWaitForStop(true);
      clearTimer();
      onStop(swiperRef.current.params.speed);
    }
  };

  // Start spinning
  const onStart = () => {
    const speed = swiperRef.current.params.speed;
    swiperRef.current.params.speed = speed - 100;
    if (speed <= 200) return;
    timerRef.current = setTimeout(onStart, 200);
  };

  // Stop spinning
  const onStop = () => {
    const speed = swiperRef.current.params.speed;
    swiperRef.current.params.speed = speed + 100;
    if (speed >= 900) {
      setTimeout(onStopEnd, 1000);
      return;
    }
    setTimeout(onStop, 200);
  };

  // Stop autoplay after speed >= 1000
  const onStopEnd = () => {
    swiperRef.current.autoplay.stop();
    setWaitForStop(false);
  };

  // Clear 'onStart' timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const getMovieId = (result) => _get(result, 'id', null);

  return (
    <>
      <button
        type="button"
        className="btn position-absolute top-0 end-0"
        data-bs-toggle="modal"
        data-bs-target="#slot-machine"
        style={{ '--bs-btn-border-width': '0' }}
      >
        <Image
          src="/assets/images/watchlist/slot-machine.png"
          width="32"
          height="32"
          alt="slot machine icon"
        />
      </button>
      <div className="modal fade" id="slot-machine">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <Image
              className="w-100 h-100 position-absolute z-2 pe-none"
              width="1386"
              height="853"
              src="/assets/images/watchlist/background.png"
            />
            <div className="d-flex align-items-center z-3 mt-3 px-2">
              <h1
                className="modal-title fs-5 fw-bold flex-grow-1 ms-3 ms-sm-5 text-center"
                id="exampleModalLabel"
              >
                Random Pick a Movie!
              </h1>
              <button
                type="button"
                className="btn-close align-self-end rounded-circle p-2"
                data-bs-dismiss="modal"
              />
            </div>
            <div className={styles.aspectRatioBlock}>
              <Swiper
                className={styles.swiper}
                {...SwiperConfigs}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                style={{
                  height: '100%',
                }}
              >
                {fetchedData.map((data, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="ratio h-100" data-bs-dismiss="modal">
                      <TmdbImage
                        linkTo={`/movie?id=${getMovieId(data)}`}
                        path={_get(data, 'poster_path')}
                        type="poster"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <button
              type="button"
              className={`position-absolute top-100 start-50 translate-middle-x translate z-2 mt-3 w-25 rounded-pill btn ${waitForStop ? 'btn-secondary' : 'btn-success'}`}
              onClick={onClick}
              disabled={waitForStop}
            >
              {waitForStop ? '...' : spinning ? 'Stop' : 'Spin'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
