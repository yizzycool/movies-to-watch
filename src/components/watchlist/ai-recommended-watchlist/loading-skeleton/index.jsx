import LoadingSkeletonForMovieCard from './movie-card';
import _range from 'lodash/range';

export default function LoadingSkeleton() {
  return (
    <>
      <div className="fs-3 mt-5">
        Generating Recommended Watch List For You...
      </div>
      <div className="row gx-3 gy-3 my-5 placeholder-glow">
        {_range(12).map((idx) => (
          <LoadingSkeletonForMovieCard key={idx} />
        ))}
      </div>
    </>
  );
}
