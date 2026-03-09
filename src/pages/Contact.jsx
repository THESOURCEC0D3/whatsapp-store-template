import { useState } from "react";
import Header from "../components/Header";
import MobileSidebar from "../components/MobileSidebar";
import Footer from "../components/Footer";
import ContactButton from "../components/ContactButton";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header setIsOpen={setIsOpen} />
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className="min-h-screen flex justify-center items-center bg-cover relative"
        style={{ backgroundImage: "url('/assets/contactpagebgimg1.jpg')", backgroundPosition: "50% 20%" }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10">
          <ContactButton />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
