import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWatchlist } from '@/store/user-slice';
import { db } from '@/utils/firebase-utils';
import { ref, onValue, child } from 'firebase/database';

export default function useRealtimeDatabaseMonitor() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { isSignInUser, uid } = user;

  useEffect(() => {
    if (!isSignInUser) return;
    const dbRef = ref(db);
    const watchlistRef = child(dbRef, `users/${uid}/watchlist`);
    const unsubscribe = onValue(watchlistRef, (snapshot) => {
      const watchlist = snapshot.val() || [];
      dispatch(updateWatchlist({ watchlist }));
    });

    return () => {
      // Unsubscribe when user signed out
      unsubscribe();
    };
  }, [isSignInUser, uid]);
}
