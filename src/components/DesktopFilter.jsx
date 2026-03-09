const DesktopFilter = ({ filters, setFilters, maxPrice }) => {

  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      const isSelected = prev.category.includes(category);

      if (isSelected) {
        return {
          ...prev,
          category: prev.category.filter((item) => item !== category),
          ...(category === "Perfumes" && {
            gender: [],
            maleScent: [],
            femaleScent: [],
          }),
        };
      }

      return {
        ...prev,
        category: [...prev.category, category],
      };
    });
  };

  const handleGenderChange = (gender) => {
    setFilters((prev) => {
      const isSelected = prev.gender.includes(gender);

      if (isSelected) {
        return {
          ...prev,
          gender: prev.gender.filter((g) => g !== gender),
          ...(gender === "Male" && { maleScent: [] }),
          ...(gender === "Female" && { femaleScent: [] }),
        };
      }

      return {
        ...prev,
        gender: [...prev.gender, gender],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      gender: [],
      maleScent: [],
      femaleScent: [],
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
        <div>
          <h3 className="font-medium mb-2 text-black">Category</h3>
          <div className="space-y-2">

            <label className="flex items-center gap-2 text-black">
              <input
                type="checkbox"
                checked={filters.category.includes("Perfumes")}
                onChange={() => handleCategoryChange("Perfumes")}
              />
              Perfumes
            </label>

            {filters.category.includes("Perfumes") && (
              <div className="my-5 space-y-2">
                <p className="text-sm font-medium text-black">Gender (Optional)</p>

                <div className="flex gap-4">

                  {/* Male */}
                  <div>
                    <label className="flex items-center gap-2 text-black">
                      <input
                        type="checkbox"
                        checked={filters.gender.includes("Male")}
                        onChange={() => handleGenderChange("Male")}
                      />
                      Male
                    </label>

                    {filters.gender.includes("Male") && (
                      <div className="mt-2 space-y-2">
                        <p className="text-sm font-medium text-black">Male Scents (Optional)</p>
                        {["Fresh Aquatic", "Woody", "Spicy", "Sweet"].map((scent) => (
                          <label key={scent} className="flex items-center gap-2 text-black">
                            <input
                              type="checkbox"
                              checked={filters.maleScent.includes(scent)}
                              onChange={() => toggleFilter("maleScent", scent)}
                            />
                            {scent}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Female */}
                  <div>
                    <label className="flex items-center gap-2 text-black">
                      <input
                        type="checkbox"
                        checked={filters.gender.includes("Female")}
                        onChange={() => handleGenderChange("Female")}
                      />
                      Female
                    </label>

                    {filters.gender.includes("Female") && (
                      <div className="mt-2 space-y-2">
                        <p className="text-sm font-medium text-black">Female Scents (Optional)</p>
                        {["Floral", "Fruity", "Sweet"].map((scent) => (
                          <label key={scent} className="flex items-center gap-2 text-black">
                            <input
                              type="checkbox"
                              checked={filters.femaleScent.includes(scent)}
                              onChange={() => toggleFilter("femaleScent", scent)}
                            />
                            {scent}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Unisex */}
                  <div>
                    <label className="flex items-center gap-2 text-black">
                      <input
                        type="checkbox"
                        checked={filters.gender.includes("Unisex")}
                        onChange={() => handleGenderChange("Unisex")}
                      />
                      Unisex
                    </label>
                  </div>

                </div>
              </div>
            )}

            <label className="flex items-center gap-2 text-black">
              <input
                type="checkbox"
                checked={filters.category.includes("Body Sprays")}
                onChange={() => handleCategoryChange("Body Sprays")}
              />
              Body Sprays
            </label>

            <label className="flex items-center gap-2 text-black">
              <input
                type="checkbox"
                checked={filters.category.includes("Skincare Products")}
                onChange={() => handleCategoryChange("Skincare Products")}
              />
              Skincare Products
            </label>

          </div>
        </div>

        {/* ════ BRAND ════ */}
        <div>
          <h3 className="font-medium mb-2 text-black">Brand</h3>
          <div className="space-y-2">
            {["Dior", "Nivea"].map((brand) => (
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

        {/* ════ PRICE ════ */}
        <div>
          <h3 className="font-medium mb-2 text-black">Max Price</h3>
          <p className="text-sm text-gray-500 mb-2">
            Up to ₦{filters.price.toLocaleString()}
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
