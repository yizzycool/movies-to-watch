import styles from './index.module.scss';
import Image from 'next/image';
import useBreakpoints from '@/hooks/use-breakpoints';
import _range from 'lodash/range';

export default function TopBanner() {
  const { isWidthLg } = useBreakpoints();

  const onSearchClick = () => {
    if (isWidthLg) {
      // for desktop mode
      const searchBar = window.document.getElementById('search-bar-lg');
      searchBar.focus();
    } else {
      // for mobile mode
      const menuIcon = window.document.getElementById('menu-toggle-button');
      const searchBar = window.document.getElementById('search-bar');
      menuIcon.click();
      searchBar.focus();
    }
  };

  return (
    <div className="container-fluid position-relative overflow-hidden">
      <div className={`container-xl d-flex ${styles.innerContainer}`}>
        <div
          className="flex-grow-1 text-center m-auto"
          style={{ maxWidth: '800px' }}
        >
          <h1>Discover Your Next Favorite Movie</h1>
          <h5
            className="text-secondary-emphasis mt-5"
            style={{ lineHeight: '1.8rem' }}
          >
            Unlock a world of cinematic adventure with personalized movie
            recommendations tailored just for you. Explore thousands of films,
            from hidden gems to the latest blockbusters, and find the perfect
            movie for every mood. Start your journey now!
          </h5>
          <button
            type="button"
            className="btn btn-light rounded-pill mt-5 px-5 py-2"
            onClick={onSearchClick}
          >
            <span className="fw-bold fs-5">Search Movies</span>
          </button>
        </div>
      </div>
      <div className={styles.backgroundBlock}>
        {_range(2).map((idx) => (
          <Image
            key={idx}
            className={styles.backgroundImage}
            width="3000"
            height="1000"
            src="/assets/images/home/background.png"
            priority={true}
            alt=""
          />
        ))}
      </div>
    </div>
  );
}
