import { useEffect, useRef } from 'react';
import { useRouter } from 'next/compat/router';
import SearchHistory from './search-history';

export default function SearchBar({ id }) {
  const inputRef = useRef(null);
  const searchHistoryRef = useRef(null);

  const router = useRouter();

  // Things todo before navigate to search page:
  // 1. blur input element
  // 2. hide dropdown menu
  // 3. update search history list in redux
  // 4. navigate to search page
  const onSubmit = (event) => {
    // Prevent default action of 'form' being triggered
    event.preventDefault();
    const input = document.getElementById(id);
    const query = input.value;
    if (!query) return;
    input.blur();
    hideDropdown();
    searchHistoryRef?.current?.addToSearchHistory(query);
    router.push(`/search?q=${query}`);
  };

  // Get dropdown menu with bootstrap javascript library
  const getDropdownBootstrap = () => {
    const dropdownEl = document.getElementById('dropdown-menu');
    if (!dropdownEl) return null;
    const dropdownBootstrap =
      window.bootstrap.Dropdown.getOrCreateInstance(dropdownEl);
    return dropdownBootstrap;
  };

  const hideDropdown = () => {
    const dropdown = getDropdownBootstrap();
    dropdown?.hide();
  };

  // Show dropdown menu when click input element, else hide the element
  useEffect(() => {
    const onClick = (event) => {
      const dropdown = getDropdownBootstrap();
      const activeElement = document.activeElement;
      if (
        event.target === inputRef.current ||
        activeElement === inputRef.current
      ) {
        dropdown?.show();
      } else {
        dropdown?.hide();
      }
    };
    window.addEventListener('click', onClick);
    () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="dropdown">
      <form className="d-flex" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          id={id}
          className="form-control dropdown-toggle d-inline w-auto rounded-start-pill flex-grow-1"
          type="search"
          placeholder="Search videos"
          autoComplete="off"
        />
        <button
          className="btn btn-secondary rounded-end-pill "
          type="button"
          id="button-addon2"
          onClick={onSubmit}
        >
          <i className="bi bi-search me-1"></i>
        </button>
        <SearchHistory ref={searchHistoryRef} />
      </form>
    </div>
  );
}
