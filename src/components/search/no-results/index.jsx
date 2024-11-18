import Image from 'next/image';

export default function NoResults({ isEmpty }) {
  if (!isEmpty) return null;

  return (
    <div className="text-center py-5">
      <Image
        width="300"
        height="300"
        src="/assets/images/search/no-result.png"
        alt="no result"
      />
      <div className="mt-3 fs-3">No Results Found</div>
    </div>
  );
}
