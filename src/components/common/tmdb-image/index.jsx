import urlJoin from 'url-join';
import { useMemo } from 'react';
import useGetImageSize from './hooks/use-get-image-size';
import { useGetConfigurationQuery } from '@/store/apis/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import _get from 'lodash/get';

// Image types for TMDB
export const TmdbImageTypes = {
  backdrop: 'backdrop',
  poster: 'poster',
  logo: 'logo',
  profile: 'profile',
  still: 'still',
};

// Aspect ratio for TMDB image
export const TmdbImageAspectRatios = {
  [TmdbImageTypes.backdrop]: 9 / 16,
  [TmdbImageTypes.poster]: 3 / 2,
  [TmdbImageTypes.logo]: 3 / 2,
  [TmdbImageTypes.profile]: 3 / 2,
  [TmdbImageTypes.still]: 3 / 2,
};

export default function TmdbImage({
  linkTo,
  path,
  type,
  emptyContent = 'No Poster',
}) {
  // Get configuration from redux data
  const { data: configuration } = useGetConfigurationQuery();
  const secureBaseUrl = _get(configuration, 'images.secure_base_url', '');

  // Parse image data (path/width/height) from TMDB configuration data
  const { imageSizePath, imageWidth, imageHeight } = useGetImageSize({ type });

  // Combine `secureBaseUrl`, `imageSizePath`, and `path`
  // Ex: https://image.tmdb.org/t/p/w342/63xYQj1BwRFielxsBDXvHIJyXVm.jpg
  //    |--------------------------|    |-------------------------------|
  //           secureBaseUrl       |----|            path
  //                            imageSizePath
  const imagePath = useMemo(() => {
    if (!secureBaseUrl || !imageSizePath || !path) {
      return null;
    }
    return urlJoin(secureBaseUrl, imageSizePath, path);
  }, [secureBaseUrl, imageSizePath, path]);

  if (!secureBaseUrl) {
    return null;
  }

  // If no image path, return 'No Poster'
  if (!path) {
    return (
      <Wrapper linkTo={linkTo}>
        <div className="d-flex w-100 h-100 flex-column justify-content-center align-items-center bg-secondary-subtle text-secondary-emphasis pe-none">
          {emptyContent}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper linkTo={linkTo}>
      <Image
        unoptimized={true} // Enable unoptimized mode due to Vercel's image optimization limit.
        className="loading-skeleton w-100 h-100 object-fit-cover user-select-none"
        width={imageWidth}
        height={imageHeight}
        src={imagePath}
        loading="lazy"
        alt=""
      />
    </Wrapper>
  );
}

function Wrapper({ linkTo, children }) {
  if (linkTo) {
    return (
      <Link className="text-decoration-none" href={linkTo}>
        {children}
      </Link>
    );
  }
  return children;
}
