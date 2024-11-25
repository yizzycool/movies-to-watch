import Image from 'next/image';

export default function NoWatchlist() {
  return (
    <div className="text-center py-5">
      <Image
        unoptimized={true} // Enable unoptimized mode due to Vercel's image optimization limit.
        width="300"
        height="300"
        src="/assets/images/search/no-result.png"
        alt="no result"
        loading="lazy"
      />
      <div className="mt-3 fs-4">No Watchlist</div>
    </div>
  );
}
