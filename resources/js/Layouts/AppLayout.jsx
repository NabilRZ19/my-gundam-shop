import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AppLayout({ children, categories = [], activeCategory, setActiveCategory, cartCount = 0 }) {
  const { auth, url } = usePage().props;
  const currentUrl = usePage().url;
  const user = auth?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <Link className="logo" href="/">
            <div className="logo-mark">MGS</div>
            <span className="logo-text">My<span>Gundam</span>Shop</span>
          </Link>

          <nav className="nav-cats">
            <Link href="/" className={`nav-link ${currentUrl === '/' ? 'active' : ''}`}>Home</Link>
            <Link href={route('catalog')} className={`nav-link ${currentUrl.startsWith('/catalog') ? 'active' : ''}`}>Catalog</Link>
            <a href="#" className="nav-link">Reviews</a>
          </nav>

          <div className="search-wrap">
            <input type="text" placeholder="Search units, grades, series..." />
            <button className="search-btn">⌕</button>
          </div>

          <div className="header-actions">
            <div style={{ position: 'relative' }}>
              {user ? (
                <>
                  <button 
                    className={`icon-btn ${dropdownOpen ? 'active' : ''}`} 
                    title="Account"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="account-dropdown">
                      <div className="dropdown-header">
                        <span className="dropdown-name">{user.name}</span>
                        <span className="dropdown-email">{user.email}</span>
                      </div>
                      <Link href={route('profile.edit')} className="dropdown-item">My Profile</Link>
                      <Link href="#" className="dropdown-item">Pesanan</Link>
                      <Link href="#" className="dropdown-item">Review / Blog</Link>
                      <div className="dropdown-divider"></div>
                      <Link href={route('logout')} method="post" as="button" className="dropdown-item text-red">Logout</Link>
                    </div>
                  )}
                </>
              ) : (
                <Link 
                  href={route('login')} 
                  className="icon-btn" 
                  title="Login / Register"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </Link>
              )}
            </div>
            <button className="icon-btn" title="Wishlist">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button className="icon-btn" title="Cart">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main>{children}</main>

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
