import styles from './index.module.scss';
import { useGetGenreListsQuery } from '@/store/apis/tmdb';
import _map from 'lodash/map';
import _includes from 'lodash/includes';

export default function GenresBlock({ selectedGenres, updateSelectedGenres }) {
  const { data } = useGetGenreListsQuery();
  const { genres = [] } = data || {};

  const isActive = (id) => _includes(selectedGenres, id);

  return (
    <div className="mt-4">
      <div className="fs-5 fw-bold mb-2">Genres</div>
      <div className={styles.genres}>
        {_map(genres, (genre) => (
          <div
            key={genre.id}
            className={isActive(genre.id) ? styles.genreActive : styles.genre}
            onClick={() => updateSelectedGenres(genre.id)}
          >
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
}
