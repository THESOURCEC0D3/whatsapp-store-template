import Header from "../components/Header";
import ProductList from "../components/products/ProductList";
import { products } from "../data/products";
import MobileSidebar from "../components/MobileSidebar";
import MobileFilter from "../components/MobileFilter";
import DesktopFilter from "../components/DesktopFilter";
import Footer from "../components/Footer";
import { useState } from "react";

const Products = () => {
  // Controls whether the mobile navigation sidebar (the menu) is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Controls whether the filter panel is open or closed
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Find the highest price across all products automatically.
  // .map() pulls out just the price from every product → [15000, 40000, 95000, ...]
  // Math.max(...) finds the biggest number in that list.
  // This means if you ever add a ₦200,000 perfume, the slider max updates on its own.
  const maxPrice = Math.max(...products.map((p) => p.price ?? 0));

  // ── Derive filter options automatically from the products data ──────────────
  // new Set(...) removes duplicates — so if 10 products have "Perfumes", it only appears once
  // .filter(Boolean) removes any undefined/null values (products that don't have that field)
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  const genders = [...new Set(products.map((p) => p.gender).filter(Boolean))];

  // This is our "filter box" — it holds all the choices the user has made in the filter panel
  const [filters, setFilters] = useState({
    category: [], // e.g. ["Perfumes", "Body Sprays"] — which categories to show
    brand: [],    // e.g. ["Dior"] — which brands to show
    gender: [],   // e.g. ["Male", "Female"] — which genders to show
    price: maxPrice, // starts at the highest price = show everything by default
  });

  // Go through every product and keep only the ones that pass ALL active filters
  const filteredProducts = products.filter((product) => {

    // CATEGORY FILTER:
    // If the user hasn't selected any category (length === 0), every product passes
    // If they have selected categories, the product's category must be in that list
    const categoryMatch =
      filters.category.length === 0 ||
      filters.category.includes(product.category);

    // BRAND FILTER:
    // Same idea — no brand selected means all brands pass
    // Otherwise the product's brand must be in the selected list
    const brandMatch =
      filters.brand.length === 0 || filters.brand.includes(product.brand);

    // GENDER FILTER:
    // No gender selected = all genders pass
    // Otherwise the product's gender must be in the selected list
    const genderMatch =
      filters.gender.length === 0 ||
      filters.gender.includes(product.gender);

    // PRICE FILTER:
    // The product's price must be less than or equal to the max price the user set on the slider
    // The ?? 0 means: if the product has no price field, treat it as 0 (so it always passes)
    const priceMatch = (product.price ?? 0) <= filters.price;

    // A product only appears in the list if it passes EVERY single filter
    return categoryMatch && brandMatch && genderMatch && priceMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header setIsOpen={setIsOpen} />
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Pass filters and setFilters to the filter panel so it can read and update them */}
      <MobileFilter
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        maxPrice={maxPrice}
        categories={categories}
        brands={brands}
        genders={genders}
      />

      <div className="flex-1 pt-24 px-5">
        <h1 className="font-bold text-3xl md:text-5xl border-gray-400 bg-linear-to-r from-blue-600 via-white to-purple-400 shadow-2xl rounded-2xl p-5 text-black mb-6">
          Our Products
        </h1>

        {/* Mobile filter button — hidden on desktop */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg"
        >
          Filter
        </button>

        {/* Side-by-side layout on desktop, stacked on mobile */}
        <div className="flex gap-6 items-start">
          <DesktopFilter
            filters={filters}
            setFilters={setFilters}
            maxPrice={maxPrice}
            categories={categories}
            brands={brands}
            genders={genders}
          />
          <div className="flex-1">
            <ProductList products={filteredProducts} />
          </div>
        </div>
      </div>
      <Footer className="border"/>
    </div>
  );
};

export default Products;
