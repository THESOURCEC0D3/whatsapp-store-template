import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { config } from "../config";

const Header = ({setIsOpen}) => {
  return (
    <div className="flex justify-between items-center fixed inset-x-0 p-5 bg-white/50 backdrop-blur-md shadow-lg shadow-purple-400 z-30 ">
      <Link
        to="/"
        className="text-4xl md:text-5xl font-bold text-purple-600 text-shadow-lg text-shadow-gray-500"
      >
        {config.businessName}
      </Link>
      <Link
        to="/products"
        className="p-3 bg-gray-200 rounded-2xl text-purple-600 hidden md:block"
      >
        Our Products
      </Link>
      <Link
        to="/contact"
        className="p-3 bg-gray-200 rounded-2xl text-purple-600 hidden md:block"
      >
        Contact Us
      </Link>

      <button onClick={() => setIsOpen(true)} className="md:hidden">
        <Menu size={28} className="text-black"/>
      </button>
    </div>
  );
};

export default Header;
