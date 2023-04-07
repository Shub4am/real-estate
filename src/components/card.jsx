import Image from 'next/image';
import React from 'react';
import eyeIcon from '../assets/icons/eye.png';

const Card = ({ imageSrc, title, price }) => {
  return (
    <div className="w-[350px] h-[400px] hover:scale-105 ease-in duration-200 mx-auto bg-white rounded-xl shadow-md overflow-hidden dark:bg-slate-700">
      <div className="flex flex-col items-start">
        <div className="relative">
          <Image
            className="h-[190px] w-full object-contain"
            src={imageSrc}
            alt="house image"
          />
          <div className="absolute top-0 left-0 mt-[30px] ml-[30px] flex justify-center items-center ">
            <div className=" flex justify-center items-center bg-black bg-opacity-[50%] rounded-[5px] py-[3px] pr-[10px] pl-[5px] ">
              <Image src={eyeIcon} alt="icon" className="w-6 h-6" />
              <p className="font-black text-[10px] leading-5 text-white">65</p>
            </div>
            <div className="flex justify-center items-center bg-black bg-opacity-[50%] rounded-[5px] ml-[10px] px-[10px] py-[5px] ">
              <p className="font-black text-[10px] leading-5 text-white text-center">
                1995
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="capitalize text-cardText font-black text-[15px] leading-[30px] dark:text-white">
            {title}
          </div>
          <p className=" text-2xl leading-[30px] font-bold text-cardText py-[10px] dark:text-white ">
            {price}
          </p>
          <p className="text-[13px] leading-[25px] text-blueCardSubTitle font-bold py-[10px]  dark:text-white">
            14 Patrick Brem Ct. Mahwah, NJ07430
          </p>
          <p className="text-xs leading-5 text-blueCardSubTitle font-bold dark:text-white">
            3 Beds&nbsp;&nbsp;-&nbsp;&nbsp;2 baths&nbsp;&nbsp;-&nbsp;&nbsp;3,450
            sqft
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
