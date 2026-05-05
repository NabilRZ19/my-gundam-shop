export default function HomeTicker() {
  return (
    <div className="ticker">
      <div className="ticker-inner">
        {[...Array(2)].map((_, i) => (
          <span key={i} style={{ display: "contents" }}>
            {["NEW ARRIVALS: PG STRIKE FREEDOM", "FREE SHIPPING OVER Rp1.000.000", "HG AÉROGRAPH SERIES NOW IN STOCK", "LIMITED: RG SAZABI VER.KA", "LOYALTY POINTS ON ALL ORDERS", "SECURE WORLDWIDE SHIPPING"].map((item, j) => (
              <span className="ticker-item" key={`${i}-${j}`}>
                {item} <span className="ticker-sep">◆</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
