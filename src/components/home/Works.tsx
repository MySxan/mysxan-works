// Works section component - showcases work experience and portfolio items
import { useState, useEffect, useRef } from "react";
import { Section } from "../ui/Section";
import { WorkCard } from "../ui/WorkCard";
import { Modal } from "../ui/Modal";
import type { Work } from "../../data/works";
import { works } from "../../data/works";

export function Works() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layoutMasonry = () => {
      if (!gridRef.current) return;

      const grid = gridRef.current;
      const items = Array.from(grid.children) as HTMLElement[];
      const gap = 48; // var(--space-4) = 3rem = 48px
      const columns = 3;
      const columnWidth = (grid.offsetWidth - gap * (columns - 1)) / columns;
      const columnHeights = new Array(columns).fill(0);

      items.forEach((item) => {
        // Find shortest column
        const shortestColumn = columnHeights.indexOf(
          Math.min(...columnHeights)
        );

        // Position item
        item.style.position = "absolute";
        item.style.width = `${columnWidth}px`;
        item.style.left = `${shortestColumn * (columnWidth + gap)}px`;
        item.style.top = `${columnHeights[shortestColumn]}px`;

        // Update column height
        columnHeights[shortestColumn] += item.offsetHeight + gap;
      });

      // Set grid height
      grid.style.height = `${Math.max(...columnHeights) - gap}px`;
    };

    // Layout after images load and on resize
    const handleResize = () => {
      setTimeout(layoutMasonry, 100);
    };

    // Initial layout with delay to ensure images are measured
    setTimeout(layoutMasonry, 500);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Section id="works" title="Works" className="works-section">
        <div ref={gridRef} className="works-grid">
          {works.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              index={index}
              onClick={() => setSelectedWork(work)}
            />
          ))}
        </div>
      </Section>

      {selectedWork && (
        <Modal
          isOpen={!!selectedWork}
          onClose={() => setSelectedWork(null)}
          title={selectedWork.title}
          externalLink={{
            url: selectedWork.url,
            label: "View Full Project",
          }}
        >
          <img
            src={selectedWork.thumbnail}
            alt={selectedWork.title}
            className="modal-image"
          />
          <div className="modal-details">
            <p>
              <strong>Type:</strong> {selectedWork.type}
            </p>
            <p>
              <strong>Year:</strong> {selectedWork.year}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
