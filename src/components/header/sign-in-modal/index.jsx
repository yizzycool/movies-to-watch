import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazySignInQuery } from '@/store/apis/firebase';
import { setShowSignInModal } from '@/store/modal-slice';
import { setShowToast } from '@/store/toast-slice';
import Image from 'next/image';

export default function SignInModal() {
  const dispatch = useDispatch();

  // Google sign in API
  const [triggerSignIn] = useLazySignInQuery();

  const [eventListenerExists, setEventListenerExists] = useState(false);

  // Get toast redux states
  const showSignInModal = useSelector((state) => state.modal.showSignInModal);
  const isSignInUser = useSelector((state) => state.user.isSignInUser);

  // Show modal when true
  // Hide modal when false
  useEffect(() => {
    if (showSignInModal) {
      show();
    } else {
      hide();
    }
  }, [showSignInModal]);

  // Clear redux states after 'hidden.bs.modal' event received
  const registerEventListener = (modalEl) => {
    if (eventListenerExists) return;
    setEventListenerExists(true);
    modalEl.addEventListener('hidden.bs.modal', () => {
      dispatch(setShowSignInModal(false));
    });
  };

  // Show modal element with bootstrap js api
  const show = () => {
    const modalEl = document.getElementById('login-modal');
    const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    modalBootstrap?.show();
    // Add event listener when first mounted
    registerEventListener(modalEl);
  };

  // Hide modal element with bootstrap js api
  const hide = () => {
    const modalEl = document.getElementById('login-modal');
    const modalBootstrap = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    if (!modalBootstrap?._isShown) return;
    modalBootstrap?.hide();
  };

  // Call firebase signIn API and trigger toast message
  const onSignIn = async () => {
    if (isSignInUser) return;
    const { isSuccess } = await triggerSignIn();
    if (!isSuccess) return;
    hide();
    dispatch(
      setShowToast({
        show: true,
        title: 'Welcome back',
        content: 'Signed In Successfully',
      }),
    );
  };

  return (
    <div id="login-modal" className="modal fade">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Sign In Options</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <button
              type="button"
              className="btn btn-outline-light d-flex align-items-center mx-auto"
              onClick={onSignIn}
            >
              <Image
                width="20"
                height="20"
                src="/assets/images/account/google.svg"
                className="me-2"
              />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
