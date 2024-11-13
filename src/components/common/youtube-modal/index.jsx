export default function YoutubeModal({ src }) {
  return (
    <div id="youtube-modal" className="modal">
      <div
        className="modal-dialog modal-dialog-centered"
        style={{ '--bs-modal-width': '75%' }}
      >
        <div
          className="modal-content ratio overflow-hidden"
          style={{ '--bs-aspect-ratio': '56.25%' }}
        >
          {!!src && (
            <iframe
              className="w-100 h-100"
              src={src}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            />
          )}
        </div>
      </div>
    </div>
  );
}
