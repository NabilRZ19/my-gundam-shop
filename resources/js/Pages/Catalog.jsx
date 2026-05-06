import { useState, useCallback } from "react";
import { router } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";
import "../../css/catalog.css";

import CatalogBanner from "./Catalog/Partials/CatalogBanner";
import NewArrivalsCarousel from "./Catalog/Partials/NewArrivalsCarousel";
import FilterSidebar from "./Catalog/Partials/FilterSidebar";
import HotCard from "./Catalog/Partials/HotCard";
import CatalogCard from "./Catalog/Partials/CatalogCard";

const SORT_OPTIONS = [
  { value: "latest", label: "Terbaru" },
  { value: "price_asc", label: "Harga: Terendah" },
  { value: "price_desc", label: "Harga: Tertinggi" },
  { value: "name_asc", label: "A → Z" },
];

function Pagination({ meta, links, onPage }) {
  if (!meta || meta.last_page <= 1) return null;
  return (
    <div className="cat-pagination">
      {links.map((link, i) => (
        <button
          key={i}
          className={`page-btn${link.active ? " active" : ""}${!link.url ? " disabled" : ""}`}
          disabled={!link.url}
          onClick={() => link.url && onPage(link.url)}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
}

export default function Catalog({
  newArrivals = [],
  hotItems = [],
  allProducts = { data: [], meta: {}, links: [] },
  gradeOptions = [],
  seriesOptions = [],
  filters = {},
}) {
  const [cart, setCart] = useState([]);
  const [added, setAdded] = useState({});
  const [sort, setSort] = useState(filters.sort || "latest");

  const handleAdd = (e, id) => {
    e.stopPropagation();
    setCart((c) => [...c, id]);
    setAdded((a) => ({ ...a, [id]: true }));
    setTimeout(() => setAdded((a) => ({ ...a, [id]: false })), 1200);
  };

  const applyFilters = useCallback(
    (newFilters) => {
      router.get(route("catalog"), { ...newFilters, sort }, {
        preserveState: false,
        preserveScroll: true,
      });
    },
    [sort]
  );

  const handleSort = (val) => {
    setSort(val);
    router.get(route("catalog"), { ...filters, sort: val }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handlePage = (url) => {
    router.visit(url, { preserveState: true, preserveScroll: true });
  };

  const products = allProducts.data || [];
  const pageMeta = allProducts.meta || {};
  const pageLinks = allProducts.links || [];

  return (
    <AppLayout cartCount={cart.length}>
      <CatalogBanner
        totalProducts={pageMeta.total ?? products.length}
        gradeCount={gradeOptions.length}
        seriesCount={seriesOptions.length}
      />

      <div className="cat-page-wrap">
        <section className="cat-section">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-eyebrow">◆ Just Landed</span>
              <h2 className="section-title">New Arrivals</h2>
            </div>
            <a href="#all-products" className="view-all">
              See All →
            </a>
          </div>
          <NewArrivalsCarousel
            newArrivals={newArrivals}
            added={added}
            handleAdd={handleAdd}
          />
        </section>

        <section className="cat-section cat-section--hot">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-eyebrow" style={{ color: "var(--red)" }}>
                ◆ Limited & Restock
              </span>
              <h2 className="section-title">🔥 Hot Items</h2>
            </div>
          </div>

          {hotItems.length > 0 ? (
            <NewArrivalsCarousel
              newArrivals={hotItems}
              added={added}
              handleAdd={handleAdd}
            />
          ) : (
            <div className="cat-empty">No hot items at the moment.</div>
          )}
        </section>

        <section className="cat-section" id="all-products">
          <div className="section-header">
            <div className="section-title-wrap">
              <span className="section-eyebrow">◆ Browse</span>
              <h2 className="section-title">All Products</h2>
            </div>

            <div className="cat-sort-bar">
              <span className="cat-sort-label">Sort:</span>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  className={`cat-sort-btn${sort === opt.value ? " active" : ""}`}
                  onClick={() => handleSort(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="cat-main-layout">
            <FilterSidebar
              gradeOptions={gradeOptions}
              seriesOptions={seriesOptions}
              filters={filters}
              onApply={applyFilters}
            />

            <div className="cat-grid-wrap">
              {products.length > 0 ? (
                <>
                  <div className="cat-results-bar">
                    <span className="cat-results-count">
                      {pageMeta.total ?? products.length} products found
                    </span>
                    {pageMeta.current_page && pageMeta.last_page > 1 && (
                      <span className="cat-results-page">
                        Page {pageMeta.current_page} / {pageMeta.last_page}
                      </span>
                    )}
                  </div>
                  <div className="cat-all-grid">
                    {products.map((p) => (
                      <CatalogCard
                        key={p.id}
                        p={p}
                        isAdded={added[p.id]}
                        onAdd={handleAdd}
                      />
                    ))}
                  </div>
                  <Pagination
                    meta={pageMeta}
                    links={pageLinks}
                    onPage={handlePage}
                  />
                </>
              ) : (
                <div className="cat-empty-state">
                  <div className="cat-empty-icon">⊗</div>
                  <div className="cat-empty-title">No Products Found</div>
                  <div className="cat-empty-sub">
                    Try adjusting or resetting your filters.
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
