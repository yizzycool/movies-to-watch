import moment from 'moment';
import { useLazyGetMovieDetailsQuery } from '@/store/apis/tmdb';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import LoadingSkeleton from './loading-skeleton';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbVideoRatingStar from '@/components/common/tmdb-video-rating-star';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _join from 'lodash/join';
import _isEmpty from 'lodash/isEmpty';

export default function Intro() {
  const router = useRouter();
  const id = router.query?.id || null;

  const [trigger, result] = useLazyGetMovieDetailsQuery();
  const { data, isLoading } = result;

  // Call API when 'id' detected
  useEffect(() => {
    if (!id) return;
    trigger({ id });
  }, [trigger, id]);

  // Function that return value of key from data if exists. Otherwise return defaultValue.
  const getValue = (key, defaultValue = null) => {
    return _get(data, key, defaultValue);
  };

  // Ex: 2024-11-12 => 2024
  const releaseYear = useMemo(() => {
    const releaseDate = getValue('release_date');
    const releaseYear = moment(releaseDate).format('YYYY');
    return releaseYear;
  }, [data]);

  // [Genres, Country, Spoken Languages, Popularity]
  const infoDetails = useMemo(() => {
    const genresArray = getValue('genres', []);
    const genres = _map(genresArray, (genre) => _get(genre, 'name'));
    const country = getValue('origin_country');
    const spokenLanguages = _map(getValue('spoken_languages', []), (lang) =>
      _get(lang, 'name'),
    );
    const popularity = getValue('popularity');
    return [
      { title: 'Genres', data: _join(genres, ', ') },
      { title: 'Country', data: country },
      { title: 'Language', data: _join(spokenLanguages, ', ') },
      { title: 'Popularity', data: popularity },
    ];
  }, [data]);

  if (isLoading || _isEmpty(data)) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container-fluid position-relative overflow-hidden">
      <div className="position-absolute w-100 h-100 z-n1 top-0 start-50 translate-middle-x opacity-25">
        <TmdbImage
          path={getValue('backdrop_path')}
          type={TmdbImageTypes.backdrop}
        />
      </div>
      <div className="container-xl py-5">
        <div className="d-flex align-items-start">
          <div className="flex-shrink-1 w-25">
            <TmdbImage
              path={getValue('poster_path')}
              type={TmdbImageTypes.poster}
            />
          </div>
          <div className="w-75 ps-5">
            <h1 className="fs-2 fw-bold">{getValue('original_title')}</h1>
            <div className="d-flex">
              <div>{releaseYear}</div>
              <i className="bi bi-dot"></i>
              <TmdbVideoRatingStar
                rating={getValue('vote_average')}
                voteCount={getValue('vote_count')}
                stringInNewLine={false}
              />
            </div>
            <div className="my-5">
              {infoDetails.map((info, idx) => (
                <div key={idx} className="my-1">
                  <span className="text-body-tertiary">{info.title}</span>
                  &emsp;
                  {info.data}
                </div>
              ))}
            </div>
            <div className="mt-3">{getValue('overview')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
