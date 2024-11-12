import _round from 'lodash/round';
import _range from 'lodash/range';

const BASE = 5;

export default function TmdbVideoRatingStar({
  rating = 0,
  base = 10,
  voteCount = 0,
  showString = true,
  stringInNewLine = true,
}) {
  // Transform to format of 'x / 5'
  const transRating = _round((rating * BASE) / base, 1);
  // Get amount of full star
  const fullStar = Math.floor(transRating);
  // Get amount of half star
  const decimalPoint = transRating - fullStar;
  const halfStar = decimalPoint >= 0.3 && decimalPoint <= 0.7 ? 1 : 0;
  // Get amount of empty star
  const emptyStar = BASE - fullStar - halfStar;

  return (
    <div>
      {_range(fullStar).map((idx) => (
        <i key={idx} className="bi bi-star-fill text-warning me-1" />
      ))}
      {_range(halfStar).map((idx) => (
        <i key={idx} className="bi bi-star-half text-warning me-1" />
      ))}
      {_range(emptyStar).map((idx) => (
        <i key={idx} className="bi bi-star me-1" />
      ))}
      {showString && (
        <div className={!stringInNewLine ? 'd-inline' : ''}>
          {_round(rating, 1)}
          {'/'}
          {base}{' '}
          {voteCount > 0 && (
            <span className="text-body-tertiary">({voteCount})</span>
          )}
        </div>
      )}
    </div>
  );
}
