import { config } from "../config";

const Hero = () => {
  return (
    <div className="pt-22">
      {/* Mobile image — shown on small screens, hidden on large */}
      <div
        className="lg:hidden w-full h-screen bg-no-repeat bg-cover bg-top"
        style={{ backgroundImage: `url('${config.heroImages.mobile}')` }}
      />
      {/* Desktop image — hidden on small screens, shown on large */}
      <div
        className="hidden lg:block w-full h-screen bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${config.heroImages.desktop}')` }}
      />
    </div>
  );
};

export default Hero;
