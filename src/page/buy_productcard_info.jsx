import example_products from "../data/example_products";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect, useContext } from "react";
import star from "../assets/Logo/Icon_productcard_info/star.png";
import verify from "../assets/Logo/Icon_productcard_info/Verified.png";
import favwhite from "../assets/Logo/Icon_productcard_info/favwhite.png";
import bagtype from "../assets/Logo/Icon_productcard_info/bagtype.png";
import cartype from "../assets/Logo/Icon_productcard_info/cartype.png";
import doortype from "../assets/Logo/Icon_productcard_info/doortype.png";
import enginetype from "../assets/Logo/Icon_productcard_info/enginetype.png";
import gastype from "../assets/Logo/Icon_productcard_info/gastype.png";
import geartype from "../assets/Logo/Icon_productcard_info/geartype.png";
import mdi_favorite from "../assets/Logo/Icon_productcard_info/mdi_favourite.png";
import seatnum from "../assets/Logo/Icon_productcard_info/seatnum.png";
import seattype from "../assets/Logo/Icon_productcard_info/seattype.png";
import share from "../assets/Logo/Icon_productcard_info/share.png";
import { getCarById } from "../components/API/API_Cars";
import { Link } from "react-router-dom";
import carmeter from "../assets/Logo/Icon_productcard_info/meter.png";
import carcolor from "../assets/Logo/Icon_productcard_info/color.png";

import { UserContext } from "../context_component/Usercontext";
import axiosInstance from "../utils/axiosInstance";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import sharenew from "../assets/Logo/Icon_productcard_info/sharenew.png";

