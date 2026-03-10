import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import Footer from "../components/Footer.jsx";
import Testimonials from "../components/Testimonial.jsx";
import MobileSidebar from "../components/MobileSidebar";
import { useState } from "react";

const Home = () => {
   const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
