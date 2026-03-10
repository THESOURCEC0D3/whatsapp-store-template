import { config } from "../config";

const ContactButton = () => {
  const whatsappLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.contactMessage)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 bg-purple-600 text-white text-lg font-semibold rounded-2xl shadow-lg hover:bg-purple-700 transition-colors duration-300"
    >
      Contact Us
    </a>
  );
};

export default ContactButton;
