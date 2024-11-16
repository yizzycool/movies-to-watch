import styles from './index.module.scss';
import { useMemo, useState } from 'react';
import TmdbGenreTag from '../tmdb-genre-tag';
import TmdbVideoRatingStar from '../tmdb-video-rating-star';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _map from 'lodash/map';

export default function TmdbMovieHoverMask({ result, onClick = () => {} }) {
  const [hovering, setHovering] = useState(false);

  const genreIds = useMemo(() => {
    // Data format for API /movie/${id}
    if (_has(result, 'genres')) {
      return _map(_get(result, 'genres'), (genre) => _get(genre, 'id'));
    }
    // Data format for API /search/movie?query=${query}
    return _get(result, 'genre_ids', []);
  }, [result]);

  const onPointerEnter = () => setHovering(true);

  const onPointerOut = () => setHovering(false);

  return (
    <div
      className={hovering ? styles.maskHovering : styles.mask}
      onPointerEnter={onPointerEnter}
      onPointerOut={onPointerOut}
      onClick={onClick}
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
