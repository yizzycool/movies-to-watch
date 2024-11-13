import styles from './index.module.scss';
import Image from 'next/image';
import useBreakpoints from '@/hooks/use-breakpoints';

export default function TopBanner() {
  const { isWidthLg } = useBreakpoints();

  const onSearchClick = () => {
    if (isWidthLg) {
      // for desktop mode
      const searchBar = window.document.getElementById('search-bar-lg');
      setTimeout(() => searchBar.click());
    } else {
      // for mobile mode
      const menuIcon = window.document.getElementById('menu-toggle-button');
      const searchBar = window.document.getElementById('search-bar');
      setTimeout(() => {
        menuIcon.click();
        searchBar.click();
      });
    }
  };

  return (
    <div className="container-fluid overflow-hidden">
      <div className="container-xl d-flex" style={{ height: '500px' }}>
        <Image
          className={`${styles.leftImage} d-none d-lg-block align-self-end`}
          priority={true}
          src="/assets/images/home/movie-film-1.png"
          width="400"
          height="400"
          alt="movie file"
        />
        <div className="flex-grow-1 text-center m-auto">
          <h1>Discover Your Next Favorite Movie</h1>
          <h5 className="text-secondary mt-3" style={{ lineHeight: '1.8rem' }}>
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
        <Image
          className={`${styles.rightImage} d-none d-lg-block align-self-start`}
          src="/assets/images/home/movie-film-2.png"
          width="400"
          height="400"
          alt="movie file"
        />
      </div>
    </div>
  );
}
