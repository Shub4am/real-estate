import React from 'react';
import Image from 'next/image';

import instaImg1 from '../assets/images/insta1.png';
import instaImg2 from '../assets/images/insta2.png';
import instaImg3 from '../assets/images/insta3.png';
import instaImg4 from '../assets/images/insta4.png';
import instaImg5 from '../assets/images/insta5.png';
import instaImg6 from '../assets/images/insta6.png';
import instaImg7 from '../assets/images/insta7.png';
import instaImg8 from '../assets/images/insta8.png';
import instaIcon from '../assets/icons/instaIcon.png';
import Link from 'next/link';

const Insta = () => {
  return (
    <div className="relative p-4 mb-4">
      <div className="flex justify-center items-center  p-3">
        <button className="mt-[90px] mb-4 bg-orange-200 hover:bg-orange-600 px-4 py-1 rounded-2xl text-orange-500 hover:text-white h-8 w-28 font-black text-xs uppercase cursor-pointer ">
          instagram
        </button>
      </div>
      <div className="relative ">
        <div className="flex flex-col justify-center items-center">
          <p className="text-9xl sm:text-[160px] text-blue-700 opacity-5 font-black text-center z-0 absolute top-0 left-0 w-full uppercase dark:text-white">
            instagram
          </p>
          <p className="text-2xl sm:text-4xl text-blue-900 font-bold text-center z-20 relative capitalize mt-[55px] dark:text-gray-300">
            checkout what our customers shared{' '}
            <span className="normal-case">#homes</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="grid sm:grid-cols-4 gap-5 m-5 p-5 mt-20 max-w-[1100px] ">
          <Image
            src={instaImg1}
            alt="instagram image"
            className="mx-5 my-3 w-[255px] h-[255px] rounded-lg hover:scale-110 ease-in duration-200"
          />
          <Image
            src={instaImg2}
            alt="instagram image"
            className="mx-5 my-3 w-[255px] h-[255px] rounded-lg hover:scale-110  ease-in duration-200"
          />
          <div className="relative ">
            <Image
              src={instaImg3}
              alt="instagram image"
              className="mx-5 my-3 w-[255px] h-[255px]  rounded-lg hover:scale-110  ease-in duration-200"
            />
            <div className="absolute top-[5px] left-[5px] mt-[54px] ml-[66px]  p-[30px] flex justify-center items-center ">
              <div className=" flex justify-center items-center bg-[#00000080]  p-[25px] gap-[10px] w-20 h-20 rounded-[120px] ">
                <Image src={instaIcon} alt="insta icon" className="w-5 h-5 " />
              </div>
            </div>
          </div>
          <Image
            src={instaImg4}
            alt="instagram image"
            className="mx-5 my-3 w-[255px] h-[255px] rounded-lg hover:scale-110  ease-in duration-200"
          />
          <Image
            src={instaImg5}
            alt="instagram image"
            className="mx-5 my-3 w-[255px] h-[255px] rounded-lg hover:scale-110  ease-in duration-200"
          />
          <Image
            src={instaImg6}
            alt="instagram image"
            className="mx-5 my-3 w-[255px] h-[255px] rounded-lg hover:scale-110  ease-in duration-200"
          />
          <Image
            src={instaImg7}
            alt="instagram image"
            className="mx-5 my-3 w-[255px] h-[255px] rounded-lg hover:scale-110  ease-in duration-200"
          />
          <Image
            src={instaImg8}
            alt="instagram image"
            className="mx-5 my-3 w-[255px] h-[255px] rounded-lg hover:scale-110  ease-in duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default Insta;
