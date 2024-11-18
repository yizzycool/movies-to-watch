import { useGetGenreListsQuery } from '@/store/apis/tmdb';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _slice from 'lodash/slice';

export default function TmdbGenreTag({ genreIds = [] }) {
  // Get genre lists
  const { data } = useGetGenreListsQuery();
  const genres = _get(data, 'genres', {});

  // Transform genre_id to it's name
  const getGenreName = (id) => {
    const data = _find(genres, (genre) => genre.id === id);
    if (!data) return null;
    return _get(data, 'name', '');
  };

  return (
    <div className="w-100 d-flex flex-wrap justify-content-center">
      {_slice(genreIds, 0, 5).map((id) => (
        <div
          key={id}
          className="badge text-bg-secondary m-1"
          style={{ fontSize: '12px' }}
        >
          {getGenreName(id)}
        </div>
      ))}
    </div>
  );
}
