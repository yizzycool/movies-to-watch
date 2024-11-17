import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { udpateSearchHistory } from '@/store/search-history-slice';
import Link from 'next/link';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

export default forwardRef(function SearchHistory(_, ref) {
  const dispatch = useDispatch();

  // Get user/searchHistory from redux
  const user = useSelector((state) => state.user);
  const searchHistory = useSelector((state) => state.searchHistory);

  // Find search history list by uid
  const history = useMemo(() => {
    const uid = user.uid || -1;
    return _get(searchHistory, uid, []);
  }, [user.uid, searchHistory]);

  const toggleSearchHistory = (query) => {
    const uid = user.uid || -1;
    dispatch(udpateSearchHistory({ uid, query }));
  };

  // Pass methods to parent
  useImperativeHandle(
    ref,
    () => ({
      // Update redux searchHistory
      addToSearchHistory: toggleSearchHistory,
    }),
    [user.uid],
  );

  if (_isEmpty(history)) return null;

  return (
    <ul id="dropdown-menu" className="container dropdown-menu">
      {history.map((query, idx) => (
        <li
          key={idx}
          className="d-flex justify-content-between align-items-center pe-2"
        >
          <Link className="dropdown-item me-1" href={`/search?q=${query}`}>
            {query}
          </Link>
          <button
            type="button"
            className="btn p-0"
            onClick={() => toggleSearchHistory(query)}
          >
            <i className="bi bi-x"></i>
          </button>
        </li>
      ))}
    </ul>
  );
});
