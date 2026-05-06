export default function CatalogBanner({ totalProducts, gradeCount, seriesCount }) {
  return (
    <div className="cat-banner">
      <div className="cat-banner-inner">
        <div className="cat-banner-text">
          <span className="section-eyebrow">◆ Full Catalog</span>
          <h1 className="cat-banner-title">
            Mobile Suit <span className="accent-red">Arsenal</span>
          </h1>
          <p className="cat-banner-sub">
            Browse our full inventory of various Gunpla kits — HG, RG, MG, PG and more.
          </p>
        </div>
        <div className="cat-banner-stats">
          <div className="cat-stat">
            <div className="cat-stat-val">{totalProducts}+</div>
            <div className="cat-stat-label">Products</div>
          </div>
          <div className="cat-stat-divider" />
          <div className="cat-stat">
            <div className="cat-stat-val">{gradeCount}</div>
            <div className="cat-stat-label">Grades</div>
          </div>
          <div className="cat-stat-divider" />
          <div className="cat-stat">
            <div className="cat-stat-val">{seriesCount}</div>
            <div className="cat-stat-label">Series</div>
          </div>
        </div>
      </div>
    </div>
  );
}
