import Link from 'next/link';
import React from 'react';

export default function About() {
  return (
    <div id="about-container" className="relative p-4 mb-4">
      <div className="flex justify-center items-center">
        <Link href="/">
          <button className="relative mt-24 bg-green-200  hover:bg-green-600 px-4 py-1 rounded-2xl text-green-500 hover:text-white h-8 w-28 font-black text-xs uppercase cursor-pointer ">
            Our Story
          </button>
        </Link>
      </div>

      <div className="relative ">
        <div className="flex flex-col justify-center items-center mt-20">
          <p className="text-10xl text-blue-700 opacity-5 font-black text-center z-0 absolute top-0 left-0 w-full">
            OUR STORY
          </p>
          <p className="text-4xl text-blue-900 font-bold text-center z-20 relative mt-16">
            We Will Find the Best Option
          </p>
        </div>
      </div>

      <div className="relative justify-center items-center">
        <p className="font-medium text-base text-center mt-20  text-[#7D8FB3]">
          Real estate is &quot;property consisting of land and the buildings on
          it, along with its natural resources such as crops,
          <br /> minerals or water, immovable property of this nature; an
          interest vested in this (also) an item of real property,
          <br /> (more generally) buildings or housing in general.
        </p>
      </div>

      <div className="flex justify-center items-center mt-[50px] ml-[28px]">
        <div className="bg-white py-35 px-10 h-[160px] w-[350px] mr-[30px] flex flex-col justify-center items-center rounded-[10px] shadow-md">
          <p className="font-medium text-3xl leading-[50px] text-[#4D5E80] capitalize">
            15 years
          </p>
          <p className="text-sm leading-8 text-center text-[#ADB8CC]">
            in business
          </p>
        </div>
        <div className="bg-white py-35 px-10 h-[160px] w-[350px] mr-[30px] flex flex-col justify-center items-center rounded-[10px] shadow-md">
          <p className="font-medium text-3xl leading-[50px] text-[#4D5E80] capitalize">
            $1 billion
          </p>
          <p className="text-sm leading-8 text-center text-[#ADB8CC]">
            property brokered
          </p>
        </div>
        <div className="bg-white py-35 px-10 h-[160px] w-[350px] mr-[30px] flex flex-col justify-center items-center rounded-[10px] shadow-md">
          <p className="font-medium text-3xl leading-[50px] text-[#4D5E80] capitalize">
            10,000
          </p>
          <p className="text-sm leading-8 text-center text-[#ADB8CC]">
            transactions
          </p>
        </div>
      </div>
    </div>
  );
}
