import Link from 'next/link';
import Image from 'next/image';
import useRealtimeDatabaseMonitor from '@/hooks/header/user-realtime-database-monitor';
import useBreakpoints from '@/hooks/use-breakpoints';
import {
  useGetConfigurationQuery,
  useGetGenreListsQuery,
} from '@/store/apis/tmdb';
import NavDesktop from './nav-desktop';
import NavMobile from './nav-mobile';
import BootstrapToast from '../common/bootstrap-toast';

export default function Header() {
  // Get configuration from TMDB API
  useGetConfigurationQuery();

  // Get movie genres
  useGetGenreListsQuery();

  // Monitor changes of watchlist from realtime database
  useRealtimeDatabaseMonitor();

  const { isWidthLg } = useBreakpoints();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top px-2 px-lg-4 py-3">
        <div className="container-xl">
          <Link className="navbar-brand p-0 d-flex align-items-center" href="/">
            <Image
              src="/favicon.png"
              alt="Logo"
              width="40"
              height="32"
              className="d-inline-block align-text-top me-2"
            />
            <div className="d-none d-sm-inline-block">Movies to Watch</div>
          </Link>
          {isWidthLg ? <NavDesktop /> : <NavMobile />}
        </div>
      </nav>
      <BootstrapToast />
    </>
  );
}
