import {motion} from "framer-motion";
import { config } from "../config";

const WhyChooseUs = () => {
  const features = config.whyChooseUs;

  const containerVariants = {
    hidden: { opacity: 0, y: 80},
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, staggerChildren: 0.5, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-neutral-50 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="text-4xl font-bold text-black text-center">
          Why Choose Us
        </h2>
        <div className="max-w-7xl mx-auto text-center flex flex-col md:flex-row items-center gap-12 p-2">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.1 }}
            className="flex-1"
          >
            <img src="/assets/WCU1.jpg" className="rounded-2xl"></img>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-1 gap-8 rounded-2xl flex-1"
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white w-full p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 cursor-pointer size-full"
              >
                <h3 className="text-xl font-semibold mb-3 text-black">{item.title}</h3>
                <p className="text-black text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default WhyChooseUs