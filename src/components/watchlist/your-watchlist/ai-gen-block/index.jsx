import styles from './index.module.scss';

export default function AiGenBlock({ onClick }) {
  return (
    <div
      className={`col-6 col-sm-4 col-md-3 col-lg-2 ${styles.container}`}
      onClick={onClick}
    >
      <div
        className="position-relative ratio rounded bg-secondary-subtle"
        style={{
          '--bs-aspect-ratio': '150%',
          '--bs-bg-opacity': '0.3',
        }}
      >
        <div className="d-flex flex-column justify-content-center align-items-center ">
          <i className={`bi bi-magic h-25 ${styles.magicBar}`} />
          <div className="mt-2 px-2 fw-bold">Try our AI recommendation?</div>
        </div>
      </div>
      <div className="mt-2 rounded"></div>
    </div>
  );
}
