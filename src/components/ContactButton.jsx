const PHONE = 2348065429005;
const MESSAGE = "I am coming from your website, I want to speak with you";

const ContactButton = () => {
  const whatsappLink = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

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
