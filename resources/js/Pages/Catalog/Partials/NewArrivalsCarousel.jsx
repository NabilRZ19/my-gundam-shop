import { useState } from "react";
import CatalogCard from "./CatalogCard";

export default function NewArrivalsCarousel({ newArrivals, added, handleAdd }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const next = () => {
    if (currentIndex < newArrivals.length - itemsPerPage) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="cat-carousel-wrap">
      {newArrivals.length > 0 ? (
        <div className="cat-carousel-container">
          <button
            className="cat-carousel-btn left"
            onClick={prev}
            disabled={currentIndex === 0}
          >
            &#10094;
          </button>
          
          <div className="cat-carousel-viewport">
            <div
              className="cat-carousel-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {newArrivals.map((p) => (
                <div className="cat-carousel-item" key={p.id}>
                  <CatalogCard
                    p={p}
                    isAdded={added[p.id]}
                    onAdd={handleAdd}
                    compact
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="cat-carousel-btn right"
            onClick={next}
            disabled={currentIndex >= newArrivals.length - itemsPerPage}
          >
            &#10095;
          </button>
        </div>
      ) : (
        <div className="cat-empty">No new arrivals yet.</div>
      )}
    </div>
  );
}
