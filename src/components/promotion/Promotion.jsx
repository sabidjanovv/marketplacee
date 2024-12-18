import React from "react";
import promotion from "@/assets/images/promotion.png";
const Promotion = () => {
  return (
    <div className=" container mb-[120px]">
      <div className="space-y-6">
        <div className="content flex flex-col justify-center items-center gap-4 text-center">
          <span className=" text-blue-500 font-bold text-[16px] leading-4">
            PROMOTION
          </span>
          <h1 className="font-medium leading-10 text-[40px] ">
            Winter Collections
          </h1>
          <p className="font-normal text-[20px] leading-8">
            Introducing the new winter jackets.
          </p>
        </div>
        <div className="">
          <img
            src={promotion}
            className="w-full h-full bg-contain bg-no-repeat"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Promotion;
