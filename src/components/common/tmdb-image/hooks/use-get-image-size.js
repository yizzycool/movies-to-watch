import { useMemo } from 'react';
import useBreakpoints from '@/hooks/use-breakpoints';
import { useGetConfigurationQuery } from '@/store/apis/tmdb';
import { TmdbImageAspectRatios, TmdbImageTypes } from '..';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';

export default function useGetImageSize({ type }) {
  // Get configuration from redux data
  const { data: configuration } = useGetConfigurationQuery();

  const { isWidthLg } = useBreakpoints();

  // Find number in string, return -1 if no number exists in string
  const stringToNumber = (string) => {
    const match = string.match(/[0-9]+/);
    if (match.length == 1) {
      return parseInt(match[0]);
    } else {
      return -1;
    }
  };

  // Get minimum required image sizs for different types
  const imageMinSize = useMemo(() => {
    if (type === TmdbImageTypes.backdrop) {
      return isWidthLg ? 1200 : 780;
    }
    return isWidthLg ? 300 : 150;
  }, [isWidthLg, type]);

  // In format of 'w500', 'h632' ...
  const imageSizePath = useMemo(() => {
    const images = _get(configuration, 'images', {});
    if (_isEmpty(images)) return '';
    const sizes = _get(images, `${type}_sizes`, []);
    return _find(sizes, (size) => stringToNumber(size) >= imageMinSize);
  }, [type, configuration, imageMinSize]);

  // Get image width by content of imageSizePath
  const imageWidth = useMemo(() => {
    if (imageSizePath.startsWith('w')) {
      return stringToNumber(imageSizePath);
    } else if (imageSizePath.startsWith('h')) {
      return stringToNumber(imageSizePath) / TmdbImageAspectRatios[type];
    } else if (imageSizePath === 'original') {
      return 3000;
    }
    return 0;
  }, [imageSizePath]);

  // Get image height by content of imageSizePath
  const imageHeight = useMemo(() => {
    if (imageSizePath.startsWith('w')) {
      return stringToNumber(imageSizePath) * TmdbImageAspectRatios[type];
    } else if (imageSizePath.startsWith('h')) {
      return stringToNumber(imageSizePath);
    } else if (imageSizePath === 'original') {
      return 2000;
    }
    return 0;
  }, [imageSizePath]);

  return {
    imageSizePath,
    imageWidth,
    imageHeight,
  };
}
