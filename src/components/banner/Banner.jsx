import React from "react";
import banner from "@/assets/images/banner.png";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
  return (
    <div className="mt-[100px] mb-10 grid grid-cols-2 max-[800px]:grid-cols-1 gap-0 overflow-hidden">
      <div>
        <img
          src={banner}
          alt=""
          className="w-full h-auto max-w-full bg-cover bg-no-repeat bg-center"
        />
      </div>
      <div className="flex items-center bg-[#F3F5F7] px-5 py-10">
        <div className="flex flex-col gap-4 max-w-[400px]">
          <p className="text-blue-500 font-bold leading-4 text-[16px]">
            SALE UP TO 35% OFF
          </p>
          <h2 className="leading-10 font-medium text-[40px]">
            HUNDREDS of New lower prices!
          </h2>
          <p className="text-[20px] text-[#141718] leading-8 font-normal">
            Hurry up!!! Winter is coming!
          </p>
          <Link
            to={"/"}
            className="flex items-center gap-2 w-[100px] border-b-2 border-b-black mt-6"
          >
            Shop Now
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
