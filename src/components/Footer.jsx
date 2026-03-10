import { config } from "../config";

const Footer = () => {
  return (
    <div className="bg-gray-100 text-white p-5 text-center">
      <span className="text-black">
        © 2026 {config.footerName}. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
