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

export default function HotCard({ p, isAdded, onAdd }) {
  const grade = GRADE_COLORS[p.grade] || { bg: "#4A4F5E", color: "#fff" };
  const [imgErr, setImgErr] = useState(false);
  const original = p.discount
    ? Math.round(p.price / (1 - p.discount / 100))
    : null;

  const getOriginalityProps = (p) => {
    if (p.is_pbandai) return { label: 'PBandai', color: '#6D28D9' };
    if (p.originality === 'Bandai Original') return { label: 'Bandai', color: '#005CB9' };
    if (p.originality === 'Bootleg') return { label: 'Bootleg', color: '#C0392B' };
    if (p.originality === 'Third-Party') return { label: 'Third-Party', color: '#C8970A' };
    return { label: p.originality || '', color: '#4A4F5E' };
  };

  const origProps = getOriginalityProps(p);

  return (
    <div className="hot-card">
      <div className="card-corner tl" />
      <div className="card-corner br" />

      {p.discount > 0 && (
        <div className="hot-discount">−{p.discount}%</div>
      )}
      
      {p.statusType === 'limited' && !p.discount && (
        <div className="hot-discount" style={{background: '#6D28D9', padding: '0.2rem 0.5rem', fontSize: '0.6rem'}}>LIMITED</div>
      )}

      {p.statusType === 'low_stock' && !p.discount && (
        <div className="hot-discount" style={{background: '#C0392B', padding: '0.2rem 0.5rem', fontSize: '0.6rem'}}>LOW STOCK</div>
      )}

      <div className="hot-img-wrap">
        {p.img && !imgErr ? (
          <img
            className="hot-img"
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

      <div className="hot-body">
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
        <div className="hot-name">{p.name}</div>
        {p.series && <div className="cat-series">{p.series}</div>}
        <div className="hot-pricing">
          {original && (
            <span className="hot-original">
              Rp{Number(original).toLocaleString("id-ID")}
            </span>
          )}
          <div className="hot-price">
            <span>Rp</span>
            {Number(p.price).toLocaleString("id-ID")}
          </div>
        </div>
        <button
          className={`hot-add-btn${isAdded ? " added" : ""}`}
          onClick={(e) => onAdd(e, p.id)}
        >
          {isAdded ? "✓ Added" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}
