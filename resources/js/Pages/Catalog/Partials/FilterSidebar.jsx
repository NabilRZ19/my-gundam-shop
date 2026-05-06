import { useState } from "react";

const GRADE_COLORS = {
  HG: { bg: "#005CB9", color: "#fff" },
  RG: { bg: "#1A7A3A", color: "#fff" },
  MG: { bg: "#C8970A", color: "#fff" },
  PG: { bg: "#C0392B", color: "#fff" },
  FM: { bg: "#6D28D9", color: "#fff" },
  SD: { bg: "#0891B2", color: "#fff" },
  MGSD: { bg: "#0891B2", color: "#fff" },
};

export default function FilterSidebar({ gradeOptions, seriesOptions, filters, onApply }) {
  const [localGrades, setLocalGrades] = useState(filters.grades || []);
  const [localOriginalities, setLocalOriginalities] = useState(filters.originality || []);
  const [localSeries, setLocalSeries] = useState(filters.series || "");
  const [minPrice, setMinPrice] = useState(filters.min_price || "");
  const [maxPrice, setMaxPrice] = useState(filters.max_price || "");

  const originalityOptions = ['Bandai Original', 'PBandai', 'Bootleg', 'Third-Party'];

  const toggleGrade = (g) =>
    setLocalGrades((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const toggleOriginality = (o) =>
    setLocalOriginalities((prev) =>
      prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]
    );

  const handleApply = () => {
    onApply({
      grades: localGrades,
      originality: localOriginalities,
      series: localSeries ? [localSeries] : [], // passing as array for backend compatibility or change backend to handle string
      min_price: minPrice || undefined,
      max_price: maxPrice || undefined,
    });
  };

  const handleReset = () => {
    setLocalGrades([]);
    setLocalOriginalities([]);
    setLocalSeries("");
    setMinPrice("");
    setMaxPrice("");
    onApply({});
  };

  return (
    <aside className="cat-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-title-wrap">
          <span className="section-eyebrow">◆ Filter</span>
          <h3 className="sidebar-title">Refine Search</h3>
        </div>
        <button className="sidebar-reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Grade filter */}
      <div className="filter-group">
        <div className="filter-group-label">Grade</div>
        {gradeOptions.map((g) => (
          <label key={g} className="filter-check">
            <input
              type="checkbox"
              checked={localGrades.includes(g)}
              onChange={() => toggleGrade(g)}
            />
            <span className="filter-check-box" />
            <span className="filter-check-label">{g}</span>
            <span
              className="filter-grade-pip"
              style={{ background: GRADE_COLORS[g]?.bg || "#4A4F5E" }}
            />
          </label>
        ))}
      </div>

      {/* Originality filter */}
      <div className="filter-group">
        <div className="filter-group-label">Originality</div>
        {originalityOptions.map((o) => (
          <label key={o} className="filter-check">
            <input
              type="checkbox"
              checked={localOriginalities.includes(o)}
              onChange={() => toggleOriginality(o)}
            />
            <span className="filter-check-box" />
            <span className="filter-check-label">{o}</span>
          </label>
        ))}
      </div>

      {/* Series filter */}
      {seriesOptions.length > 0 && (
        <div className="filter-group">
          <div className="filter-group-label">Series</div>
          <select 
            className="filter-select"
            value={localSeries}
            onChange={(e) => setLocalSeries(e.target.value)}
          >
            <option value="">All Series</option>
            {seriesOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {/* Price range */}
      <div className="filter-group">
        <div className="filter-group-label">Price Range (Rp)</div>
        <div className="filter-price-row">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="filter-price-input"
          />
          <span className="filter-price-sep">—</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="filter-price-input"
          />
        </div>
      </div>

      <button className="filter-apply-btn" onClick={handleApply}>
        Apply Filters
      </button>
    </aside>
  );
}
