import Image from 'next/image';

export default function SomethingWentWrong() {
  return (
    <div className="py-5">
      <Image
        width="300"
        height="300"
        src="/assets/images/watchlist/something-went-wrong.png"
        alt="something went wrong"
        loading="lazy"
      />
      <div className="mt-3 fs-4">Oops!</div>
      <div className="mt-3">Something went wrong. Please try again later.</div>
    </div>
  );
}
