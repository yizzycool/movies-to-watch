import { useEffect, useState } from 'react';
import _get from 'lodash/get';
import _isNull from 'lodash/isNull';

export default function useIntersectionObserver({
  startDetect = false,
  rootSelector = null,
  rootMargin = '0px',
  threshold = 1.0,
  targetSelector,
}) {
  const [hit, setHit] = useState(false);
  const [observer, setObserver] = useState(null);

  // Start detection when startDetect is true
  useEffect(() => {
    if (!startDetect || !_isNull(observer)) return;
    init();
  }, [startDetect]);

  const init = () => {
    // If `IntersectionObserver` not support, setHit to be true forever
    if (!window?.IntersectionObserver) {
      setHit(true);
    } else {
      const options = {
        root: _isNull(rootSelector)
          ? rootSelector
          : document.querySelector(rootSelector),
        rootMargin,
        threshold,
      };
      const observer = new IntersectionObserver(callback, options);
      const target = document.querySelector(targetSelector);
      observer.observe(target);
      setObserver(observer);
    }
  };

  const callback = (entries, _observer) => {
    const intersectionRatio = _get(entries, '0.intersectionRatio', 0);
    if (intersectionRatio < threshold) {
      setHit(false);
    } else {
      setHit(true);
    }
  };

  return {
    hit,
  };
}
