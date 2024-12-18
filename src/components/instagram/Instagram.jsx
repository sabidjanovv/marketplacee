import React from "react";
import insta1 from "@/assets/images/insta1.png";
import insta2 from "@/assets/images/insta2.png";
import insta3 from "@/assets/images/insta3.png";
import insta4 from "@/assets/images/insta4.png";
import car from "@/assets/images/car.png";
import cam from "@/assets/images/cam.png";
import lock from "@/assets/images/lock.png";
import call from "@/assets/images/call.png";

const urls = [insta1, insta2, insta3, insta4];

const icons = [
  {
    id: 1,
    image: car,
    title: "Free Shipping",
    secure: "Order above $200",
  },
  {
    id: 2,
    image: cam,
    title: "Money-back",
    secure: "30 days guarantee",
  },
  {
    id: 3,
    image: lock,
    title: "Secure Payments",
    secure: "Secured by Stripe",
  },
  {
    id: 4,
    image: call,
    title: "24/7 Support",
    secure: "Phone and Email support",
  },
];

const Instagram = () => {
  const instagramItems = urls?.map((item) => (
    <div key={item} className="w-full">
      <img
        src={item}
        alt=""
        className="w-full h-auto rounded-lg object-cover"
      />
    </div>
  ));

  const iconItems = icons?.map((item) => (
    <div
      key={item.id}
      className="flex flex-col items-center gap-2 p-4 w-[200px] md:w-[150px] max-[500px]:w-[100%] text-center"
    >
      <div>
        <img src={item.image} alt={item.title} className="w-12 h-12" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[18px] leading-7">{item.title}</p>
        <p className="text-[#6C7275] text-[14px]">{item.secure}</p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="container flex flex-col gap-10 mb-14 px-4 max-[500px]:px-2">
        <div className="content flex flex-col items-center text-center justify-center gap-4">
          <p className="uppercase font-bold text-[16px] leading-4 text-[#6C7275]">
            newsfeed
          </p>
          <h3 className="font-medium leading-10 text-[32px] max-[450px]:text-[28px]">
            Instagram
          </h3>
          <p className="text-[16px] max-[450px]:text-[14px]">
            Follow us on social media for more discount & promotions
          </p>
          <span className="font-medium text-[20px] text-[#6C7275] max-[450px]:text-[16px]">
            @3legant_official
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1">
          {instagramItems}
        </div>
      </div>

      <section className="flex justify-center flex-wrap gap-32 max-[500px]:gap-4">
        {iconItems}
      </section>
    </>
  );
};

export default Instagram;
