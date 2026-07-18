export default function GraphicDesignGrid({ items }) {
  if (!items?.length) {
    return <p className="media-grid-empty">No graphic design images found.</p>;
  }

  return (
    <div className="graphic-design-grid">
      {items.map((item, index) => (
        <a
          key={item.id || item.src || index}
          className="graphic-design-card"
          href={item.src}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${item.title || `graphic design ${index + 1}`}`}
        >
          <img
            src={item.src}
            alt={item.title || `Graphic design ${index + 1}`}
            loading="eager"
            decoding="sync"
            draggable="false"
          />
          <span>{item.title || `Graphic design ${index + 1}`}</span>
        </a>
      ))}
    </div>
  );
}
