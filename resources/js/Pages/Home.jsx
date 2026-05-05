import { useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "RX-78-2 Gundam",
    grade: "MG",
    scale: "1/100",
    parts: 312,
    price: 45.99,
    status: "In Stock",
    statusType: "stock",
    img: "https://placehold.co/300x300/E8F0FB/005CB9?text=RX-78-2&font=montserrat",
  },
  {
    id: 2,
    name: "Strike Freedom",
    grade: "RG",
    scale: "1/144",
    parts: 218,
    price: 34.99,
    status: "Limited",
    statusType: "limited",
    img: "https://placehold.co/300x300/FFF8E1/C8970A?text=Strike+Freedom&font=montserrat",
  },
  {
    id: 3,
    name: "Unicorn Gundam",
    grade: "PG",
    scale: "1/60",
    parts: 738,
    price: 189.99,
    status: "Restock",
    statusType: "restock",
    img: "https://placehold.co/300x300/FFF0F0/C0392B?text=Unicorn&font=montserrat",
  },
  {
    id: 4,
    name: "Wing Zero EW",
    grade: "HG",
    scale: "1/144",
    parts: 142,
    price: 18.99,
    status: "In Stock",
    statusType: "stock",
    img: "https://placehold.co/300x300/E8F0FB/005CB9?text=Wing+Zero&font=montserrat",
  },
  {
    id: 5,
    name: "Sazabi Ver.Ka",
    grade: "MG",
    scale: "1/100",
    parts: 455,
    price: 74.99,
    status: "Limited",
    statusType: "limited",
    img: "https://placehold.co/300x300/FFF8E1/C8970A?text=Sazabi&font=montserrat",
  },
  {
    id: 6,
    name: "Barbatos Lupus Rex",
    grade: "RG",
    scale: "1/144",
    parts: 224,
    price: 36.99,
    status: "Restock",
    statusType: "restock",
    img: "https://placehold.co/300x300/F0FFF0/1A7A3A?text=Barbatos&font=montserrat",
  },
];

const CATEGORIES = ["HG", "RG", "MG", "PG"];

