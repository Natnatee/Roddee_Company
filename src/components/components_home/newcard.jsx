import React, {useState} from "react";
import { Link } from "react-router-dom";
import star from "../../assets/Logo/logo_product_card/star.png";
import check_in from "../../assets/Logo/logo_product_card/check_in.png";
import sharenetwork from "../../assets/Logo/logo_product_card/sharenetwork.png";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; 

export const NewCard = ({ product }) => {

    const [isFilled, setIsFilled] = useState(false);
  
    const toggleHeart = () => {
      setIsFilled(!isFilled);
    }
 

  return (
    <>
  <div className="bg-white rounded-[20px] border-t shadow flex flex-col w-[360px] h-[320px] hover:bg-gray-300 duration-200">
    <div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-[16px] ml-6 mt-2">{product.brand}</h3>
        <div className="flex gap-2 relative mt-2">
          <div onClick={toggleHeart} style={{ cursor: 'pointer', fontSize: '24px' }}>
            {isFilled ? <AiFillHeart color="#00008B" /> : <AiOutlineHeart color="grey" />}
          </div>
          <img src={sharenetwork} className="h-4 mr-6 mt-1" alt="Share" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-light text-[12px] ml-6">{product.model}</h3>

      </div>
    </div>
    <img className="object-cover h-[165px] w-[312px] mt-1 self-center rounded-lg" src={product.file1} alt={product.brand} />
    <div className="flex justify-between mx-6 mt-2 ">
      <div className="flex items-center">
        <img src={check_in} className='h-2.5' alt="Check-in" /><p className="ml-1  text-[16px] ">{product.address}</p>
      </div>
      <div className="flex  text-[16px]">
        <h4>THB </h4>
        <h4 className=" font-bold">{product.price.toLocaleString()}</h4>
      </div>
    </div>
    <div className="border-t border-gray-300 mx-6 my-1 py-1"></div>
    <div className="flex flex-col">
      <Link
        className="mx-6 h-[40px] flex justify-center items-center bg-[#3E5685] text-white hover:bg-blue-950 rounded-md text-[16px]"
        to={`/buy_productcard_info/${product._id}`}
      >
        ดูรายละเอียด
      </Link>
    </div>
  </div>
  </>
  )
};
