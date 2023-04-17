import Image from 'next/image';
import React from 'react';

import userImg from '../assets/images/user1.png';
import userImg1 from '../assets/images/user2.png';
import userImg2 from '../assets/images/user3.png';

const Review = () => {
  return (
    <div id="reviews" className="relative p-4 mb-4">
      <div className="flex justify-center items-center  p-3">
        <button className="mt-[90px] mb-4 bg-blue-200 hover:bg-blue-600 px-4 py-1 rounded-2xl text-blue-500 hover:text-white h-8 w-28 font-black text-xs uppercase cursor-pointer ">
          reviews
        </button>
      </div>
      <div className="relative ">
        <div className="flex flex-col justify-center items-center">
          <p className="text-[90px] sm:text-[180px] text-blue-700 opacity-5 font-black text-center z-0 absolute top-0 left-0 w-full uppercase dark:text-white">
            reviews
          </p>
          <p className="text-4xl text-blue-900 font-bold text-center z-20 relative capitalize mt-10 sm:mt-28 dark:text-gray-300">
            what our customers say
          </p>
        </div>
      </div>

      <div className="relative justify-center items-center">
        <p className="font-medium text-base text-center mt-20  text-bluePText">
          &quot;A well-designed real estate website can be the bridge
          <br /> that connects buyers to their dream homes,
          <br /> and sellers to the right buyers.&quot;
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center mt-[60px] ml-[30px]  ">
        <div className=" flex flex-col mb-5">
          <div className="w-[350px] h-[160px] flex items-start p-[30px] gap-[10px] bg-white  dark:bg-slate-700 shadow-md rounded-[10px] ">
            <p className=" font-semibold text-[13px] leading-[25px] text-bluePText dark:text-white">
              Thank you very much for the house found. This is an ideal option
              for our family at the location and price. The company employs real
              professionals who will always
            </p>
          </div>
          <div className="flex items-start gap-5 w-auto h-[50px] mt-[30px]">
            <Image
              src={userImg}
              alt="user "
              className="w-[50px] h-[50px] bg-[#8833FF4D] rounded-full ml-4"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="font-bold text-sm leading-[30px] text-cardText capitalize  dark:text-white">
                herbert lindsey
              </p>
              <p className="font-semibold text-xs text-blueCardSubTitle leading-5">
                New York, USA
              </p>
            </div>
          </div>
        </div>

        <div className=" flex flex-col mb-5">
          <div className="w-[350px] h-[185px] flex items-start p-[30px] gap-[10px] bg-white  dark:bg-slate-700 shadow-md rounded-[10px] ml-[30px]  ">
            <p className=" font-semibold text-[13px] leading-[25px] text-bluePText dark:text-white">
              A gentleman from New York discovered what he calls an “oversight”
              on the part of 99.9% of all marketers that allows him to get
              otherwise paid-for advertising at Google as well as all other
              search engines.
            </p>
          </div>
          <div className="flex items-start gap-5 w-auto h-[50px] mt-[30px]">
            <Image
              src={userImg1}
              alt="user "
              className="w-[50px] h-[50px] bg-[#CC74294D] rounded-full ml-12"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="font-bold text-sm leading-[30px] text-cardText capitalize  dark:text-white">
                Noah Russell
              </p>
              <p className="font-semibold text-xs text-blueCardSubTitle leading-5">
                New York, USA
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-5">
          <div className="w-[350px] h-[160px] flex items-start p-[30px] gap-[10px] bg-white  dark:bg-slate-700 shadow-md rounded-[10px] ml-[30px] ">
            <p className=" font-semibold text-[13px] leading-[25px] text-bluePText dark:text-white">
              For many of us, our very first experience of learning about the
              celestial bodies begins when we saw our first full moon in the
              sky. It is truly a magnificent view even
            </p>
          </div>
          <div className="flex items-start gap-5 w-auto h-[50px] mt-[30px]">
            <Image
              src={userImg2}
              alt="user "
              className="w-[50px] h-[50px] bg-[#E62E7B4D] rounded-full ml-12"
            />
            <div className="flex flex-col justify-center items-start">
              <p className="font-bold text-sm leading-[30px] text-cardText capitalize  dark:text-white">
                Nellie Griffith
              </p>
              <p className="font-semibold text-xs text-blueCardSubTitle leading-5">
                New York, USA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
