export default function LoadingSkeletonForMovieCard() {
  return (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2">
      <div
        className="position-relative ratio rounded placeholder"
        style={{ '--bs-aspect-ratio': '150%' }}
      />
      <div className="mt-2 rounded placeholder col-10" />
    </div>
  );
}
