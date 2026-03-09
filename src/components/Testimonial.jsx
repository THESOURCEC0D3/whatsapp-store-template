import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { testimonials } from "../data/testimonial.js";

const Testimonials = () => {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Create animation controls
  const controls = useAnimation();

  // Start the animation when component mounts
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 35,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <section className="py-20 bg-purple-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl md:text-4xl font-bold text-black">
            What Our Customers Say
          </h2>
          <p className="text-black mt-3">Trusted by many happy customers</p>
        </div>

        <div className="relative flex overflow-hidden cursor-pointer">
          <motion.div
            className="flex whitespace-nowrap"
            animate={controls}
            onHoverStart={() => controls.stop()}
            onHoverEnd={() =>
              controls.start({
                x: ["0%", "-50%"],
                transition: {
                  duration: 35,
                  ease: "linear",
                  repeat: Infinity,
                },
              })
            }
          >
            {duplicatedTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
                className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] px-4"
              >
                <div className="bg-white p-8 rounded-2xl shadow-sm h-full border border-gray-100 whitespace-normal text-black">
                  <p className="text-gray-700 mb-6 text-base italic">
                    “{testimonial.message}”
                  </p>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500">
                    {testimonial.location}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-15 bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-15 bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
