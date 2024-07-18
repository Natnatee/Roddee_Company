import { useState, useEffect } from "react";
import left from "../../assets/Logo/logo_other/left.png";
import right from "../../assets/Logo/logo_other/right.png";
import Audi from '../../assets/Slide/Audi.jpg';
import BMW from "../../assets/Slide/bmw.jpg";
import Jaguar from "../../assets/Slide/Jaguar.jpg";
import LandRover from "../../assets/Slide/range-rover.jpg";
import MercedesBenz from "../../assets/Slide/Mercedes-Benz.jpg";
import Mini from "../../assets/Slide/mini.jpg";
import Peugeot from "../../assets/Slide/Peugeot.jpg";
import Tesla from "../../assets/Slide/Tesla.jpg";
import Volkswgan from "../../assets/Slide/volkswgan.jpg";
import Volvo from "../../assets/Slide/Volvo.jpg";
import Porsche from "../../assets/Slide/porsche-normal.jpg";

const CarSlideshow = () => {
  const slides = [
    { src: Audi, alt: "Audi" },
    { src: BMW, alt: "BMW" },
    { src: Jaguar, alt: "Jaguar" },
    { src: LandRover, alt: "Land Rover" },
    { src: MercedesBenz, alt: "Mercedes-Benz" },
    { src: Mini, alt: "Mini" },
    { src: Peugeot, alt: "Peugeot" },
    { src: Tesla, alt: "Tesla" },
    { src: Volkswgan, alt: "Volkswagen" },
    { src: Volvo, alt: "Volvo" },
    { src: Porsche, alt: "Porsche" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <section id="SlideShow" className="flex flex-col">
      <div id="carImagesMain" className="relative mt-auto pointer-events-auto h-2/6">
        <div className="relative w-full h overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {slides.map((item, index) => (
              <div className="w-full flex-shrink-0 h-[500px]" key={index}>
                <a href={item.href} title={item.alt}>
                  <picture className="block w-full h-[500px]">
                    <source media="(min-width:1024px)" srcSet={item.src} className="w-full h-[500px] object-cover" />
                    <img src={item.src} className="w-full h-[500px] object-cover" alt={item.alt} />
                  </picture>
                </a>
              </div>
            ))}
          </div>
        </div>
        <img onClick={handlePrevClick} className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer hover:scale-110 duration-200" src={left} />
        <img onClick={handleNextClick} className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer hover:scale-110 duration-200" src={right} />
      </div>
    </section>
  );
};

export default CarSlideshow;