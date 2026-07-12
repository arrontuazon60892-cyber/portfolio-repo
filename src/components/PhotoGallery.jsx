import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import galleryImage from "../assets/gallary/gallary.webp";
import galleryImage1 from "../assets/gallary/gallary1.webp";
import galleryImage2 from "../assets/gallary/gallary2.webp";
import galleryImage3 from "../assets/gallary/gallary3.webp";

const galleryImages = [
  { src: galleryImage, alt: "Student team outside a campus building" },
  { src: galleryImage1, alt: "Student team presenting a software project" },
  { src: galleryImage2, alt: "Student development team after a presentation" },
  { src: galleryImage3, alt: "Student project group portrait" },
];

export default function PhotoGallery({ onOpenImage }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="photo-gallery-arrow photo-gallery-arrow--left"
        aria-label="Scroll gallery left"
      >
        <ChevronLeft size={18} />
      </button>

      <div ref={scrollRef} className="photo-gallery-track">
        {galleryImages.map((image) => (
          <button
            key={image.src}
            type="button"
            className="photo-gallery-item"
            onClick={() => onOpenImage({ src: image.src, title: image.alt })}
            aria-label={`Open ${image.alt}`}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        className="photo-gallery-arrow photo-gallery-arrow--right"
        aria-label="Scroll gallery right"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
