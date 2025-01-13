import styles from './index.module.css';
import { useMemo } from 'react';
import TmdbGenreTag from '@/components/common/tmdb-genre-tag';
import TmdbVideoRatingStar from '@/components/common/tmdb-video-rating-star';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _map from 'lodash/map';

export default function TmdbMovieHoverMask({ result, onClick = () => {} }) {
  const genreIds = useMemo(() => {
    // Data format for API /movie/${id}
    if (_has(result, 'genres')) {
      return _map(_get(result, 'genres'), (genre) => _get(genre, 'id'));
    }
    // Data format for API /search/movie?query=${query}
    return _get(result, 'genre_ids', []);
  }, [result]);

  return (
    <div
      className={styles.mask}
      onClick={onClick}
      data-testid="tmdb-movie-hover-mask"
    >
      <TmdbVideoRatingStar
        rating={_get(result, 'vote_average')}
        voteCount={_get(result, 'vote_count')}
      />
      <div className="my-2" />
      <TmdbGenreTag genreIds={genreIds} />
    </div>
  );
}
