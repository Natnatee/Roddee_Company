import Audi from "../../assets/Logo/carLogo/audi-logo.jpg";
import BMW from "../../assets/Logo/carLogo/BMW.jpg";
import Jaguar from "../../assets/Logo/carLogo/Jaguar.jpg";
import LandRover from "../../assets/Logo/carLogo/Land-Rover.jpg";

import MercedesBenz from "../../assets/Logo/carLogo/Mercedes-Benz-removebg-preview.png";
import Mini from "../../assets/Logo/carLogo/Mini-logo.jpg";
import Peugeot from "../../assets/Logo/carLogo/Peugeot.jpg";
import Porsche from "../../assets/Logo/carLogo/PORSCHE-logo.jpg";
import Tesla from "../../assets/Logo/carLogo/Tesla-logo.jpg";
import Volkswagen from "../../assets/Logo/carLogo/Volkswagen.jpg";
import Volvo from "../../assets/Logo/carLogo/Volvo-logo.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const carBrands = [
  { src: Audi, alt: "Audi" },
  { src: BMW, alt: "BMW" },
  { src: Jaguar, alt: "Jaguar" },
  { src: LandRover, alt: "Land Rover" },
  { src: MercedesBenz, alt: "Mercedes-Benz" },
  { src: Mini, alt: "Mini" },
  { src: Peugeot, alt: "Peugeot" },
  { src: Porsche, alt: "Porsche" },
  { src: Tesla, alt: "Tesla" },
  { src: Volkswagen, alt: "Volkswagen" },
  { src: Volvo, alt: "Volvo" },
];



const CarBrands = () => {

  const navigate = useNavigate();
  const handleBrandClick = (alt) => {
    navigate('/buy', { state: { searchValue: alt } });
  };

  return (
    // <div className="w-full overflow-x-auto shadow rounded">
    <div>
      <h2 className="text-xl font-bold mb-4 mt-4 text-center">
        ยี่ห้อรถยนต์ทั้งหมด
      </h2>
      <div className="flex justify-center gap-4 ">
        {carBrands.map((brand, index) => (
          <div key={index} className="shadow rounded-xl flex-shrink-0 " >
              <img
               onClick={() => handleBrandClick(brand.alt)}
                src={brand.src}
                alt={brand.alt}
                className="h-[88px] hover:shadow-2xl duration-200 rounded-xl"
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarBrands;
