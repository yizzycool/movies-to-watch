import '@/styles/globals.css';
import '@/styles/loading-skeleton.css';
import '@/styles/custom-bootstrap.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss';
import { useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function App({ Component, pageProps }) {
  // import bootstrap js library
  useEffect(() => {
    const bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
    window.bootstrap = bootstrap;
  }, []);

  return (
    <>
      <Head>
        <title>Movies to Watch</title>
        <meta
          name="description"
          content="Looking for a movie to watch? Movies to Watch offers the latest movie recommendations, search by genre, ratings, and reviews to help you discover great films for any mood!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.png" />
      </Head>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}