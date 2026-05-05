export default function HomeHero() {
  return (
    <section className="hero halftone-bg">
      <div className="hero-left">
        <div className="hero-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Masterpiece Collection // 2026</span>
        </div>
        <h1 className="hero-title">
          Perfect<br />
          <span className="accent">Grade</span>{" "}
          <span className="strike">Unleashed</span><br />
          RX-93 ν Gundam
        </h1>
        <div className="hero-specs">
          <div className="spec-item">
            <span className="spec-label">Scale</span>
            <span className="spec-value">1/60</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Parts</span>
            <span className="spec-value">~1,200 pcs</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Grade</span>
            <span className="spec-value">PGU</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Series</span>
            <span className="spec-value">Char's Counterattack</span>
          </div>
        </div>
        <p className="hero-desc">
          The ultimate evolution of Gunpla engineering. Experience the multi-layered mechanical inner frame,
          metallic 3D stickers, and extreme articulation of Amuro Ray's iconic mobile suit.
        </p>
        <div className="hero-actions">
          <button className="btn-acquire">Acquire Now</button>
          <button className="btn-catalog">View Catalog →</button>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-img-frame">
          <div className="hero-corner tl" />
          <div className="hero-corner tr" />
          <div className="hero-corner bl" />
          <div className="hero-corner br" />
          <img
            className="hero-img"
            src="https://placehold.co/380x420/E8F0FB/005CB9?text=PGU+Nu+Gundam&font=montserrat"
            alt="PGU RX-93 Nu Gundam"
          />
          <div className="price-badge">
            <span className="price-label">MSRP</span>
            <span className="price-val">Rp{Number(5850000).toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
