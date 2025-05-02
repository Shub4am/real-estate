import Image from 'next/image';
import React from 'react';
import heroBg from '../assets/images/heroBackground.png';
import arrowIcon from '../assets/icons/arrow.png';
import phoneIcon from '../assets/icons/contact.png';
import mailIcon from '../assets/icons/mail.png';

const Hero = ({ address, phone, email }) => {
  const showMoreBtn = () => {
    document
      .getElementById('about-container')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="flex flex-col w-full h-screen ">
      <Image
        src={heroBg}
        alt="bg image"
        fill
        className="w-full h-screen bg-no-repeat rounded-b-4xl object-cover object-center"
      />
      <div className="w-full h-screen relative ">
        <div className="relative h-screen text-center flex flex-col justify-center items-center">
          <button className="hidden lg:block bg-orange-600 hover:bg-orange-500 px-2 py-1 rounded-2xl text-white h-8 w-28 font-black text-xs uppercase cursor-pointer">
            Real Estate
          </button>
          <h1 className="font-normal text-7xl text-center mt-24 text-white capitalize">
            find real estate
            <br /> that suits you
          </h1>
          {/* Icons and Text under Heading */}
          <div className="hidden sm:flex mt-24 justify-center items-center">
            <div className="flex mr-11 ">
              <Image
                src={arrowIcon}
                alt="arrow icon"
                className="w-5 h-5 mx-9 self-center"
              />
              <p className="text-white text-xl py-2 ">{address}</p>
            </div>

            <div className="flex ml-20 mr-20">
              <Image
                src={phoneIcon}
                alt="phone icon"
                className="w-5 h-5 mx-9 self-center"
              />
              <p className="text-white text-xl py-2">{phone}</p>
            </div>

            <div className="flex ml-20">
              <Image
                src={mailIcon}
                alt="mail icon"
                className="w-5 h-5 mx-9 self-center"
              />
              <p className="text-white text-xl py-2">{email}</p>
            </div>
          </div>
          {/* Show more button  */}
          <div className="  absolute bottom-8 w-full text-center ">
            <button
              onClick={showMoreBtn}
              className=" text-blue-900 text-xl capitalize shadow-lg bg-white hover:bg-orange-500 hover:text-white px-4 py-1 rounded-3xl h-14 w-36"
            >
              show more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