const statusStyles = {
  stock: { bg: "#005CB9", color: "#fff", label: "IN STOCK" },
  limited: { bg: "#C8970A", color: "#fff", label: "LIMITED" },
  restock: { bg: "#C0392B", color: "#fff", label: "RESTOCK" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #005CB9;
    --red: #C0392B;
    --gold: #C8970A;
    --gold-light: #F5C842;
    --white: #FAFAFA;
    --off-white: #F0F2F7;
    --dark: #0D0F14;
    --mid: #4A4F5E;
    --light-border: #D0D8E8;
    --font-heading: 'Space Grotesk', sans-serif;
    --font-mono: 'DM Mono', monospace;
  }

  body {
    font-family: var(--font-heading);
    background: var(--white);
    color: var(--dark);
    overflow-x: hidden;
  }

  /* HALFTONE BG TEXTURE */
  .halftone-bg {
    position: relative;
  }
  .halftone-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #c9d4e8 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.35;
    pointer-events: none;
    z-index: 0;
  }

  /* ===== HEADER ===== */
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--white);
    border-bottom: 2px solid var(--blue);
    box-shadow: 0 2px 0 0 #D0D8E8;
  }
  .header-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    height: 64px;
  }
  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    flex-shrink: 0;
  }
  .logo-mark {
    width: 36px;
    height: 36px;
    border: 2px solid var(--blue);
    outline: 1px solid var(--blue);
    outline-offset: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.75rem;
    color: var(--blue);
    letter-spacing: 0.05em;
    background: transparent;
  }
  .logo-text {
    font-weight: 700;
    font-size: 1rem;
    color: var(--dark);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .logo-text span { color: var(--blue); }

  .nav-cats {
    display: flex;
    gap: 0.25rem;
    margin-left: 1rem;
  }
  .cat-btn {
    padding: 0.3rem 0.85rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    border: 1.5px solid var(--light-border);
    background: transparent;
    color: var(--mid);
    cursor: pointer;
    transition: all 0.18s;
    text-transform: uppercase;
  }
  .cat-btn:hover, .cat-btn.active {
    border-color: var(--blue);
    color: var(--blue);
    background: #EEF4FF;
  }

  .search-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    border: 1.5px solid var(--light-border);
    outline: 1px solid transparent;
    transition: outline 0.18s, border-color 0.18s;
    background: var(--off-white);
    max-width: 420px;
  }
  .search-wrap:focus-within {
    border-color: var(--blue);
    outline-color: #BDD2F5;
  }
  .search-wrap input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 0.5rem 0.85rem;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--dark);
    outline: none;
  }
  .search-wrap input::placeholder { color: #9AA0B0; }
  .search-btn {
    padding: 0.5rem 0.75rem;
    background: var(--blue);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    transition: background 0.18s;
  }
  .search-btn:hover { background: #0049A0; }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-left: auto;
  }
  .icon-btn {
    width: 38px;
    height: 38px;
    border: 1.5px solid var(--light-border);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--mid);
    font-size: 1rem;
    transition: all 0.18s;
    position: relative;
  }
  .icon-btn:hover { border-color: var(--blue); color: var(--blue); }
  .cart-badge {
    position: absolute;
    top: -6px;
    right: -6px;
    background: var(--red);
    color: white;
    font-size: 0.6rem;
    font-weight: 700;
    font-family: var(--font-mono);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ===== HERO ===== */
  .hero {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    min-height: 540px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    position: relative;
    overflow: hidden;
  }
  .hero::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: 50%;
    width: 1px;
    background: linear-gradient(to bottom, transparent, var(--blue) 20%, var(--blue) 80%, transparent);
    opacity: 0.3;
  }

  .hero-left {
    padding: 4rem 3rem 4rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    position: relative;
    z-index: 1;
  }
  .hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .eyebrow-line {
    width: 32px;
    height: 2px;
    background: var(--blue);
  }
  .eyebrow-text {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--blue);
  }
  .hero-title {
    font-size: clamp(2.5rem, 4vw, 3.8rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--dark);
  }
  .hero-title .accent { color: var(--blue); }
  .hero-title .strike { color: var(--red); }

  .hero-specs {
    display: flex;
    gap: 1.5rem;
  }
  .spec-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    border-left: 2px solid var(--gold);
    padding-left: 0.75rem;
  }
  .spec-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--mid);
  }
  .spec-value {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--dark);
  }

  .hero-desc {
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--mid);
    max-width: 400px;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .btn-acquire {
    padding: 0.85rem 2rem;
    background: var(--red);
    color: white;
    border: none;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    outline: 2px solid transparent;
    outline-offset: 3px;
  }
  .btn-acquire::before {
    content: '';
    position: absolute;
    inset: 2px;
    border: 1px solid rgba(255,255,255,0.25);
    pointer-events: none;
  }
  .btn-acquire:hover {
    background: #A0201A;
    outline-color: var(--red);
    transform: translateY(-1px);
  }
  .btn-catalog {
    padding: 0.85rem 1.5rem;
    background: transparent;
    color: var(--blue);
    border: 1.5px solid var(--blue);
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-catalog:hover {
    background: #EEF4FF;
  }

  .hero-right {
    padding: 3rem 0 3rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .hero-img-frame {
    position: relative;
    width: 380px;
    height: 420px;
  }
  .hero-img-frame::before {
    content: '';
    position: absolute;
    inset: -8px;
    border: 1.5px solid var(--blue);
    outline: 1px solid var(--light-border);
    outline-offset: 4px;
  }
  .hero-img-frame::after {
    content: 'MGS-001 // HERO UNIT';
    position: absolute;
    bottom: -28px;
    left: 0;
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    color: var(--mid);
  }
  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    background: var(--off-white);
  }
  .hero-corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: var(--gold);
    border-style: solid;
  }
  .hero-corner.tl { top: -4px; left: -4px; border-width: 2px 0 0 2px; }
  .hero-corner.tr { top: -4px; right: -4px; border-width: 2px 2px 0 0; }
  .hero-corner.bl { bottom: -4px; left: -4px; border-width: 0 0 2px 2px; }
  .hero-corner.br { bottom: -4px; right: -4px; border-width: 0 2px 2px 0; }

  .price-badge {
    position: absolute;
    top: 16px;
    right: -24px;
    background: var(--dark);
    color: var(--gold-light);
    padding: 0.5rem 0.85rem;
    font-family: var(--font-mono);
  }
  .price-badge .price-label { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: #9AA0B0; display: block; }
  .price-badge .price-val { font-size: 1.2rem; font-weight: 500; }

  /* ===== TICKER ===== */
  .ticker {
    background: var(--blue);
    color: white;
    overflow: hidden;
    height: 36px;
    display: flex;
    align-items: center;
    border-top: 1px solid #0049A0;
    border-bottom: 1px solid #0049A0;
  }
  .ticker-inner {
    display: flex;
    animation: ticker-scroll 30s linear infinite;
    white-space: nowrap;
  }
  .ticker-item {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0 3rem;
    opacity: 0.9;
  }
  .ticker-sep {
    color: var(--gold-light);
    padding: 0 0.5rem;
  }
  @keyframes ticker-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* ===== FEATURED GRID ===== */
  .featured-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 4rem 2rem;
    position: relative;
    z-index: 1;
  }
  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid var(--light-border);
    padding-bottom: 1rem;
  }
  .section-title-wrap { display: flex; flex-direction: column; gap: 0.4rem; }
  .section-eyebrow {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
  }
  .section-title {
    font-size: 1.75rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--dark);
  }
  .view-all {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--blue);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    transition: gap 0.2s;
  }
  .view-all:hover { gap: 0.85rem; }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }

  /* PRODUCT CARD */
  .product-card {
    background: var(--white);
    border: 1.5px solid var(--light-border);
    outline: 1px solid transparent;
    position: relative;
    transition: all 0.22s;
    cursor: pointer;
    overflow: visible;
  }
  .product-card:hover {
    border-color: var(--blue);
    outline-color: #C0D4F0;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,92,185,0.12);
  }
  .card-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: var(--gold);
    border-style: solid;
    z-index: 2;
  }
  .card-corner.tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .card-corner.br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

  .card-status {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 3;
    padding: 0.2rem 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .card-img-wrap {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--off-white);
    border-bottom: 1.5px solid var(--light-border);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }
  .product-card:hover .card-img { transform: scale(1.04); }

  .card-body {
    padding: 1rem;
  }
  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.4rem;
  }
  .card-grade {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 500;
    padding: 0.15rem 0.4rem;
    background: var(--blue);
    color: white;
    letter-spacing: 0.1em;
  }
  .card-scale {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--mid);
    letter-spacing: 0.08em;
  }
  .card-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 0.75rem;
    line-height: 1.3;
  }
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-price {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--dark);
  }
  .card-price span {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 400;
    color: var(--mid);
    margin-right: 0.1rem;
  }
  .add-btn {
    width: 32px;
    height: 32px;
    background: var(--blue);
    border: none;
    color: white;
    font-size: 1.1rem;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.18s, transform 0.18s;
    flex-shrink: 0;
  }
  .add-btn:hover { background: var(--red); transform: scale(1.1); }
  .add-btn.added { background: #1A7A3A; }

  /* ===== FOOTER ===== */
  .footer {
    background: var(--dark);
    color: #8A909F;
    margin-top: 4rem;
    border-top: 2px solid var(--blue);
    position: relative;
  }
  .footer-inner {
    max-width: 1400px;
    margin: 0 auto;
    padding: 3rem 2rem 2rem;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 3rem;
    margin-bottom: 2.5rem;
  }
  .footer-brand .logo-text { color: #E0E4EF; }
  .footer-brand .logo-mark { border-color: var(--blue); color: var(--blue); }
  .footer-tagline {
    margin-top: 0.75rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    line-height: 1.7;
    color: #6A7080;
    max-width: 240px;
  }
  .footer-col-title {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #B0B8CC;
    margin-bottom: 1rem;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
  .footer-links a {
    font-size: 0.82rem;
    color: #6A7080;
    text-decoration: none;
    transition: color 0.18s;
    font-family: var(--font-mono);
  }
  .footer-links a:hover { color: var(--blue); }

  .footer-bottom {
    border-top: 1px solid #1E2232;
    padding-top: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .footer-copy {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: #4A5060;
    letter-spacing: 0.06em;
  }
  .system-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4A5060;
  }
  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #22C55E;
    box-shadow: 0 0 6px #22C55E;
    animation: pulse-dot 2s ease-in-out infinite;
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .hero { grid-template-columns: 1fr; min-height: auto; }
    .hero::after { display: none; }
    .hero-left { padding: 2.5rem 0 1.5rem; }
    .hero-right { padding: 0 0 2.5rem; justify-content: flex-start; }
    .hero-img-frame { width: 100%; max-width: 340px; height: 320px; }
    .price-badge { right: 0; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
    .nav-cats { display: none; }
  }
  @media (max-width: 600px) {
    .header-inner { gap: 1rem; }
    .search-wrap { max-width: 180px; }
    .footer-grid { grid-template-columns: 1fr; }
    .product-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  }
`;

export default function Home({ products = [], categories = [], seriesList = [] }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [added, setAdded] = useState({});

  const handleAdd = (e, id) => {
    e.stopPropagation();
    setCart((c) => [...c, id]);
    setAdded((a) => ({ ...a, [id]: true }));
    setTimeout(() => setAdded((a) => ({ ...a, [id]: false })), 1000);
  };

  return (
    <>
      <style>{css}</style>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <a className="logo" href="#">
            <div className="logo-mark">MGS</div>
            <span className="logo-text">My<span>Gundam</span>Shop</span>
          </a>

          <nav className="nav-cats">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="search-wrap">
            <input type="text" placeholder="Search units, grades, series..." />
            <button className="search-btn">⌕</button>
          </div>

          <div className="header-actions">
            <button className="icon-btn" title="Account">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            </button>
            <button className="icon-btn" title="Wishlist">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button className="icon-btn" title="Cart">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero halftone-bg">
        <div className="hero-left">
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">New Arrival // Series 24</span>
          </div>
          <h1 className="hero-title">
            Perfect<br />
            <span className="accent">Grade</span>{" "}
            <span className="strike">Strike</span><br />
            Freedom
          </h1>
          <div className="hero-specs">
            <div className="spec-item">
              <span className="spec-label">Scale</span>
              <span className="spec-value">1/60</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Parts</span>
              <span className="spec-value">738 pcs</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Grade</span>
              <span className="spec-value">PG</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Series</span>
              <span className="spec-value">SEED</span>
            </div>
          </div>
          <p className="hero-desc">
            The pinnacle of mobile suit assembly. Featuring internal LED framework,
            drag-on wing articulation, and full inner-frame detail. Engineer your legend.
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
              src="https://placehold.co/380x420/E8F0FB/005CB9?text=PG+Strike+Freedom&font=montserrat"
              alt="PG Strike Freedom"
            />
            <div className="price-badge">
              <span className="price-label">MSRP</span>
              <span className="price-val">Rp{Number(3500000).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
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

      {/* FEATURED GRID */}
      <section className="featured-section halftone-bg">
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">◆ Featured Systems</span>
            <h2 className="section-title">Mobile Suit Catalog</h2>
          </div>
          <a className="view-all" href="#">View All Units →</a>
        </div>

        <div className="product-grid">
          {products.map((p) => {
            const s = statusStyles[p.statusType] || statusStyles['stock'];
            return (
              <div className="product-card" key={p.id}>
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
                      className={`add-btn${added[p.id] ? " added" : ""}`}
                      onClick={(e) => handleAdd(e, p.id)}
                      title="Add to cart"
                    >
                      {added[p.id] ? "✓" : "+"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <div className="logo-mark">MGS</div>
                <span className="logo-text">My<span>Gundam</span>Shop</span>
              </div>
              <p className="footer-tagline">
                Premium Gunpla retailer. Sourcing high-grade kits for builders worldwide since 2018. Authentic. Certified. Mission-ready.
              </p>
            </div>

            <div>
              <div className="footer-col-title">Catalog</div>
              <ul className="footer-links">
                {["High Grade (HG)", "Real Grade (RG)", "Master Grade (MG)", "Perfect Grade (PG)", "SD Gundam", "New Arrivals"].map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Support</div>
              <ul className="footer-links">
                {["Track Order", "Returns", "FAQ", "Assembly Guides", "Contact Us"].map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {["About Us", "Blog", "Affiliate Program", "Wholesale", "Press Kit"].map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">© 2025 MyGundamShop. All rights reserved. // NOT affiliated with Bandai Spirits.</span>
            <div className="system-status">
              <div className="status-dot" />
              System Status: Nominal
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
