import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTransaction } from "../API/API_Transaction";

function Payment({ data }) {
  const transaction = data.transaction;
  const navigate = useNavigate();
  console.log(transaction);
  const createTransactionAPI = async () => {
    console.log("start");
    try {
      const transactionData = await createTransaction(transaction);
      console.log("transactionData::", transactionData);
      navigate("/paymentresult", { state: { transactionData } });
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <form id="inform" className="mb-[55px]">
      <div className="flex flex-col ">
        <div
          id="selectTypeOfPayment"
          className="p-6 flex flex-col  text-2xl border border-[#E1E1E1]  rounded-[20px]"
        >
          <p className="font-semibold mb-7">เลือกรูปแบบการชำระเงิน</p>
          <ul className="flex justify-between mb-[21px]">
            <li className="w-[120px] h-[80px]">
              <img
                src="https://res.cloudinary.com/dyrs3bvzj/image/upload/v1721057781/trkln8dgibfhhioylnvr.jpg"
                alt="visa"
                className="w-[120px] h-[80px] border border-[#E1E1E1] rounded-lg p-1"
              />
            </li>
            <li className="w-[120px] h-[80px]">
              <img
                src="https://res.cloudinary.com/dyrs3bvzj/image/upload/v1721057749/ftpoiz1vrislxs2c2s3n.webp"
                alt="mastercard"
                className="object-contain w-[120px] h-[80px] border border-[#E1E1E1] rounded-lg p-1 grayscale"
              />
            </li>
            <li className="w-[120px] h-[80px]">
              <img
                src="https://res.cloudinary.com/dyrs3bvzj/image/upload/v1721057778/imgyrejtcfdpmea7tki9.png"
                alt="promptpay"
                className="object-contain w-[120px] h-[80px] border border-[#E1E1E1] rounded-lg p-1 grayscale"
              />
            </li>
            <li className="w-[120px] h-[80px]">
              <img
                src="https://res.cloudinary.com/dyrs3bvzj/image/upload/v1721057734/plf4je4qdzblzgaemmfy.png"
                alt="binance"
                className="object-contain w-[120px] h-[80px] border border-[#E1E1E1] rounded-lg p-1 grayscale"
              />
            </li>
            <li className="w-[120px] h-[80px]">
              <img
                src="https://res.cloudinary.com/dyrs3bvzj/image/upload/v1721057745/rq3gbzgzkvdg0ueocnld.png"
                alt="kplus"
                className="object-contain w-[120px] h-[80px] border border-[#E1E1E1] rounded-lg p-1 grayscale"
              />
            </li>
          </ul>
          <p className="font-semibold mb-6">ข้อมูลการชำระเงิน</p>
          <input
            type="number"
            placeholder="เลขบัตร"
            className=" h-[56px]  px-5 mb-8 rounded-[15px] border border-[#E1E1E1] text-base font-medium"
          />
          <input
            type="number"
            placeholder="ชื่อเจ้าของบัตร"
            className=" h-[56px]  px-5  mb-8 rounded-[15px] border border-[#E1E1E1]  text-base font-medium"
          />
          <div className="flex flex-row gap-6 mb-4 ">
            <input
              type="number"
              placeholder="CVV"
              className=" h-[56px]  px-5 w-full rounded-[15px] border border-[#E1E1E1] text-base font-medium"
            />
            <input
              type="text"
              placeholder="Expiration MM/YY"
              className=" h-[56px]  px-5 w-full   rounded-[15px] border border-[#E1E1E1] text-base font-medium"
            />
          </div>

          <div className="flex">
            <input type="checkbox" className="h-4 w-4  mt-1 mr-2" />
            <label className="text-base font-extralight ">
              ต้องการใบกำกับภาษี
            </label>
          </div>
        </div>
        <div
          id="hire"
          className="mt-10  px-6 pt-3 pb-4  grid grid-cols-1 grid-rows-2 border border-[#E1E1E1] rounded-[20px]"
        >
          <div className="flex  ">
            <input type="checkbox" className="h-4 w-4 mr-2 mt-1" />
            <label>กรุณาตรวจสอบข้อมูลการซื้อให้ครบถ้วนก่อนการกดยืนยัน</label>
          </div>
          <Link
            className=" h-[48px] bg-[#3E5685] rounded-[10px] text-white text-2xl flex justify-center"
            onClick={createTransactionAPI}
          >
            <input
              type="button"
              value="ยืนยันการชำระเงิน"
              className="cursor-pointer border-none text-lg"
            />
          </Link>
        </div>
      </div>
    </form>
  );
}

export default Payment;
