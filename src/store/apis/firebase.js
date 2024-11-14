import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import firebaseUtils, { auth } from '@/utils/firebase-utils';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { initUser, updateUser } from '@/store/user-slice';

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
  }),
});

export const { useLazySignInQuery, useLazySignOutQuery } = firebaseApi;
