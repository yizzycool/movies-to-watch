import styles from './index.module.scss';
import { useGetGenreListsQuery } from '@/store/apis/tmdb';
import _map from 'lodash/map';
import _includes from 'lodash/includes';

export default function GenresBlock({ selectedGenres, updateSelectedGenres }) {
  const { data } = useGetGenreListsQuery();
  const { genres = [] } = data || {};

  const isActive = (name) => _includes(selectedGenres, name);

  return (
    <div className="mt-4">
      <div className="fs-5 fw-bold mb-2">Genres</div>
      <div className={styles.genres}>
        {_map(genres, (genre) => (
          <div
            key={genre.id}
            className={isActive(genre.name) ? styles.genreActive : styles.genre}
            onClick={() => updateSelectedGenres(genre.name)}
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
}
