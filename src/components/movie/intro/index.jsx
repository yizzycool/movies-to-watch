import moment from 'moment';
import { useMemo } from 'react';
import LoadingSkeleton from './loading-skeleton';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbVideoRatingStar from '@/components/common/tmdb-video-rating-star';
import FavoriteButton from '@/components/common/favorite-button';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _join from 'lodash/join';
import _isEmpty from 'lodash/isEmpty';
import _slice from 'lodash/slice';

export default function Intro({ data, isFetching }) {
  // Function that return value of key from data if exists. Otherwise return defaultValue.
  const getValue = (key, defaultValue = null) => {
    return _get(data, key, defaultValue);
  };

  // Ex: 2024-11-12 => 2024
  const releaseYear = useMemo(() => {
    const releaseDate = getValue('release_date');
    if (!releaseDate) return '';
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
      { title: 'Genres', data: _join(genres, ', ') || '-' },
      { title: 'Country', data: country || '-' },
      { title: 'Language', data: _join(spokenLanguages, ', ') || '-' },
      { title: 'Popularity', data: popularity || '-' },
    ];
  }, [data]);

  const keywords = useMemo(() => {
    return _slice(_get(data, 'keywords.keywords', []), 0, 5);
  }, [data]);

  if (isFetching || _isEmpty(data)) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container-fluid position-relative overflow-hidden">
      <div className="position-absolute w-100 h-100 z-n1 top-0 start-50 translate-middle-x opacity-25">
        <TmdbImage
          path={getValue('backdrop_path')}
          type={TmdbImageTypes.backdrop}
          emptyContent=""
        />
      </div>
      <div className="container-xl py-5">
        <div className="d-flex align-items-start">
          <div
            className="flex-shrink-1 w-25 rounded overflow-hidden ratio"
            style={{ '--bs-aspect-ratio': '150%' }}
          >
            <TmdbImage
              path={getValue('poster_path')}
              type={TmdbImageTypes.poster}
            />
          </div>
          <div className="w-75 ps-5">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fs-2 fw-bold">{getValue('original_title')}</h1>
              <FavoriteButton id={getValue('id')} />
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center">
              {!!releaseYear && (
                <>
                  <div>{releaseYear}</div>
                  <i className="bi bi-dot d-none d-sm-block"></i>
                </>
              )}
              {!!getValue('vote_count') && (
                <TmdbVideoRatingStar
                  rating={getValue('vote_average')}
                  voteCount={getValue('vote_count')}
                  stringInNewLine={false}
                />
              )}
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
            {!_isEmpty(keywords) && (
              <div className="mt-5 d-flex align-items-center flex-wrap">
                {keywords.map((keyword) => (
                  <div
                    key={keyword.id}
                    className="badge text-bg-secondary me-2 mb-2"
                  >
                    {keyword.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
