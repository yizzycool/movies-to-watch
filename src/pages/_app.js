import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Looking for a movie to watch? Movies to Watch offers the latest movie recommendations, search by genre, ratings, and reviews to help you discover great films for any mood!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
