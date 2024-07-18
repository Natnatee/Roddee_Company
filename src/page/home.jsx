// import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slide from "../components/components_home/slide";
import WhyMe from "../components/components_home/why_me";
import CarBrands from "../components/components_home/CarBrands";
import ScrollNew from "../components/components_home/scrollNew";
import Search from "../components/champ/search"; // Adjusted import
import Banner from "../components/components_home/banner";
import ScrollRandom from "../components/components_home/scrollRandom";
import ScrollTop from "../components/components_home/scrollTop";

function Home() {
  // const audioRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (searchValue) => {
    navigate("/buy", { state: { searchValue } });
  };

  console.log(handleSearchSubmit);
  

  return (
    <div className="flex justify-center">
      {/* <audio ref={audioRef} src={tokyoDrift} /> */}
      <div className="w-full">
        <div className="relative bg-slate-600 ">
          <Slide/>
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 flex justify-center">
            <Search onSearchSubmit={handleSearchSubmit} />
          </div>
        </div>
        <div className="flex justify-center m-14">
          <div className="w-[1128px]">
            <CarBrands />
            <Banner />
            <ScrollRandom />
            <ScrollNew />
            <ScrollTop/>
          </div>
        </div>
        <WhyMe />
      </div>
    </div>
  );
}

export default Home;
