import Link from 'next/link';
import Image from 'next/image';
import { useGetConfigurationQuery } from '@/store/apis/tmdb';
import ColorModeControl from './color-mode-control';
import SearchBar from './search-bar';

export default function Header() {
  // Get configuration from TMDB API
  useGetConfigurationQuery();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top px-2 px-lg-4 py-3">
      <div className="container-xl">
        <a className="navbar-brand p-0 d-flex align-items-center" href="#">
          <Image
            src="/favicon.png"
            alt="Logo"
            width="40"
            height="32"
            className="d-inline-block align-text-top me-2"
          />
          <div className="d-none d-sm-inline-block">Movies to Watch</div>
        </a>
        <button
          id="menu-toggle-button"
          className="navbar-toggler btn btn-outline-secondary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target=" #offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" id="offcanvasNavbar">
          <div className="offcanvas-header">
            <div className="d-block d-lg-none">
              <ColorModeControl />
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="navbar-nav d-none d-lg-inline justify-content-center flex-grow-1 mx-4">
              <SearchBar id="search-bar-lg" />
            </div>
            <div className="navbar-nav justify-content-end">
              <div className="nav-item">
                <Link className="nav-link active" href="/">
                  Home
                </Link>
              </div>
              <div className="d-none d-lg-block">
                <ColorModeControl />
              </div>
              <div className="d-block d-lg-none navbar-nav justify-content-center flex-grow-1">
                <SearchBar id="search-bar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
