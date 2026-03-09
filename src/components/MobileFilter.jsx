import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// We receive 4 things from the Products page:
// isOpen     → true/false: should the panel be visible?
// onClose    → a function to call when we want to close the panel
// filters    → the current filter selections (the "filter box" object)
// setFilters → the function to update that filter box
// maxPrice is passed down from Products.jsx — it's the highest price in your products list
const MobileFilter = ({ isOpen, onClose, filters, setFilters, maxPrice }) => {

  // ─── HELPER: toggleFilter ───────────────────────────────────────────────────
  // This single function handles adding OR removing a value from any filter list.
  // "key"   → which filter are we changing? e.g. "brand", "maleScent"
  // "value" → what item are we toggling? e.g. "Dior", "Woody"
  //
  // We use "setFilters(prev => ...)" instead of "setFilters({ ...filters, ... })"
  // because "prev" is always guaranteed to be the LATEST state.
  // Using "filters" directly inside a handler can sometimes give you a stale
  // (old) copy of the state, which leads to bugs. "prev =>" is the safe way.
  const toggleFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev, // copy all other filters unchanged (e.g. don't touch "brand" when changing "maleScent")

      // [key] is a "computed property name" — it lets us use a variable as the key name
      // So if key = "brand", this becomes: brand: ...
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value) // value is already in the list → remove it
        : [...prev[key], value],                      // value is not in the list → add it
    }));
  };

  // ─── HANDLER: handleCategoryChange ─────────────────────────────────────────
  // Used for the Category checkboxes (Perfumes, Body Sprays, Skincare Products)
  // This needs its own handler (instead of using toggleFilter) because of one
  // special rule: when the user UNCHECKS "Perfumes", we must also clear the
  // gender and scent filters — those only make sense for perfumes, and leaving
  // them active while Perfumes is unchecked would cause invisible filtering.
  const handleCategoryChange = (category) => {
    setFilters((prev) => {
      // Is this category already checked?
      const isSelected = prev.category.includes(category);

      if (isSelected) {
        // The user is UNCHECKING this category
        return {
          ...prev,
          // Remove this category from the list
          category: prev.category.filter((item) => item !== category),

          // The "&&" here means: only spread these extra resets if we're unchecking "Perfumes"
          // The "..." (spread) merges the extra keys into the returned object
          // So if category === "Perfumes", this adds: gender: [], maleScent: [], femaleScent: []
          // If it's "Body Sprays" or "Skincare", nothing extra happens
          ...(category === "Perfumes" && {
            gender: [],
            maleScent: [],
            femaleScent: [],
          }),
        };
      }

      // The user is CHECKING this category — just add it
      return {
        ...prev,
        category: [...prev.category, category],
      };
    });
  };

  // ─── HANDLER: handleGenderChange ───────────────────────────────────────────
  // Used for the Male / Female / Unisex checkboxes under Perfumes
  // Similar logic: when "Male" is unchecked, clear maleScent
  //                when "Female" is unchecked, clear femaleScent
  // This way, scent filters don't silently stay active after you uncheck their gender
  const handleGenderChange = (gender) => {
    setFilters((prev) => {
      const isSelected = prev.gender.includes(gender);

      if (isSelected) {
        // The user is UNCHECKING this gender
        return {
          ...prev,
          gender: prev.gender.filter((g) => g !== gender),
          // If unchecking "Male", also wipe the male scent selections
          ...(gender === "Male" && { maleScent: [] }),
          // If unchecking "Female", also wipe the female scent selections
          ...(gender === "Female" && { femaleScent: [] }),
        };
      }

      // The user is CHECKING this gender — just add it
      return {
        ...prev,
        gender: [...prev.gender, gender],
      };
    });
  };

  // ─── HANDLER: clearFilters ──────────────────────────────────────────────────
  // Resets everything back to the default "no filters active" state
  // price goes back to 100000 (the maximum) which means "show all prices"
  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      gender: [],
      maleScent: [],
      femaleScent: [],
      price: maxPrice, // reset to the real max, not a hardcoded number
    });
  };

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    // AnimatePresence allows the panel to animate OUT (fade/slide away) when it closes
    // Without this, framer-motion can only animate elements coming IN, not going away
    <AnimatePresence>
      {/* Only render anything if isOpen is true */}
      {isOpen && (
        <>
          {/* ── Dark Overlay ── */}
          {/* This covers the whole screen behind the panel with a semi-transparent black */}
          {/* Clicking it triggers onClose, so users can dismiss the filter by tapping outside */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}   // starts invisible
            animate={{ opacity: 1 }}   // fades in to full opacity
            exit={{ opacity: 0 }}      // fades out when closing
            onClick={onClose}
          />

          {/* ── Sliding Panel ── */}
          {/* This is the actual white filter drawer that slides in from the left */}
          <motion.div
            className="fixed top-0 left-0 h-full w-90 bg-white z-50 shadow-xl p-6 overflow-y-auto"
            initial={{ x: "-100%" }}              // starts fully off-screen to the left
            animate={{ x: 0 }}                    // slides in to its normal position
            exit={{ x: "-100%" }}                 // slides back out when closing
            transition={{ type: "tween" }}        // "tween" = smooth linear slide (not springy)
          >

            {/* ── Panel Header ── */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-black">Filters</h2>
              <div className="flex items-center gap-3">
                {/* "Clear All" resets every filter at once */}
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 underline"
                >
                  Clear All
                </button>
                {/* X button closes the panel */}
                <button onClick={onClose}>
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* ── All Filter Sections ── */}
            <div className="space-y-6">

              {/* ════ CATEGORY SECTION ════ */}
              <div>
                <h3 className="font-medium mb-2 text-black">Category</h3>
                <div className="space-y-2">

                  {/* Perfumes checkbox */}
                  <label className="flex items-center gap-2 text-black">
                    <input
                      type="checkbox"
                      checked={filters.category.includes("Perfumes")}
                      onChange={() => handleCategoryChange("Perfumes")}
                    />
                    Perfumes
                  </label>

                  {/* Gender sub-section — only renders when "Perfumes" is checked */}
                  {/* This whole block is conditionally shown using the && operator:
                      if the left side is true, React renders the right side (the JSX) */}
                  {filters.category.includes("Perfumes") && (
                    <div className="my-5 space-y-2">
                      <p className="text-sm font-medium text-black text-left">
                        Gender (Optional)
                      </p>

                      <div className="flex gap-2">

                        {/* ── Male Column ── */}
                        <div>
                          <label className="flex items-center gap-2 text-black">
                            <input
                              type="checkbox"
                              checked={filters.gender.includes("Male")}
                              onChange={() => handleGenderChange("Male")}
                            />
                            Male
                          </label>

                          {/* Male scent checkboxes — only render when "Male" is checked */}
                          {filters.gender.includes("Male") && (
                            <div className="mt-2 space-y-2">
                              <p className="text-sm font-medium text-black text-left">
                                Male Scents (Optional)
                              </p>
                              {/* Instead of copy-pasting the same checkbox 4 times, we use
                                  .map() to loop over the list and create one checkbox per scent.
                                  "key" is required by React to track each item in the list. */}
                              {["Fresh Aquatic", "Woody", "Spicy", "Sweet"].map((scent) => (
                                <label
                                  key={scent}
                                  className="flex items-center gap-2 text-black"
                                >
                                  <input
                                    type="checkbox"
                                    // Check if this scent is in the MALE scent list specifically
                                    // This fixes the old bug where Male and Female "Sweet"
                                    // were linked — now they are tracked separately
                                    checked={filters.maleScent.includes(scent)}
                                    onChange={() => toggleFilter("maleScent", scent)}
                                  />
                                  {scent}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* ── Female Column ── */}
                        <div>
                          <label className="flex items-center gap-2 text-black">
                            <input
                              type="checkbox"
                              checked={filters.gender.includes("Female")}
                              onChange={() => handleGenderChange("Female")}
                            />
                            Female
                          </label>

                          {/* Female scent checkboxes — only render when "Female" is checked */}
                          {filters.gender.includes("Female") && (
                            <div className="mt-2 space-y-2">
                              <p className="text-sm font-medium text-black text-left">
                                Female Scents (Optional)
                              </p>
                              {["Floral", "Fruity", "Sweet"].map((scent) => (
                                <label
                                  key={scent}
                                  className="flex items-center gap-2 text-black"
                                >
                                  <input
                                    type="checkbox"
                                    // Check against femaleScent — completely separate from maleScent
                                    // So checking "Sweet" here does NOT affect the Male "Sweet" checkbox
                                    checked={filters.femaleScent.includes(scent)}
                                    onChange={() => toggleFilter("femaleScent", scent)}
                                  />
                                  {scent}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* ── Unisex Column ── */}
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

                  {/* Body Sprays checkbox */}
                  <label className="flex items-center gap-2 text-black">
                    <input
                      type="checkbox"
                      checked={filters.category.includes("Body Sprays")}
                      onChange={() => handleCategoryChange("Body Sprays")}
                    />
                    Body Sprays
                  </label>

                  {/* Skincare Products checkbox */}
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

              {/* ════ BRAND SECTION ════ */}
              <div>
                <h3 className="font-medium mb-2 text-black">Brand</h3>
                <div className="space-y-2">
                  {/* Same .map() pattern — loop over the brands list instead of copy-pasting */}
                  {["Dior", "Nivea"].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-black">
                      <input
                        type="checkbox"
                        checked={filters.brand.includes(brand)}
                        // toggleFilter("brand", "Dior") adds or removes "Dior" from filters.brand
                        onChange={() => toggleFilter("brand", brand)}
                      />
                      {brand}
                    </label>
                  ))}
                </div>
              </div>

              {/* ════ PRICE SECTION ════ */}
              <div>
                <h3 className="font-medium mb-2 text-black">Max Price</h3>

                {/* Show the current max price so the user can see where they've set the slider */}
                {/* .toLocaleString() formats the number with commas: 95000 → "95,000" */}
                <p className="text-sm text-gray-500 mb-2">
                  Up to ₦{filters.price.toLocaleString()}
                </p>

                <input
                  type="range"
                  min="0"
                  max={maxPrice} /* the slider ceiling always matches the most expensive product */
                  // "value" connects the slider position to our filter state
                  // Without this, the slider would not reflect the current filter value
                  value={filters.price}
                  // onChange fires every time the user moves the slider
                  // e.target.value is the new slider position as a STRING (e.g. "75000")
                  // We wrap it in Number() to convert it to a real number before saving it
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                  className="w-full"
                />
              </div>

            </div>

            {/* ── Apply Button ── */}
            {/* Closes the panel — filters are already live as the user checks boxes */}
            <button
              onClick={onClose}
              className="mt-8 w-full text-white py-3 rounded-xl bg-purple-600"
            >
              Apply Filters
            </button>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileFilter;
