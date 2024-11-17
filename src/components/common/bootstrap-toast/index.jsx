import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PositionMapX, PositionMapY } from '@/data/common/bootstrap-toast';
import { setShowToast } from '@/store/toast-slice';
import _get from 'lodash/get';

const Options = {
  delay: 2000,
};

// position: {
//   x: ['left', 'center', 'right' ],
//   y: ['top' , 'middle', 'bottom'],
// }

export default function BootstrapToast() {
  const dispatch = useDispatch();

  // Get toast redux states
  const toast = useSelector((state) => state.toast);
  const { title, content, position } = toast;

  // Get bootstrap classes for different positions
  const positionClass = `${_get(PositionMapX, position.x, '')} ${_get(PositionMapY, position.y, '')}`;

  // Popup toast when show === true
  useEffect(() => {
    if (!toast.show) return;
    popup();
  }, [toast]);

  // Clear redux states after 'hidden.bs.toast' event received
  const registerEventListener = (toastEl) => {
    toastEl.addEventListener('hidden.bs.toast', () => {
      dispatch(setShowToast());
    });
  };

  // Popup toast element with bootstrap js api
  const popup = () => {
    const toastEl = document.getElementById('movie-to-watch-toast');
    const hasInstance = !!window.bootstrap.Toast.getInstance(toastEl);
    const toastBootstrap = window.bootstrap.Toast.getOrCreateInstance(
      toastEl,
      Options,
    );
    toastBootstrap?.show();
    if (!hasInstance) {
      registerEventListener(toastEl);
    }
  };

  return (
    <div className={`toast-container position-fixed p-3 ${positionClass}`}>
      <div id="movie-to-watch-toast" className="toast">
        <div className="toast-header">
          <strong className="me-auto">{title}</strong>
          <small>just now</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
          ></button>
        </div>
        <div className="toast-body">{content}</div>
      </div>
    </div>
  );
}
