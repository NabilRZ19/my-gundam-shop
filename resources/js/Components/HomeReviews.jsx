export default function HomeReviews() {
  const reviews = [
    {
      id: 1,
      title: "Building the PGU RX-78-2: A Flawless Experience",
      excerpt: "The multi-layered structure and pre-assembled inner frame parts make this the most satisfying build of the decade.",
      author: "Builder X",
      date: "Oct 24",
      image: "https://placehold.co/400x250/FAFAFA/4A4F5E?text=Review+1&font=montserrat"
    },
    {
      id: 2,
      title: "Mastering Panel Lining on White Armor",
      excerpt: "From pour-type markers to Tamiya accent color, here is the definitive guide to clean lines on your high-grade kits.",
      author: "Mecha Logs",
      date: "Nov 02",
      image: "https://placehold.co/400x250/FAFAFA/4A4F5E?text=Guide+2&font=montserrat"
    }
  ];

  return (
    <section className="reviews-section halftone-bg">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-eyebrow">◆ Intel & Guides</span>
          <h2 className="section-title">Builder's Logs</h2>
        </div>
        <a className="view-all" href="#">All Transmissions →</a>
      </div>

      <div className="review-grid">
        {reviews.map(r => (
          <div className="review-card" key={r.id}>
            <div className="review-img-wrap">
              <img src={r.image} alt={r.title} className="review-img" />
            </div>
            <div className="review-body">
              <div className="review-meta">
                <span>{r.author}</span>
                <span className="sep">//</span>
                <span>{r.date}</span>
              </div>
              <h3 className="review-title">{r.title}</h3>
              <p className="review-excerpt">{r.excerpt}</p>
              <a href="#" className="review-read">Read Log →</a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="review-actions">
        <a href="#" className="btn-catalog">Go to Reviews / Blog</a>
      </div>
    </section>
  );
}
