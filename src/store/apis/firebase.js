import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import firebaseUtils, { auth, db } from '@/utils/firebase-utils';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { ref, get, child, update } from 'firebase/database';
import { initUser, updateUser } from '@/store/user-slice';
import _xor from 'lodash/xor';
import _get from 'lodash/get';

export const firebaseApi = createApi({
  reducerPath: 'firebaseApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    // Firebase Authentication: sign in
    signIn: builder.query({
      async queryFn(_args, { dispatch }) {
        try {
          const googleProvider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, googleProvider);
          const { user } = result;
          const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            accessToken: user.accessToken,
            photoUrl: user.photoURL,
            isSignInUser: true,
          };
          // Set 'user' redux
          dispatch(updateUser(data));
          return { data };
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          const isUserCancelled = firebaseUtils.isUserCancelled(errorCode);
          return { error: { errorCode, errorMessage, isUserCancelled } };
        }
      },
    }),
    // Firebase Authentication: sign out
    signOut: builder.query({
      async queryFn(_args, { dispatch }) {
        try {
          await signOut(auth);
          dispatch(initUser());
          return { data: 'Signed out successfully' };
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          return { error: { errorCode, errorMessage } };
        }
      },
    }),
    // Firebase Realtime Database: get user data
    getData: builder.query({
      async queryFn(args) {
        try {
          const { uid } = args;
          const dbRef = ref(db);
          // Create reference: users/{uid}
          const userRef = child(dbRef, `users/${uid}`);
          const snapshot = await get(userRef);
          // Check if exists
          if (snapshot.exists()) {
            return { data: snapshot.val() };
          } else {
            return { data: null };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
    // Firebase Realtime Database: update
    updateWatchlist: builder.query({
      async queryFn(args) {
        try {
          const { uid, id } = args;
          const dbRef = ref(db);
          // Create reference: users/{uid}
          const userRef = child(dbRef, `users/${uid}`);
          const snapshot = await get(userRef);
          let watchlist = [id];
          // Update watchlist (either add or remove, implement with _xor)
          if (snapshot.exists()) {
            const prevWatchlist = _get(snapshot.val(), 'watchlist', []);
            watchlist = _xor(prevWatchlist, [id]);
          }
          await update(userRef, { watchlist });
          return { data: 'update watchlist successfully' };
        } catch (error) {
          return { error };
        }
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useLazySignInQuery,
  useLazySignOutQuery,
  useLazyGetDataQuery,
  useLazyUpdateWatchlistQuery,
} = firebaseApi;
