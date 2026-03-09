import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileSidebar({ isOpen, setIsOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-screen w-64 bg-white z-50 p-6 shadow-xl"
          >
            <button onClick={() => setIsOpen(false)} className="mb-8">
              <X size={28} className="text-black"/>
            </button>

            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link
                to="/"
                className="p-3 bg-gray-200 rounded-2xl text-purple-600 md:block"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="p-3 bg-gray-200 rounded-2xl text-purple-600 md:block"
              >
                Our Products
              </Link>
              <Link
                to="/contact"
                className="p-3 bg-gray-200 rounded-2xl text-purple-600 md:block"
              >
                Contact Us
              </Link>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
