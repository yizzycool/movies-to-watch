import variables from '@/styles/breakpoints.module.scss';
import { useMemo } from 'react';
import useWindowSize from './use-window-size';

export default function useBreakpoints() {
  const { width } = useWindowSize();

  const isWidthSm = useMemo(() => {
    return width > parseInt(variables['width-sm']);
  }, [width]);

  const isWidthMd = useMemo(() => {
    return width > parseInt(variables['width-md']);
  }, [width]);

  const isWidthLg = useMemo(() => {
    return width > parseInt(variables['width-lg']);
  }, [width]);

  const isWidthXl = useMemo(() => {
    return width > parseInt(variables['width-xl']);
  }, [width]);

  const isWidthXxl = useMemo(() => {
    return width > parseInt(variables['width-xxl']);
  }, [width]);

  return {
    isWidthSm,
    isWidthMd,
    isWidthLg,
    isWidthXl,
    isWidthXxl,
  };
}
