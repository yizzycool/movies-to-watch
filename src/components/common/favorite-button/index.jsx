import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyUpdateWatchlistQuery } from '@/store/apis/firebase';
import { setShowSignInModal } from '@/store/modal-slice';
import _includes from 'lodash/includes';

export default function FavoriteButton({ id }) {
  const dispatch = useDispatch();

  // Show icon changed immediately without waiting API response
  const [isFavorite, setIsFavorite] = useState(false);
  // Queue watchlist for non-signed-in user
  const [isQueued, setIsQueued] = useState(false);

  // API to add/remove movie id from watchlist
  const [trigger] = useLazyUpdateWatchlistQuery();

  // Get uid and watchlist from redux
  // - uid: check if is signed user
  // - watchlist: check if id is in watchlist
  const user = useSelector((state) => state.user);
  const { isSignInUser, uid, watchlist } = user;

  const showSignInModal = useSelector((state) => state.modal.showSignInModal);

  const isIdInWatchList = _includes(watchlist, id);

  // If user signed-in and isQueued, update watchlist,
  // otherwise, clear queue
  useEffect(() => {
    if (isSignInUser && showSignInModal && isQueued) {
      setIsFavorite((prev) => !prev);
      trigger({ uid, id });
      setIsQueued(false);
    } else if (!showSignInModal) {
      setIsQueued(false);
    }
  }, [isSignInUser, showSignInModal]);

  // Update local state when change detected from redux state
  useEffect(() => {
    setIsFavorite(isIdInWatchList);
  }, [isIdInWatchList]);

  // Add or remove movie id from watchlist
  const onClick = () => {
    if (!isSignInUser) {
      dispatch(setShowSignInModal(true));
      setIsQueued(true);
      return;
    }
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
