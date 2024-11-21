import _range from 'lodash/range';

export default function LoadingSkeleton() {
  return (
    <div
      className="row gx-3 gy-3 my-5 placeholder-glow"
      data-testid="infinite-scroll-skeleton"
    >
      {_range(20).map((idx) => (
        <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2">
          <div
            className="position-relative ratio rounded placeholder"
            style={{ '--bs-aspect-ratio': '150%' }}
          />
          <div className="mt-2 rounded placeholder col-10" />
        </div>
      ))}
    </div>
  );
}
