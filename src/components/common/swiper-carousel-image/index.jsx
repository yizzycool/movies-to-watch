import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Swiper configurations
const SwiperConfigs = {
  loop: false,
  slidesPerView: 3,
  slidesPerGroup: 1,
  spaceBetween: 8,
  loopAddBlankSlides: false,
  centerInsufficientSlides: false,
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

export default function SwiperCarouselImage({ children }) {
  return <Swiper {...SwiperConfigs}>{children}</Swiper>;
}
