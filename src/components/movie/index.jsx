import Intro from './intro';
import Cast from './cast';
import Trailer from './trailer';

export default function Movie() {
  return (
    <>
      <Intro />
      <Cast />
      <Trailer />
      {/* TODO: add more contents */}
    </>
  );
}
