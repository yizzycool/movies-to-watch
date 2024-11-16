import styles from './index.module.scss';
import _map from 'lodash/map';
import _includes from 'lodash/includes';

// Hardcode 20 types of moods
const Moods = [
  'Happy',
  'Excited',
  'Relaxed',
  'Content',
  'Melancholic',
  'Sad',
  'Anxious',
  'Nervous',
  'Angry',
  'Calm',
  'Thrilled',
  'Touched',
  'Romantic',
  'Nostalgic',
  'Tired',
  'Confused',
  'Confident',
  'Motivated',
  'Lonely',
  'Curious',
];

export default function MoodBlock({ currentMoods, updateCurrentMoods }) {
  const isActive = (id) => _includes(currentMoods, id);

  return (
    <div className="mt-4">
      <div className="fs-5 fw-bold mb-2">Moods</div>
      <div className={styles.moods}>
        {_map(Moods, (mood) => (
          <div
            key={mood}
            className={isActive(mood) ? styles.moodActive : styles.mood}
            onClick={() => updateCurrentMoods(mood)}
          >
            {mood}
          </div>
        ))}
      </div>
    </div>
  );
}
