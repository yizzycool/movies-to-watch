import Account from '../account';
import ColorModeControl from '../color-mode-control';
import SearchBar from '../search-bar';

export default function NavMobile() {
  return (
    <div className="d-flex flex-grow-1 justify-content-end align-items-center">
      <Account />
      <button
        id="menu-toggle-button"
        className="navbar-toggler btn btn-outline-secondary ms-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target=" #offcanvasNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end" id="offcanvasNavbar">
        <div className="offcanvas-header">
          <ColorModeControl />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="offcanvas-body align-items-center">
          <SearchBar id="search-bar" />
        </div>
      </div>
    </div>
  );
}
