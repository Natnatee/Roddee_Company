import { useRef, useState, useEffect } from "react";
import leftArrow from "../../assets/Logo/logo_product_card/left_slide.png";
import rightArrow from "../../assets/Logo/logo_product_card/right_slide.png";
import banner1 from "../../assets/banners/banner-1.jpg";
import banner2 from "../../assets/banners/banner-2.jpg";
import banner3 from "../../assets/banners/banner-3.jpg";
import banner4 from "../../assets/banners/banner-4.jpg";

const Banner = () => {
  const slides = [
    { src: banner1, alt: "banner-1" },
    { src: banner2, alt: "banner-2" },
    { src: banner3, alt: "banner-3" },
    { src: banner4, alt: "banner-4" },
  ];

  const bannerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleBanner = () => {
    if (bannerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = bannerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const bannerLeft = () => {
    if (bannerRef.current) {
      bannerRef.current.scrollBy({ left: -1152, behavior: "smooth" });
    }
  };

  const bannerRight = () => {
    if (bannerRef.current) {
      bannerRef.current.scrollBy({ left: 1152, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.addEventListener("scroll", handleBanner);
      handleBanner(); // Check initial state
    }
    return () => {
      if (bannerRef.current) {
        bannerRef.current.removeEventListener("scroll", handleBanner);
      }
    };
  }, []);

  return (
    <section>
      <div className="flex flex-col">
        <h1 className="text-xl mb-6 mt-8 font-bold"> โปรโมชั่นประจำเดือน</h1>
        <div className="relative w-[1128px] mx-auto">
          {/* {!isAtStart && (
            <img
              src={leftArrow}
              alt="Scroll Left"
              onClick={bannerLeft}
              className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full shadow-md hover:scale-110"
            />
          )} */}
          <div
            className="flex  whitespace-nowrap  rounded gap-[24px]"
            ref={bannerRef}
          >
            {slides.map((slide, index) => (
              <div key={index} className="">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className=" object-cover rounded-lg   hover:scale-110 duration-300"
                />
              </div>
            ))}
          </div>
          {/* {!isAtEnd && (
            <img
              src={rightArrow}
              alt="Scroll Right"
              onClick={bannerRight}
              className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 cursor-pointer rounded-full shadow-md hover:scale-110"
            />
          )} */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
