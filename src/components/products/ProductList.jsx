import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const ProductList = ({ products }) => {
  // 🔥 Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // 💎 Optional: Clean display titles for branding
  const categoryTitles = {
    perfumes: "Perfumes",
    sprays: "Body Sprays",
    skincare: "Skincare Products",
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-2xl font-semibold text-gray-500 mb-2">No products found</p>
        <p className="text-gray-400">Try adjusting or clearing your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16 p-5">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <section key={category}>
          {/* Category Header */}
          <h2 className="text-3xl md:text-5xl text-left font-bold border-t p-3 border-t-8 m-5">
            {categoryTitles[category] || category}
          </h2>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  );
};

export default ProductList;
