import { config } from "../config";

// categories, brands, genders are derived automatically from the products data in Products.jsx
// They will be different for every client — no hardcoding here
const DesktopFilter = ({ filters, setFilters, maxPrice, categories, brands, genders }) => {

  // Adds or removes a value from any filter list (category, brand, or gender)
  // key  → which filter to change, e.g. "brand"
  // value → what to toggle, e.g. "Dior"
  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value) // already selected → remove it
        : [...prev[key], value],                      // not selected → add it
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      gender: [],
      price: maxPrice,
    });
  };

  return (
    <aside className="hidden md:block w-72 shrink-0 bg-white border border-gray-200 rounded-2xl p-6 self-start sticky top-28">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-black">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-purple-600 underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">

        {/* ════ CATEGORY ════ */}
        {/* Only renders if the products data has at least one category */}
        {categories.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 text-black">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 text-black">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={() => toggleFilter("category", category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ════ BRAND ════ */}
        {/* Only renders if at least one product has a brand field */}
        {brands.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 text-black">Brand</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-black">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand)}
                    onChange={() => toggleFilter("brand", brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ════ GENDER ════ */}
        {/* Only renders if at least one product has a gender field */}
        {genders.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 text-black">Gender</h3>
            <div className="space-y-2">
              {genders.map((gender) => (
                <label key={gender} className="flex items-center gap-2 text-black">
                  <input
                    type="checkbox"
                    checked={filters.gender.includes(gender)}
                    onChange={() => toggleFilter("gender", gender)}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ════ PRICE ════ */}
        <div>
          <h3 className="font-medium mb-2 text-black">Max Price</h3>
          <p className="text-sm text-gray-500 mb-2">
            Up to {config.currency}{filters.price.toLocaleString()}
          </p>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={filters.price}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
            className="w-full"
          />
        </div>

      </div>
    </aside>
  );
};

export default DesktopFilter;
