import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import starIcon from '../assets/icons/starIcon.png';
import rightArrowIcon from '../assets/icons/rightArrowIcon.png';

const Footer = () => {
  return (
    <div className="relative p-4 mb-4 mx-[10px] border-t-2 border-solid border-[#EDEFF2]">
      {/* Row 1 */}
      <div className="flex justify-center items-center py-[90px] px-2 ">
        {/* text  */}
        <p className="text-2xl leading-[30px] font-bold text-[#4D5E80] capitalize">
          constructor
        </p>
        {/* menu  */}
        <div className="relative flex gap-5 justify-center items-centers  w-[450px] ">
          <ul className="grid grid-cols-3 gap-10 ">
            <li>
              <Link href="/" className="py-2 hover:text-orange-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="py-2 hover:text-orange-500">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/" className="py-2 hover:text-orange-500">
                Services
              </Link>
            </li>
            <li>
              <Link href="/" className="py-2 hover:text-orange-500">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="py-2 hover:text-orange-500">
                Deals
              </Link>
            </li>
            <li>
              <Link href="/" className="py-2 hover:text-orange-500">
                Contacts
              </Link>
            </li>
          </ul>
        </div>
        {/* rating */}
        <div className="flex flex-col items-start gap-1 ">
          <div className="flex">
            <Image
              src={starIcon}
              alt="ratings "
              className="w-[30px] h-[30px]"
            />
            <Image
              src={starIcon}
              alt="ratings "
              className="w-[30px] h-[30px]"
            />
            <Image
              src={starIcon}
              alt="ratings "
              className="w-[30px] h-[30px]"
            />
            <Image
              src={starIcon}
              alt="ratings "
              className="w-[30px] h-[30px]"
            />
            <Image
              src={starIcon}
              alt="ratings "
              className="w-[30px] h-[30px]"
            />
          </div>
          <div className="flex justify-center items-center p-2">
            <p>5.2M satisfied customers</p>
          </div>
        </div>
      </div>

      {/* Row 2 */}

      <div className="relative py-0 px=[340px] border-t-2 border-solid border-[#EDEFF2] flex items-center justify-between gap-5">
        <p className="capitalize text-[13px] font-semibold leading-[25px] text-center text-[#7D8FB3]">
          © 2030 Company. All Rights Reserved.
        </p>
        <Link
          href="https://www.figma.com/community/file/1216698613875563555/Company-One"
          target="_blank"
          className="capitalize text-[13px] font-semibold leading-[25px] text-center text-[#7D8FB3] hover:text-orange-500"
        >
          Design by Spline One
        </Link>
        <div className="flex items-start p-4 gap-[57px]">
          <Link
            href="#"
            className="capitalize text-[13px] font-semibold leading-[25px] text-center text-[#7D8FB3] hover:text-orange-500"
          >
            terms
          </Link>
          <Link
            href="#"
            className="capitalize text-[13px] font-semibold leading-[25px] text-center text-[#7D8FB3]  hover:text-orange-500"
          >
            privacy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
