import styles from './index.module.scss';

export default function Prologue() {
  return (
    <div
      className="w-100 d-flex flex-column justify-content-center align-items-center overflow-hidden"
      style={{ cursor: 'pointer' }}
      data-bs-toggle="modal"
      data-bs-target="#user-choice-modal"
    >
      <div className={styles.gradientText}>
        <i className="bi bi-film fs-2" />
        <i className="bi bi-stars fs-4" />
      </div>
      <div className="mt-2 px-2 fw-bold">Try our AI recommendation?</div>
    </div>
  );
}
