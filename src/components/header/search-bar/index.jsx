import Link from 'next/link';
import _range from 'lodash/range';

export default function SearchBar({ id }) {
  return (
    <div className="dropdown">
      <form className="d-flex flex-wrap mt-3 mt-lg-0">
        <input
          id={id}
          className="form-control dropdown-toggle d-inline w-auto rounded-start-pill flex-grow-1"
          type="search"
          placeholder="Search videos"
          data-bs-toggle="dropdown"
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
