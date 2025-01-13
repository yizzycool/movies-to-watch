import TmdbImage from '@/components/common/tmdb-image';
import TmdbMovieHoverMask from './mask';
import styles from './index.module.css';
/**
 * @typedef {keyof import('@/components/common/tmdb-image')['TmdbImageTypes']} TmdbImageTypes
 * @typedef {Object} TmdbMovieCardProps
 * @property {object} result
 * @property {string} linkTo
 * @property {string} path
 * @property {Function} onClick
 * @property {TmdbImageTypes} type
 */
export default function TmdbMovieCard(
  /**
   * @type {TmdbMovieCardProps}
   */
  { result, linkTo, path, type, onClick },
) {
  return (
    <div className={styles.card} style={{ '--bs-aspect-ratio': '150%' }}>
      <TmdbImage linkTo={linkTo} path={path} type={type} />
      <TmdbMovieHoverMask result={result} onClick={onClick} />
    </div>
  );
}
