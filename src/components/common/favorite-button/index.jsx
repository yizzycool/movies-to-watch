import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyUpdateWatchlistQuery } from '@/store/apis/firebase';
import _includes from 'lodash/includes';

export default function FavoriteButton({ id }) {
  // Show icon changed immediately without waiting API response
  const [isFavorite, setIsFavorite] = useState(false);

  // API to add/remove movie id from watchlist
  const [trigger] = useLazyUpdateWatchlistQuery();

  // Get uid and watchlist from redux
  // - uid: check if is signed user
  // - watchlist: check if id is in watchlist
  const user = useSelector((state) => state.user);
  const { uid, watchlist } = user;

  const isIdInWatchList = _includes(watchlist, id);

  useEffect(() => {
    setIsFavorite(isIdInWatchList);
  }, [isIdInWatchList]);

  // Add or remove movie id from watchlist
  const onClick = () => {
    if (!uid) return;
    setIsFavorite((prev) => !prev);
    trigger({ uid, id });
  };

  return (
    <button
      type="button"
      className="btn btn-secondary d-flex justify-content-center align-items-center rounded-circle"
      style={{ minWidth: '45px', minHeight: '45px' }}
      onClick={onClick}
    >
      {isFavorite ? (
        <i className="bi bi-heart-fill text-danger"></i>
      ) : (
        <i className="bi bi-heart"></i>
      )}
    </button>
  );
}
