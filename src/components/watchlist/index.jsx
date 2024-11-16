import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetMovieDetailsQuery } from '@/store/apis/tmdb';
import YourWatchlist from './your-watchlist';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _indexOf from 'lodash/indexOf';
import _size from 'lodash/size';
import _isNull from 'lodash/isNull';

export default function Watchlist() {
  // Data for search results (might increase since infinte scroll)
  const [fetchedData, setFetchedData] = useState([]);
  const [userSelection, setUserSelection] = useState({
    selectedGenres: [],
    currentMoods: [],
  });

  const aiRef = useRef(null);

  // Get watchlist from redux
  const watchlist = useSelector((state) => state.user.watchlist);

  const [trigger, result] = useLazyGetMovieDetailsQuery();
  const { data } = result;

  // TODO: use batch query to get movie details
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

  const triggerAiRecommendation = () => {
    aiRef?.current?.start?.();
  };

  return (
    <>
      <YourWatchlist
        fetchedData={fetchedData}
        userSelection={userSelection}
        setUserSelection={setUserSelection}
        startAiRecommendation={triggerAiRecommendation}
      />
    </>
  );
}
