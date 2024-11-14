import { initializeApp } from 'firebase/app';
import { getAuth, AuthErrorCodes } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const USER_CANCELLED = [
  AuthErrorCodes.POPUP_CLOSED_BY_USER,
  AuthErrorCodes.REDIRECT_CANCELLED_BY_USER,
  AuthErrorCodes.USER_CANCELLED,
  AuthErrorCodes.EXPIRED_POPUP_REQUEST,
];

const firebaseUtils = {
  isUserCancelled: (error) => USER_CANCELLED.includes(error),
};

export default firebaseUtils;
