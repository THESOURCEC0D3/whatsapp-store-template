import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { config } from "../config";

export default function Services() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, // Important for disabling arrows
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = config.services;

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();
    emblaApi.on("select", updateButtons);
  }, [emblaApi, updateButtons]);

  return (
    <section className="py-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Services</h2>

      <div className="relative max-w-6xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col md:flex-row items-center gap-10 px-6"
              >
                {/* Image Animation */}
                <motion.img
                  key={`image-${selectedIndex}`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={slide.image}
                  alt={slide.title}
                  className="w-full md:w-1/2 rounded-xl shadow-lg"
                />

                {/* Text Animation */}
                <motion.div
                  key={`text-${selectedIndex}`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="md:w-1/2 text-center md:text-left"
                >
                  <h3 className="text-2xl font-semibold mb-4 text-black">{slide.title}</h3>
                  <p className="text-gray-600">{slide.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md 
          ${canPrev ? "bg-white" : "bg-gray-200 cursor-not-allowed"}`}
        >
          <ChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-md 
          ${canNext ? "bg-white" : "bg-gray-200 cursor-not-allowed"}`}
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
