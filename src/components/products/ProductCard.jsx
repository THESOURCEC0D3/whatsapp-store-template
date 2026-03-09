import { createWhatsAppOrderLink } from "../../utils/whatsapp.js";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="flex flex-col space-y-3 items-center justify-between border rounded-2xl shadow-2xl shadow-gray-500 p-3 hover:scale-110 hover:border-blue-400 hover:shadow-2xl hover:shadow-purple-500 hover:z-30 bg-white transition-all duration-500 z-10 cursor-pointer">
      <img src={product.image} alt={product.name} className="size-58" />
      <h2 className="text-black">{product.name}</h2>
      <p className="text-black">₦{product.price.toLocaleString()}</p>
      <span
        className={`text-sm font-medium px-3 py-1 rounded-full ${
          product.inStock
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </span>

      {product.inStock ? (
        <a
          href={createWhatsAppOrderLink(product, 2348065429005)}
          className="p-3 text-black bg-gray-200 rounded-2xl"
        >
          Get Product
        </a>
      ) : (
        <span className="p-3 text-gray-400 bg-gray-100 rounded-2xl cursor-not-allowed">
          Out of Stock
        </span>
      )}
    </div>
  );
};

export default ProductCard;
