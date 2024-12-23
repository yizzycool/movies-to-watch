import { useMemo } from 'react';
import useBreakpoints from '@/hooks/use-breakpoints';
import Image from 'next/image';
import _range from 'lodash/range';

export default function NoData() {
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
    <div className="grid column-gap-3 position-relative">
      <div className="row opacity-0">
        {_range(columns).map((idx) => (
          <div key={idx} className="col">
            <div
              className="ratio placeholder rounded"
              style={{ '--bs-aspect-ratio': '150%', cursor: 'unset' }}
            />
            <div className="mt-2 rounded placeholder col-12" />
          </div>
        ))}
      </div>
      <div className="position-absolute top-0 left-0 w-100 h-100 d-flex justify-content-center align-items-center">
        <Image
          unoptimized={true} // Enable unoptimized mode due to Vercel's image optimization limit.
          width="100"
          height="100"
          src="/assets/images/search/no-result.png"
          alt="no result"
          loading="lazy"
        />
        <div className="fs-4">No Data</div>
      </div>
    </div>
  );
}
