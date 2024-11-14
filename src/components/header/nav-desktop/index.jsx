import ColorModeControl from '../color-mode-control';
import SearchBar from '../search-bar';

export default function NavDesktop() {
  return (
    <div className="d-flex flex-grow-1 justify-content-end align-items-center">
      <div className="flex-grow-1 mx-5">
        <SearchBar id="search-bar-lg" />
      </div>
      <ColorModeControl />
    </div>
  );
}
