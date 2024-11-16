import Prologue from './prologue';
import UserChoiceModal from './user-choice-modal';

export default function AiGenBlock({
  userSelection,
  setUserSelection,
  startAiRecommendation,
}) {
  return (
    <>
      <div className="col-6 col-sm-4 col-md-3 col-lg-2">
        <div
          className="position-relative ratio rounded bg-secondary-subtle overflow-hidden"
          style={{
            '--bs-aspect-ratio': '150%',
            '--bs-bg-opacity': '0.3',
          }}
        >
          <Prologue />
        </div>
        <div className="mt-2 rounded"></div>
      </div>
      <UserChoiceModal
        userSelection={userSelection}
        setUserSelection={setUserSelection}
        startAiRecommendation={startAiRecommendation}
      />
    </>
  );
}
