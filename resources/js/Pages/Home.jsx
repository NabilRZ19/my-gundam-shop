import { useState } from "react";
import AppLayout from "../Layouts/AppLayout";
import HomeHero from "../Components/HomeHero";
import HomeTicker from "../Components/HomeTicker";
import HomeReviews from "../Components/HomeReviews";
import ProductCard from "../Components/ProductCard";

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

  // Grab 8 products for featured (mix of statuses)
  const getFeatured = () => {
    const limited = products.filter(p => p.statusType === 'limited').slice(0, 2);
    const restock = products.filter(p => p.statusType === 'restock').slice(0, 2);
    const stock = products.filter(p => p.statusType === 'stock');
    const needed = 8 - (limited.length + restock.length);
    return [...limited, ...restock, ...stock.slice(0, needed)];
  };
  const featuredProducts = getFeatured();

  return (
    <AppLayout
      categories={categories}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      cartCount={cart.length}
    >
      <HomeHero />
      <HomeTicker />
      <HomeReviews />

      {/* FEATURED GRID */}
      <section className="featured-section halftone-bg">
        <div className="section-header">
          <div className="section-title-wrap">
            <span className="section-eyebrow">◆ Featured Systems</span>
            <h2 className="section-title">Mobile Suit Catalog</h2>
          </div>
        </div>

        <div className="product-grid">
          {featuredProducts.map((p) => (
            <ProductCard 
              key={p.id} 
              p={p} 
              isAdded={added[p.id]} 
              onAdd={handleAdd} 
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <a href="#" className="btn-acquire" style={{ textDecoration: 'none' }}>View All Catalog →</a>
        </div>
      </section>
    </AppLayout>
  );
}
