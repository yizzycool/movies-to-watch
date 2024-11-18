import { useMemo } from 'react';
import useBreakpoints from '@/hooks/use-breakpoints';
import _range from 'lodash/range';

export default function LoadingSkeleton() {
  const { isWidthMd, isWidthLg } = useBreakpoints();

  const columns = useMemo(() => {
    if (isWidthLg) {
      return 6;
    } else if (isWidthMd) {
      return 5;
    }
    return 3;
  }, [isWidthLg, isWidthMd]);

  return (
    <div className="grid column-gap-3">
      <div className="row">
        {_range(columns).map((idx) => (
          <div key={idx} className="col placeholder-glow">
            <div
              className="ratio placeholder rounded"
              style={{ '--bs-aspect-ratio': '150%', cursor: 'unset' }}
            />
            <div className="mt-2 rounded placeholder col-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
