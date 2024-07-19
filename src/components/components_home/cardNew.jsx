import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import check_in from "../../assets/Logo/logo_product_card/check_in.png";
import sharenetwork from "../../assets/Logo/logo_product_card/sharenetwork.png";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const NewCard = ({ product }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  const toggleHeart = async () => {
    try {
      setIsFilled(!isFilled);

      const action = isFilled ? "remove" : "add"; // ตรวจสอบว่าต้องการลบหรือเพิ่ม
      const response = await axios.post("http://localhost:5000/api/car-list/togglePin", {
        userId: userId,
        carId: product._id, // หรือเปลี่ยนเป็นตัวแปรที่เก็บ _id ของ product นี้
        action: action
      });

      console.log(response.data); // แสดงผลลัพธ์จาก backend ที่ตอบกลับ
    } catch (error) {
      console.error("Error toggling pin:", error);
      // จัดการ error ตามที่คุณต้องการ
    }
  }

  return (
    <div className="bg-white rounded-[20px] border-t shadow flex flex-col w-[360px] pb-4 hover:bg-gray-300">
      <div className="p-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[16px]">{product.brand} {product.model}</h3>
          <div className="flex gap-2 relative">
            <div onClick={toggleHeart} style={{ cursor: 'pointer', fontSize: '24px' }}>
              {isFilled ? <AiFillHeart color="#00008B" /> : <AiOutlineHeart color="grey" />}
            </div>
            <img src={sharenetwork} className="h-4 m-1" alt="Share" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-light text-[12px]">{product.type}</h3>
        </div>
      </div>
      <img
        className="object-scale-down h-[140px] self-center"
        src={product.file1}
        alt={product.file1}
      />
      <div className="flex justify-between mx-6">
        <div className="flex items-center">
          <img src={check_in} className="h-2.5" alt="Check-in" />
          <p className="ml-1 text-[15px]">{product.address}</p>
        </div>
        <div className="flex mx-6 text-[15px]">
          <h4>THB </h4>
          <h4 className="mx-1 font-bold">{product.price.toLocaleString()}</h4>
        </div>
      </div>
      <div className="border-t border-gray-300 mx-7 my-1 py-1"></div>
      <div className="flex flex-col">
        <Link
          className="mx-6 py-2 text-center bg-[#3E5685] text-white hover:bg-blue-950 rounded-md text-[18px]"
          to={`/buy_productcard_info/${product._id}`}
        >
          ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
};
