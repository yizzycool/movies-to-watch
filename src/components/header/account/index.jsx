import { useLazySignInQuery, useLazySignOutQuery } from '@/store/apis/firebase';
import { setShowToast } from '@/store/toast-slice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Account() {
  const dispatch = useDispatch();

  // Google sign in API
  const [triggerSignIn] = useLazySignInQuery();

  // Google sign out API
  const [triggerSignOut, { isLoading: isLogoutLoading }] =
    useLazySignOutQuery();

  // Get user redux states
  const user = useSelector((state) => state.user);
  const { isSignInUser, photoUrl } = user;

  // Trigger toast message to show sign in / sign out
  useEffect(() => {
    if (!isSignInUser) return;
    dispatch(
      setShowToast({
        show: true,
        title: 'Welcome back',
        content: 'Signed In Successfully',
      }),
    );
  }, [isSignInUser, dispatch]);

  const onSignIn = () => {
    if (isSignInUser) return;
    triggerSignIn();
  };

  const onSignOut = () => {
    if (!isSignInUser) return;
    triggerSignOut();
    dispatch(
      setShowToast({
        show: true,
        title: 'Bye~',
        content: 'Signed Out Successfully',
      }),
    );
  };

  return (
    <div className="d-flex justify-content-end">
      <div className="dropdown">
        <button
          type="button"
          className="btn btn-primary position-relative rounded-circle p-2 d-flex justify-content-center align-items-center overflow-hidden"
          style={{ width: '40px', height: '40px' }}
          data-bs-toggle={isSignInUser ? 'dropdown' : ''}
          onClick={onSignIn}
        >
          {photoUrl ? (
            <Image
              src={photoUrl}
              width="96"
              height="96"
              className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
              alt="avatar"
            />
          ) : (
            <i className="bi bi-person-fill"></i>
          )}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          style={{ '--bs-dropdown-spacer': '1rem' }}
        >
          <li className="dropdown-item disabled">
            <small>Welcome,</small>{' '}
            <span className="text-success fw-bold">{user.displayName}</span>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <Link className="dropdown-item" href="/watch-list">
            Watch List
          </Link>
          <button
            type="button"
            className="dropdown-item"
            onClick={onSignOut}
            disabled={isLogoutLoading}
          >
            {isLogoutLoading ? 'Logging out...' : 'Logout'}
          </button>
        </ul>
      </div>
    </div>
  );
}