// WorkCard component - displays individual work item in grid
import { useEffect, useRef } from "react";
import type { Work } from "../../data/works";

interface WorkCardProps {
  work: Work;
  index: number;
  onClick: () => void;
}

// Different parallax configurations for variety
const parallaxConfigs = [
  { range: 35, speed: 1.2, aspectRatio: "3/4", imageHeight: 160 }, // index 0: portrait
  { range: 40, speed: 0.9, aspectRatio: "16/9", imageHeight: 150 }, // index 1: wide landscape
  { range: 30, speed: 1.4, aspectRatio: "1/1", imageHeight: 145 }, // index 2: square
  { range: 38, speed: 1.0, aspectRatio: "4/3", imageHeight: 155 }, // index 3: classic
  { range: 32, speed: 1.3, aspectRatio: "5/4", imageHeight: 148 }, // index 4: near square
  { range: 42, speed: 0.8, aspectRatio: "21/9", imageHeight: 165 }, // index 5: ultra wide
];

export function WorkCard({ work, index, onClick }: WorkCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config = parallaxConfigs[index % parallaxConfigs.length];
    const { range, speed, aspectRatio, imageHeight } = config;

    // Set aspect ratio for this specific card
    if (cardRef.current) {
      const imageContainer = cardRef.current.querySelector(
        ".work-card-image"
      ) as HTMLElement;
      if (imageContainer) {
        imageContainer.style.aspectRatio = aspectRatio;
      }
    }

    // Set image height
    if (imageRef.current) {
      imageRef.current.style.height = `${imageHeight}%`;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!imageRef.current || !cardRef.current) return;

          const card = cardRef.current;
          const image = imageRef.current;
          const rect = card.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Calculate if card is in viewport
          if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate scroll progress (0 to 1)
            const scrollProgress =
              (windowHeight - rect.top) / (windowHeight + rect.height);
            // Apply different range and speed based on index
            const startPos = -range;
            const translateY = startPos + scrollProgress * range * speed;
            image.style.transform = `translateY(${translateY}%)`;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="work-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${work.title}`}
    >
      <div className="work-card-image">
        <img
          ref={imageRef}
          src={work.thumbnail}
          alt={work.title}
          loading="lazy"
        />
        <div className="work-overlay">
          <span className="overlay-text">View</span>
        </div>
      </div>
      <div className="work-card-info">
        <h3 className="work-title">{work.title}</h3>
        <div className="work-meta">
          <span className="work-type">{work.type}</span>
          <span className="work-year">{work.year}</span>
        </div>
      </div>
    </div>
  );
}
