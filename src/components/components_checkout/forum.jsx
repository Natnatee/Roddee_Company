import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Forum({ data }) {
  const { transaction, setTransaction } = data;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setTransaction({ ...transaction, [name]: value });
  };

  useEffect(() => {
    console.log(transaction);
  }, [transaction]);

  return (
    <form id="informUser" className="mb-[55px]">
      <div className="flex flex-col  border border-[#E1E1E1] rounded-[20px]  px-6 pt-[28px] pb-10 text-base">
        <p className="font-semibold text-2xl mb-8 ">กรอกข้อมูล</p>
        <label className="font-medium text-sm mb-2 ">ที่อยู่จัดส่ง</label>
        <input
          type="text"
          name="address"
          value={transaction.address}
          onChange={handleChange}
          placeholder="ที่อยู่"
          className="  h-[56px] mb-6   px-5 rounded-2xl border border-[#E1E1E1] font-medium text-base"
        />
        <label className="font-medium text-sm mb-2 ">ข้อมูลเพิ่มเติม</label>
        <input
          type="text"
          name="etc"
          value={transaction.etc}
          onChange={handleChange}
          placeholder="ข้อมูลเพิ่มเติม (ถ้ามี) "
          className=" h-[56px] mb-6   px-5 rounded-2xl border border-[#E1E1E1] font-medium text-base"
        />
        <label className="font-medium text-sm mb-2 ">เลือกวันที่รับรถ</label>
        <input
          type="date"
          name="Sell_Date"
          value={transaction.Sell_Date}
          onChange={handleChange}
          placeholder="เลือกวันที่"
          className=" h-[56px]   px-5 rounded-2xl border border-[#E1E1E1]  font-medium text-base"
        />
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
          to="/Checkout2"
          className=" h-[48px] bg-[#3E5685] rounded-[10px] text-white text-2xl flex justify-center"
          state={transaction}
        >
          <input
            type="submit"
            value="ซื้อรถคันนี้"
            className="cursor-pointer border-none text-lg"
          />
        </Link>
      </div>
    </form>
  );
}

export default Forum;
