import urlJoin from 'url-join';
import { useMemo } from 'react';
import useGetImageSize from './hooks/use-get-image-size';
import { useGetConfigurationQuery } from '@/store/apis/tmdb';
import Image from 'next/image';
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
  [TmdbImageTypes.backdrop]: 3 / 2,
  [TmdbImageTypes.poster]: 3 / 2,
  [TmdbImageTypes.logo]: 3 / 2,
  [TmdbImageTypes.profile]: 3 / 2,
  [TmdbImageTypes.still]: 3 / 2,
};

export default function TmdbImage({ path, type }) {
  // Get configuration from redux data
  const { data: configuration } = useGetConfigurationQuery();
  // Parse image data (path/width/height) from TMDB configuration data
  const { imageSizePath, imageWidth, imageHeight } = useGetImageSize({ type });

  // Combine `secureBaseUrl`, `imageSizePath`, and `path`
  // Ex: https://image.tmdb.org/t/p/w342/63xYQj1BwRFielxsBDXvHIJyXVm.jpg
  //    |--------------------------|    |-------------------------------|
  //           secureBaseUrl       |----|            path
  //                            imageSizePath
  const imagePath = useMemo(() => {
    const secureBaseUrl = _get(configuration, 'images.secure_base_url', '');
    if (!secureBaseUrl || !imageSizePath || !path) {
      return null;
    }
    return urlJoin(secureBaseUrl, imageSizePath, path);
  }, [configuration, imageSizePath, path]);

  return (
    <Image
      className="loading-skeleton rounded"
      width={imageWidth}
      height={imageHeight}
      src={imagePath}
      alt=""
    />
  );
}
