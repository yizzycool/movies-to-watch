import GenresBlock from './genres-block';
import MoodBlock from './mood-block';
import _xor from 'lodash/xor';

export default function UserChoiceModal({
  userSelection,
  setUserSelection,
  startAiRecommendation,
}) {
  const { selectedGenres, currentMoods } = userSelection;

  const updateSelectedGenres = (id) => {
    const nextSelectedGenres = _xor(selectedGenres, [id]);
    setUserSelection((prev) => ({
      ...prev,
      selectedGenres: nextSelectedGenres,
    }));
  };

  const updateCurrentMoods = (mood) => {
    const nextCurrentMoods = _xor(currentMoods, [mood]);
    setUserSelection((prev) => ({
      ...prev,
      currentMoods: nextCurrentMoods,
    }));
  };

  return (
    <div className="modal fade" id="user-choice-modal">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Before Starting AI Recommendation
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-start">
            <div className="fw-bold">
              Select the tags that best match your current preferences
            </div>
            <GenresBlock
              selectedGenres={selectedGenres}
              updateSelectedGenres={updateSelectedGenres}
            />
            <MoodBlock
              currentMoods={currentMoods}
              updateCurrentMoods={updateCurrentMoods}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={startAiRecommendation}
            >
              Start AI Recommendation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
