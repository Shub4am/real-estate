import React from 'react';
import Tabs from '@/components/tabs';

const Deals = () => {
  return (
    <div id="deals" className="relative p-4 mb-4">
      <div className="flex justify-center items-center  p-3">
        <button className="mt-[90px] mb-4 bg-orange-200 hover:bg-orange-600 px-4 py-1 rounded-2xl text-orange-500 hover:text-white h-8 w-28 font-black text-xs uppercase cursor-pointer ">
          deals
        </button>
      </div>
      <div className="relative ">
        <div className="flex flex-col justify-center items-center">
          <p className=" text-[140px] sm:text-[180px] text-blue-700 opacity-5 font-black text-center z-0 absolute top-0 left-0 w-full uppercase dark:text-white">
            deals
          </p>
          <p className="text-4xl text-blue-900 font-bold text-center z-20 relative capitalize mt-20 sm:mt-28 dark:text-gray-300">
            our best deals for today
          </p>
        </div>
      </div>

      <div className="relative justify-center items-center">
        <p className="font-medium text-base text-center mt-20  text-bluePText">
          Real estate is &quot;property consisting of land and the buildings on
          <br />
          it, along with its natural resources such as crops,
          <br /> minerals or water, immovable property of this nature&quot;
        </p>
      </div>

      <div className="mt-14">
        <Tabs />
      </div>
    </div>
  );
};

export default Deals;
