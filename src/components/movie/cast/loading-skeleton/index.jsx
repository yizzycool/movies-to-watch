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
            <div className="card rounded overflow-hidden">
              <div
                className="ratio placeholder"
                style={{ '--bs-aspect-ratio': '150%', cursor: 'unset' }}
              />
              <div className="card-body">
                <div className="placeholder col-6" />
                <div className="placeholder col-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
