const statusStyles = {
  stock: { bg: "#005CB9", color: "#fff", label: "IN STOCK" },
  limited: { bg: "#C8970A", color: "#fff", label: "LIMITED" },
  restock: { bg: "#C0392B", color: "#fff", label: "RESTOCK" },
};

export default function ProductCard({ p, isAdded, onAdd }) {
  const s = statusStyles[p.statusType] || statusStyles['stock'];

  return (
    <div className="product-card">
      <div className="card-corner tl" />
      <div className="card-corner br" />
      <div className="card-status" style={{ background: s.bg, color: s.color }}>
        {s.label}
      </div>
      <div className="card-img-wrap">
        <img className="card-img" src={p.img} alt={p.name} />
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-grade">{p.grade}</span>
          <span className="card-scale">{p.scale}</span>
        </div>
        <div className="card-name">{p.name}</div>
        <div className="card-footer">
          <div className="card-price">
            <span>Rp</span>{Number(p.price).toLocaleString('id-ID')}
          </div>
          <button
            className={`add-btn${isAdded ? " added" : ""}`}
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
