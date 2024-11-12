import Link from 'next/link';
import { useRouter } from 'next/router';
import _range from 'lodash/range';

export default function SearchBar({ id }) {
  const router = useRouter();

  const onSubmit = (event) => {
    // Prevent default action of 'form' being triggered
    event.preventDefault();
    const input = document.getElementById(id);
    const query = input.value;
    if (!query) return;
    // If dropdown list is opened, close it first
    if (input.classList.contains('show')) {
      input.click();
    }
    // Navigate to /search page
    const url = `/search?q=${query}`;
    router.push(url);
  };

  return (
    <div className="dropdown">
      <form className="d-flex flex-wrap mt-3 mt-lg-0" onSubmit={onSubmit}>
        <input
          id={id}
          className="form-control dropdown-toggle d-inline w-auto rounded-start-pill flex-grow-1"
          type="search"
          placeholder="Search videos"
          data-bs-toggle="dropdown"
          autoComplete="off"
          aria-expanded="false"
        />
        <button
          className="btn btn-secondary rounded-end-pill "
          type="button"
          id="button-addon2"
        >
          <i className="bi bi-search me-1"></i>
        </button>
        <ul className="container dropdown-menu">
          {_range(5).map((idx) => (
            <li key={idx}>
              <Link className="dropdown-item" href="/">
                temporary search records - {idx + 1}
              </Link>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
