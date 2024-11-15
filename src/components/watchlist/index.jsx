import styles from './index.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetMovieDetailsQuery } from '@/store/apis/tmdb';
import TmdbImage, { TmdbImageTypes } from '@/components/common/tmdb-image';
import TmdbVideoRatingStar from '@/components/common/tmdb-video-rating-star';
import TmdbGenreTag from '@/components/common/tmdb-genre-tag';
import LoadingSkeleton from './loading-skeleton';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _indexOf from 'lodash/indexOf';
import _size from 'lodash/size';
import _isNull from 'lodash/isNull';
import _range from 'lodash/range';

export default function Watchlist() {
  // Show video info when user hovering
  const [hovering, setHovering] = useState(false);
  // Data for search results (might increase since infinte scroll)
  const [fetchedData, setFetchedData] = useState([]);

  const watchlist = useSelector((state) => state.user.watchlist);

  const [trigger, result] = useLazyGetMovieDetailsQuery();
  const { data } = result;

  const skeletonSize = useMemo(() => {
    return _size(watchlist) - _size(fetchedData);
  }, [fetchedData, watchlist]);

  // Loop call API after mounted
  useEffect(() => {
    if (_isEmpty(watchlist)) return;
    // Get id of last queried data
    const lastId = _get(data, 'id', null);
    if (_isNull(lastId)) {
      trigger({ id: watchlist[0] });
    } else {
      const lastIndex = _indexOf(watchlist, lastId);
      if (lastIndex === -1) return;
      // If is last one then return
      if (lastIndex === _size(watchlist) - 1) return;
      trigger({ id: _get(watchlist, lastIndex + 1) });
    }
  }, [data]);

  // update data
  useEffect(() => {
    if (_isEmpty(data)) return;
    setFetchedData((prev) => [...prev, data]);
  }, [data]);

  const getMovieId = (result) => _get(result, 'id', null);

  const getPosterPath = (result) => _get(result, 'poster_path', '');

  const getGenreIds = (result) => _get(result, 'genre_ids', []);

  const onPointerEnter = (idx) => setHovering(idx);

  const onPointerOut = () => setHovering(false);

  return (
    <div className="container-xl text-center">
      {_isEmpty(fetchedData) ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="fs-3 mt-5">Your Watch List</div>
          {/* <div className="fs-4 mt-2 text-info">{query}</div> */}
          <div className="row gx-3 gy-3 my-5">
            {fetchedData.map((result, idx) => (
              <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div
                  className="position-relative ratio"
                  style={{ '--bs-aspect-ratio': '150%' }}
                  onPointerEnter={() => onPointerEnter(idx)}
                  onPointerOut={onPointerOut}
                >
                  <TmdbImage
                    linkTo={`/movie?id=${getMovieId(result)}`}
                    path={getPosterPath(result)}
                    type={TmdbImageTypes.poster}
                  />
                  <div
                    className={
                      hovering === idx ? styles.maskHovering : styles.mask
                    }
                  >
                    <TmdbVideoRatingStar
                      rating={_get(result, 'vote_average')}
                      voteCount={_get(result, 'vote_count')}
                    />
                    <div className="my-2" />
                    <TmdbGenreTag genreIds={getGenreIds(result)} />
                  </div>
                </div>
                <div className="fw-bold mt-2">
                  {_get(result, 'original_title')}
                </div>
              </div>
            ))}
            {_range(skeletonSize).map((idx) => (
              <div
                key={idx}
                className="col-6 col-sm-4 col-md-3 col-lg-2 placeholder-glow"
              >
                <div
                  className="position-relative ratio placeholder rounded"
                  style={{ '--bs-aspect-ratio': '150%' }}
                  onPointerEnter={() => onPointerEnter(idx)}
                  onPointerOut={onPointerOut}
                />
                <div className="fw-bold mt-2 placeholder col-10  rounded" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
