import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Swiper configurations
const SwiperConfigs = {
  loop: false,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 8,
  loopAddBlankSlides: false,
  centerInsufficientSlides: false,
  navigation: true,
  modules: [Navigation],
  breakpoints: {
    992: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 25,
    },
  },
};

export default function SwiperCarouselVideo({ children }) {
  return <Swiper {...SwiperConfigs}>{children}</Swiper>;
}