function Buy_ProductCard_Info() {
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const { User } = useContext(UserContext);
  const [isFilled, setIsFilled] = useState(false);

  console.log("DATA😊", Data);
  let paymentData = Data && {
    img: Data.file1,
    headline: Data.headline,
    brand: Data.brand,
    model: Data.model,
    year: Data.year,
    address: Data.address,
    Sell_Price: Data.price,
    Purchase_Price: ~~(Data.price * 1.02),
    type: Data.type,
    fuel: Data.fuel,
    Seller_User: Data.Seller_User,
    Product_Id: Data._id,
  };
  console.log("😂", paymentData);

  useEffect(() => {
    if (id) {
      fetchCarData(id);
    }
  }, [id]);
  // const { name_id } = useParams();
  // const id = parseInt(name_id.split("_").pop());
  // const product = example_products.find((product) => product.id === id);

  // const [lscore, setlscore] = useState(true);
  // const [rscore, setrscore] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const fetchCarData = async (carId) => {
    const carData = await getCarById(carId);
    setData(carData);
  };

  // function leftscore() {
  //   setlscore(true);
  //   setrscore(false);
  // }

  // function rightscore() {
  //   setlscore(false);
  //   setrscore(true);
  // }

  useEffect(() => {
    if (User && Array.isArray(User.pinned) && User.pinned.includes(Data._id)) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [User, Data]);

  const toggleHeart = async () => {
    try {
      setIsFilled(!isFilled);

      const action = isFilled ? "remove" : "add";
      const response = await axiosInstance.post("/car-list/togglePin", {
        userId: User._id,
        carId: Data._id,
        action: action,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  return (
    <>
      {Data && (
        <div className="flex justify-center">
          <div className="้w-[1128px] flex ">
            {/* -----------------------left -----------------------------------*/}

            <section className="w-[648px]">
              <div className="">
                <h1 className="h-24 flex items-center text-[28px] font-extrabold">
                  {Data.headline}
                </h1>
                <div className="relative">
                  <div className="show flex items-center">
                    <img
                      className="rounded-[10px] w-full h-[364px] object-cover"
                      src={Data.file1}
                      alt="X4-main"
                    />
                  </div>
                  <div className="show hidden ">
                    <img
                      className="rounded-[10px] w-full h-[364px] object-cover"
                      src={Data.file2}
                      alt="X4-1"
                    />
                  </div>
                  <div className="show hidden">
                    <img
                      className="rounded-[10px] w-full h-[364px] object-cover"
                      src={Data.file3}
                      alt="X4-2"
                    />
                  </div>
                  <div className="show hidden">
                    <img
                      className="rounded-[10px] w-full h-[364px] object-cover"
                      src={Data.file4}
                      alt="X4-3"
                    />
                  </div>
                  <div className="show hidden">
                    <img
                      className="rounded-[10px] w-full h-[364px] object-cover"
                      src={Data.file5}
                      alt="X4-4"
                    />
                  </div>
                  <div className="show hidden">
                    <img
                      className="rounded-[10px] w-full h-[364px] object-cover"
                      src={Data.file6}
                      alt="X4-5"
                    />
                  </div>
                  <div className="absolute top-1/2 transform translate-y-0 w-[660px] flex justify-between px-4  text-2xl font-black select-none">
                    <a
                      className="cursor-pointer backdrop-blur-sm bg-white/30 bg-gray-800 rounded-full px-2 hover:text-gray-500 duration-200"
                      onClick={() => plusSlides(-1)}
                    >
                      ❮
                    </a>
                    <a
                      className="cursor-pointer backdrop-blur-sm bg-white/30 bg-gray-800 rounded-full px-2 hover:text-gray-500 duration-200"
                      onClick={() => plusSlides(1)}
                    >
                      ❯
                    </a>
                  </div>
                </div>

                <div className="flex w-[98px] mt-2 gap-[12px]">
                  <img
                    className="silde cursor-pointer rounded-[5px] hover:border border-blue-500 duration-100 object-cover"
                    src={Data.file1}
                    onClick={() => currentSlide(1)}
                    alt="X4-main"
                  />
                  <img
                    className="silde cursor-pointer rounded-[5px] hover:border-2 border-blue-500 duration-100 object-cover"
                    src={Data.file2}
                    onClick={() => currentSlide(2)}
                    alt="X4-1"
                  />
                  <img
                    className="silde cursor-pointer rounded-[5px] hover:border-2 border-blue-500 duration-100 object-cover"
                    src={Data.file3}
                    onClick={() => currentSlide(3)}
                    alt="X4-2"
                  />
                  <img
                    className="silde cursor-pointer rounded-[5px] hover:border-2 border-blue-500 duration-100 object-cover"
                    src={Data.file4}
                    onClick={() => currentSlide(4)}
                    alt="X4-3"
                  />
                  <img
                    className="silde cursor-pointer rounded-[5px] hover:border-2 border-blue-500 duration-100 object-cover"
                    src={Data.file5}
                    onClick={() => currentSlide(5)}
                    alt="X4-4"
                  />
                  <img
                    className="silde cursor-pointer rounded-[5px] hover:border-2 border-blue-500 duration-100 object-cover"
                    src={Data.file6}
                    onClick={() => currentSlide(6)}
                    alt="X4-5"
                  />
                </div>

                {/* <div className="md:hidden">
                  <h1 className="mb-2 font-black text-xl mx-4 my-4">
                    Mercedes-Benz EQS-450
                  </h1>
                  </div> */}

                <section>
                  <main>
                    <h4 className="text-[20px] font-medium mt-6 ">
                      รายละเอียดรถยนต์
                    </h4>
                    <div className="border-t-2 border-t-blue-950 w-[153px] "></div>
                    <div className="border-t border-gray-300 py-1"></div>

                    <div className="text-[14px] mt-3">
                      {Data.additionalInfo}
                    </div>

                    {/* <!-- review part --> */}

                    <h4 class="font-medium  mt-8 text-[20px]">
                      รายงานตรวจสภาพรถยนต์
                    </h4>
                    <div class="border-t-2 border-t-blue-950 w-[212px] "></div>
                    <div class="border-t border-gray-300   "></div>

                    <div class="  rounded-[5px] py-2 flex justify-center mt-3 mx-4">
                      <h1 className="rounded-[5px] bg-[#3E5685] text-white py-2 w-[616px] flex justify-center font-semibold">
                        รถยนต์คันนี้ได้รับการปรับสภาพจากศูนย์ปรับสภาพรถยนต์มือสองของ
                        RODDEE
                      </h1>
                    </div>
                    <div class="border shadow-sm rounded-[5px] mx-4 flex justify-around h-[72px] items-center bg-slate-100 ">
                      <div>
                        <div class="flex justify-center ">
                          {/* <img class="mr-1 mt-[6px] h-[13px]"
                          src="../../icon/star.png"
                          alt='favourite'/> */}
                          <p>ความปลอดภัย</p>
                        </div>
                        <p>เหนือมาตรฐาน</p>
                      </div>
                      <div>
                        <div class="flex justify-center">
                          {/* <img class="mr-1 mt-[6px] h-[13px]"
                          src="/icon/Verified.png"
                          alt='favourite'/> */}
                          <p>100%</p>
                        </div>
                        <p>ขับขี่สะดวกสบาย</p>
                      </div>
                      <div>
                        <div class="flex justify-center">
                          {/* <img class="mr-1 mt-[6px] h-[13px]"
                          src="/icon/mdi_favourite.png"
                          alt='favourite'/> */}
                          <p>รถทุกคันผ่าน</p>
                        </div>
                        <p>การตรวจเช็คสภาพ</p>
                      </div>
                    </div>

                    <h4 className="font-medium  mt-8 text-[20px]">
                      เกี่ยวกับเรา
                    </h4>
                    <div className="border-t-2 border-t-blue-950 w-[92px] "></div>
                    <div className="border-t border-gray-300 py-1"></div>
                    <p className="mt-3 text-[14px] mb-8">
                      "RODDEE
                      เปลี่ยนประสบการณ์การซื้อขายรถหรูมือสองให้เป็นเรื่องง่ายและพิเศษกว่าที่เคย
                      ด้วยการดูแลจากทีมงานมืออาชีพที่มีความเชี่ยวชาญและทุ่มเทในการคัดสรรรถทุกคันอย่างพิถีพิถัน
                      เพื่อให้มั่นใจว่าทุกคันรถที่เรานำเสนออยู่ในสภาพที่ดีที่สุด
                      เราเข้าใจถึงความสำคัญของคุณภาพและความปลอดภัย
                      เพื่อให้ลูกค้าของเราได้รับความพึงพอใจสูงสุด RODDEE
                      มีบริการหลังการขายที่ยอดเยี่ยม
                      พร้อมทั้งให้คำปรึกษาและคำแนะนำในทุกขั้นตอนอย่างใกล้ชิด
                      ไม่ว่าจะเป็นเรื่องการเลือกซื้อ การตรวจสภาพรถ
                      หรือการดูแลรักษา RODDEE ไม่ใช่แค่แหล่งซื้อขายรถหรูมือสอง
                      แต่เป็นคู่คิดที่คุณวางใจได้เสมอ
                      และพร้อมอยู่เคียงข้างคุณในทุกๆ การตัดสินใจ"
                    </p>

                    {/* <h4 className="font-medium mx-4 mt-4 text-[20px]">Review </h4>
                    <div className="border-t-2 border-t-blue-950 w-[68px] mx-4 "></div>
                    <div className="border-t border-gray-300 mx-4 py-1"></div>

                    <div className="border shadow-sm rounded-[5px] mx-4 py-2 flex justify-around">
                      <div>
                        <div className="flex justify-center items-center gap-1">
                          <img className="" src={star} alt="favourite" />
                          <p>4.9</p>
                        </div>
                        <p>เรตติ้งทั้งหมด</p>
                      </div>
                      <div>
                        <div className="flex justify-center items-center gap-1">
                          <img className="h-4" src={verify} alt="favourite" />
                          <p>100%</p>
                        </div>
                        <p>ได้รถคันที่จอง</p>
                      </div>
                      <div>
                        <div className="flex justify-center items-center gap-1">
                          <img className="h-4" src={favwhite} alt="favourite" />
                          <p>50</p>
                        </div>
                        <p>คันที่อยากได้</p>
                      </div>
                    </div>
                    <div className="border shadow-sm rounded-[15px]  flex w-full h-[70px] mt-6">
                      {lscore ? (
                        <button
                          type="button"
                          className="rounded-[15px] bg-[#3E5685] text-white m-2 w-full "
                          onClick={leftscore}
                        >
                          คะแนนรถคันนี้
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="rounded-[15px]  m-2 w-full "
                          onClick={leftscore}
                        >
                          คะแนนรถคันนี้
                        </button>
                      )}

                      {rscore ? (
                        <button
                          type="button"
                          className="rounded-[15px] bg-[#3E5685] text-white m-2 w-full "
                          onClick={rightscore}
                        >
                          คะแนนรถคันนี้
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="rounded-[15px]  m-2 w-full "
                          onClick={rightscore}
                        >
                          คะแนนรถคันนี้
                        </button>
                      )}
                    </div>
                    {lscore ? (
                      <div className="h-[246px] flex justify-center items-center">
                        waiting1
                      </div>
                    ) : (
                      <div className="h-[246px] flex justify-center items-center">
                        waiting2
                      </div>
                    )} */}
                  </main>
                </section>
              </div>
            </section>
            {/* ----------------------------------------------------Right------------------------------------------------------------------- */}
            <section className=" w-[480px] flex flex-col pl-6 border-green-600">
              <div className=" max-md:hidden rounded-[20px] border shadow-md h-auto w-[456px] mt-[96px]">
                {/* h-[364px] */}
                <h2 className="ml-6 mt-3 mb-3 text-[18px] font-semibold">
                  รายละเอียด
                </h2>
                <h2 className="ml-6 mt-3 mb-3 font-black text-[16px]">
                  {Data.brand} {Data.model} ({Data.year})
                </h2>
                <h2 className="ml-6 mt-3 mb-3 text-[16px]">{Data.address}</h2>
                <div className="flex mt-3 mb-3 text-[12px] ">
                  <div className="ml-6 border rounded-[20px] py-[4px] px-[8px]">
                    {Data.type}
                  </div>
                  <div className="ml-2 border rounded-[20px] py-[4px] px-[8px]">
                    {Data.brand}
                  </div>
                  <div className="ml-2 border rounded-[20px] py-[4px] px-[8px]">
                    {Data.fuel}
                  </div>
                </div>

                <h2 className="flex justify-end mt-3 mr-6 mb-3 text-[16px] font-semibold ">
                  ราคา {Data.price} บาท
                </h2>
                <h2 className="flex justify-end mr-6 mt-3 mb-3 text-[12px]">
                  ยังไม่รวมภาษีมูลค่าเพิ่ม 2%
                </h2>

                <div className="flex flex-col gap-4">
                  <Link
                    to="/Checkout"
                    state={paymentData}
                    className="bg-[#3E5685] text-white font-semibold text-[18px] mx-6 w-[408px] h-[48px] hover:bg-[#677FAF] rounded-md duration-200 text-center place-content-center"
                  >
                    ซื้อรถคันนี้
                  </Link>
                  <div className="flex gap-1">
                    <button
                      className="bg-blue-100   ml-6 w-[336px] h-[48px] hover:bg-blue-200 rounded-md flex items-center place-content-center duration-200 gap-2 mb-5"
                      onClick={toggleHeart} 
                    >
                      {isFilled ? (
                        <AiFillHeart color="#3E5685" />
                      ) : (
                        <AiOutlineHeart  />
                      )}
                       <span className="font-semibold">เพิ่มรายการโปรด</span>
                    </button>
                    <button className="bg-[#ffffff] border border-gray-400  ml-1 w-[64px] h-[48px] hover:bg-blue-100 rounded-md flex items-center place-content-center duration-200">
                      <img className="h-[17px]" src={share} alt="" />
                    </button>
                  </div>
                </div>
              </div>

              {/* spec */}
              <div className="flex pt-[96px] items-center place-content-center">
                <div>
                  <div className="flex my-6">
                    <img
                      className="ml-8 mr-2 h-[42px]"
                      src={cartype}
                      alt="cartype"
                    />
                    <div>
                      <p className="text-[14px]">ประเภทรถยนต์</p>
                      <p className="font-bold text-[15px]">{Data.type}</p>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <img
                      className="ml-8 mr-2 h-[42px]"
                      src={seatnum}
                      alt="cartype"
                    />
                    <div>
                      <p className="text-[14px]">จำนวนที่นั่ง</p>
                      <p className="font-bold text-[15px]">
                        {Data.seat} ที่นั่ง
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <img
                      className="ml-8 mr-2 h-[42px]"
                      src={gastype}
                      alt="cartype"
                    />
                    <div>
                      <p className="text-[14px]">ระบบเชื้อเพลิง</p>
                      <p className="font-bold text-[15px]">{Data.fuel}</p>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <img
                      className="ml-8 mr-2 h-[42px]"
                      src={carmeter}
                      alt="cartype"
                    />
                    <div>
                      <p className="text-[14px]">เลขไมล์</p>
                      <p className="font-bold text-[15px]">{Data.mileage}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex my-6">
                    <img
                      className="ml-8 mr-2 h-[42px]"
                      src={geartype}
                      alt="cartype"
                    />
                    <div>
                      <p className="text-[14px]">ระบบเกียร์</p>
                      <p className="font-bold text-[15px]">{Data.gear}</p>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <img
                      className="ml-8 mr-2 h-[42px]"
                      src={seattype}
                      alt="cartype"
                    />
                    <div>
                      <p className="text-[14px]">ประเภทเบาะ</p>
                      <p className="font-bold text-[15px]">{Data.cushion}</p>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <img
                      className="ml-8 mr-2 h-[42px]"
                      src={enginetype}
                      alt="cartype"
                    />
                    <div>
                      <p className="text-[14px]">ความจุเครื่องยนต์</p>
                      <p className="font-bold text-[15px]">
                        {Data.enginecap} CC
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <img
                      className="ml-8 mr-2 h-[42px]"
                      src={carcolor}
                      alt="cartype"
                    />
                    <div>
                      <p className="text-[14px]">สีรถยนต์</p>
                      <p className="font-bold text-[15px]">{Data.color}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Etc */}
              <div className="self-center">
                <div>
                  <p className=" py-2 bg-[#3E5685] text-white hover:bg-blue-950 rounded-md text-[17px] w-[304px] mt-[96px] pl-4 duration-200">
                    เงื่อนไขข้อตกลง
                  </p>
                  <p className="py-2 bg-[#3E5685] text-white hover:bg-blue-950 rounded-md text-[17px] w-[304px] mt-6 pl-4 duration-200">
                    เอกสารที่ใช้เช่ารถ
                  </p>
                  <p className="py-2 bg-[#3E5685] text-white hover:bg-blue-950 rounded-md text-[17px] w-[304px] mt-6 pl-4 duration-200">
                    ประกันภัยรถยนต์
                  </p>
                  <p className="py-2 bg-[#3E5685] text-white hover:bg-blue-950 rounded-md text-[17px] w-[304px] mt-6  pl-4 duration-200 mb-8">
                    อื่นๆ
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

// ฟังก์ชันเพื่อเปลี่ยนรูปที่แสดง
let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("show");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

export default Buy_ProductCard_Info;
