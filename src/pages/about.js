import React from 'react';

const About = () => {
  return (
    <div>
      <div className="flex justify-center items-center">
        <button className="relative mt-24 bg-green-200  hover:bg-green-600 px-4 py-1 rounded-2xl text-green-500 hover:text-white h-8 w-28 font-black text-xs cursor-pointer ">
          Our Story
        </button>
      </div>

      <div className="relative">
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
        <p
          className="font-medium text-base text-center mt-20"
          style={{ color: '#7D8FB3' }}
        >
          Real estate is &quot;property consisting of land and the buildings on
          it, along with its natural resources such as crops,
          <br /> minerals or water, immovable property of this nature; an
          interest vested in this (also) an item of real property,
          <br /> (more generally) buildings or housing in general.
        </p>
      </div>
    </div>
  );
};

export default About;
