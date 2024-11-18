import _range from 'lodash/range';

export default function LoadingSkeleton() {
  return (
    <div className="container-fluid position-relative overflow-hidden placeholder-glow">
      <div className="container-xl py-5">
        <div className="d-flex align-items-start">
          <div
            className="flex-shrink-1 w-25 ratio"
            style={{ '--bs-aspect-ratio': '150%' }}
          >
            <div className="placeholder rounded" />
          </div>
          <div className="w-75 ps-5">
            <h1 className="fs-3 placeholder col-4 rounded" />
            <br />
            <div className="placeholder col-3 rounded" />
            <div className="my-5">
              {_range(4).map((idx) => (
                <div key={idx} className="placeholder col-8 rounded my-1" />
              ))}
            </div>
            <div className="placeholder col-12 rounded mt-3" />
            <div className="placeholder col-12 rounded mt-3" />
            <div className="placeholder col-8 rounded mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
