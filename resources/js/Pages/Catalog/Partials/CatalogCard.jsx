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

export default function CatalogCard({ p, isAdded, onAdd, compact = false }) {
  const grade = GRADE_COLORS[p.grade] || { bg: "#4A4F5E", color: "#fff" };
  const [imgErr, setImgErr] = useState(false);

  const getOriginalityProps = (p) => {
    if (p.is_pbandai) return { label: 'PBandai', color: '#6D28D9' };
    if (p.originality === 'Bandai Original') return { label: 'Bandai', color: '#005CB9' };
    if (p.originality === 'Bootleg') return { label: 'Bootleg', color: '#C0392B' };
    if (p.originality === 'Third-Party') return { label: 'Third-Party', color: '#C8970A' };
    return { label: p.originality || '', color: '#4A4F5E' };
  };

  const origProps = getOriginalityProps(p);

  return (
    <div className={`cat-card ${compact ? "cat-card--compact" : ""}`}>
      {/* corners */}
      <div className="card-corner tl" />
      <div className="card-corner br" />

      {/* status badges */}
      <div className="cat-badge">
        {p.badges?.new && (
          <span className="cat-badge-item" style={{background: '#0891B2'}}>NEW</span>
        )}
        {p.badges?.discount > 0 && (
          <span className="cat-badge-item" style={{background: '#C0392B'}}>
            -{p.badges.discount}%
          </span>
        )}
        {p.badges?.limited && (
          <span className="cat-badge-item limited">LIMITED</span>
        )}
        {p.badges?.pbandai && (
          <span className="cat-badge-item pbandai">PBANDAI</span>
        )}
        {p.badges?.top_sell && (
          <span className="cat-badge-item" style={{background: '#F59E0B'}}>TOP SELL</span>
        )}
      </div>

      {/* image */}
      <div className="cat-img-wrap">
        {p.img && !imgErr ? (
          <img
            className="cat-img"
            src={p.img}
            alt={p.name}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="cat-img-placeholder">
            <span className="cat-img-grade" style={{ color: grade.bg }}>
              {p.grade}
            </span>
          </div>
        )}
      </div>

      {/* body */}
      <div className="cat-body">
        <div className="cat-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <span className="cat-grade" style={{ background: grade.bg, color: grade.color }}>
              {p.grade}
            </span>
            <span className="cat-scale" style={{ marginLeft: '0.5rem' }}>{p.scale}</span>
          </div>
          {origProps.label && (
            <span style={{ color: origProps.color, fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {origProps.label}
            </span>
          )}
        </div>
        <div className="cat-name">{p.name}</div>
        {p.series && <div className="cat-series">{p.series}</div>}
        <div className="cat-footer">
          <div className="cat-price">
            <span>Rp</span>
            {Number(p.price).toLocaleString("id-ID")}
          </div>
          <button
            className={`cat-add-btn${isAdded ? " added" : ""}`}
            onClick={(e) => onAdd(e, p.id)}
            title="Add to cart"
          >
            {isAdded ? "✓" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
