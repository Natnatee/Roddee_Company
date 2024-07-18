import { useState, useEffect, useContext } from "react";///1
import { Link } from "react-router-dom";
import check_in from "../../assets/Logo/logo_product_card/check_in.png";
import sharenetwork from "../../assets/Logo/logo_product_card/sharenetwork.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axiosInstance from "../../utils/axiosInstance";
import { UserContext } from "../../context_component/Usercontext";///2
import { Tooltip } from "flowbite-react";

export const ProductCard = ({ product }) => {
  const [isFilled, setIsFilled] = useState(false);
  const { User } = useContext(UserContext);///3

  useEffect(() => {
    if (
      User &&
      Array.isArray(User.pinned) &&
      User.pinned.includes(product._id)
    ) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [User, product]);

  const toggleHeart = async () => {
    try {
      setIsFilled(!isFilled);

      const action = isFilled ? "remove" : "add";
      const response = await axiosInstance.post("/car-list/togglePin", {
        userId: User._id,
        carId: product._id,
        action: action,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  return (
    <div className="bg-white rounded-[20px] shadow flex flex-col w-[360px] h-[320px] hover:bg-gray-300 duration-200  border-[0.5px]">
      <div>
        <div className="flex justify-between items-center ">
          <Tooltip content={`${product.headline}`}>
            <h3 className="font-bold text-[16px] ml-6 mt-2 " 
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
              {product.headline}
            </h3>
          </Tooltip>
         
          <div className="flex gap-2 relative mt-2">
            <div
              onClick={toggleHeart}
              style={{ cursor: "pointer", fontSize: "24px" }}
            >
              {isFilled ? (
                <AiFillHeart color="#3E5685" />
              ) : (
                <AiOutlineHeart color="grey" />
              )}
            </div>
            <img src={sharenetwork} className="h-4 mr-6 mt-1" alt="Share" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-light text-[12px] ml-6">{product.type}</h3>
        </div>
      </div>
      <img
        className="object-cover h-[165px] w-[312px] mt-1 self-center rounded-lg"
        src={product.file1}
        alt={product.file1}
      />
      <div className="flex justify-between mx-6 mt-2">
        <div className="flex items-center">
          <img src={check_in} className="h-2.5" alt="Check-in" />
          <Tooltip content={`${product.address}`} placement="right">
            <p className="ml-1 text-[16px]"  
               style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
              {product.address}
           </p>
          </Tooltip>
        </div>
        <div className="flex text-[16px]">
          <h4 className="mr-1">THB </h4>
          <h4 className="font-bold ">{product.price.toLocaleString()}</h4>
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
  );
};
