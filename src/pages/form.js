import Image from 'next/image';
import React, { useState } from 'react';
import usernameIcon from '../assets/icons/Icon.png';
import callIcon from '../assets/icons/callIcon.png';
import emailIcon from '../assets/icons/email.png';
import messageIcon from '../assets/icons/message.png';

const Form = () => {
  return (
    <div className="relative p-4 mb-4">
      <div className="flex justify-center items-center  p-3">
        <button className="mt-[90px] mb-4 bg-orange-200 hover:bg-orange-600 px-4 py-1 rounded-2xl text-orange-500 hover:text-white h-8 w-28 font-black text-xs uppercase cursor-pointer ">
          contacts
        </button>
      </div>
      <div className="relative ">
        <div className="flex flex-col justify-center items-center">
          <p className="text-10xl text-blue-700 opacity-5 font-black text-center z-0 absolute top-0 left-0 w-full uppercase">
            contacts
          </p>
          <p className="text-4xl text-blue-900 font-bold text-center z-20 relative capitalize mt-14">
            get in touch now
          </p>
        </div>
      </div>

      <div className="relative justify-center items-center">
        <p className="font-medium text-base text-center mt-20 mb-10 text-[#7D8FB3]">
          We have developed a unique space where you can work and create.
          <br /> We thought of everything to the smallest detail.
          <br />
          You will be able to conduct your business, conduct meetings, meetings
        </p>
      </div>

      {/* FORM */}

      <div className="flex justify-center items-center">
        <form>
          <div className="flex flex-col items-center gap-[30px] p-0 w-[670px] h-[330px] ">
            {/* 1st row */}
            <div className="flex items-start p-0 gap-[30px] w-full h-[60px] relative">
              <label className="relative ">
                <input
                  name="firstName"
                  placeholder="First Name"
                  className="flex justify-between items-center rounded-[30px] py-[15px] px-[30px] shadow-md w-[320px] h-[60px] capitalize"
                />
                <Image
                  src={usernameIcon}
                  alt="username icon"
                  className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2"
                />
              </label>

              <label className="relative">
                <input
                  name="lastName"
                  placeholder="Last Name"
                  className="flex justify-between items-center rounded-[30px] py-[15px] px-[30px] shadow-md w-[320px] h-[60px] capitalize"
                />
                <Image
                  src={usernameIcon}
                  alt="username icon"
                  className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2"
                />
              </label>
            </div>

            {/* 2nd row */}
            <div className="flex items-start p-0 gap-[30px] w-full h-[60px] relative">
              <label className="relative ">
                <input
                  name="email"
                  placeholder="Email Address"
                  className="flex justify-between items-center rounded-[30px] py-[15px] px-[30px] shadow-md w-[320px] h-[60px] capitalize"
                />
                <Image
                  src={emailIcon}
                  alt="email icon"
                  className="w-5 h-4 absolute right-5 top-1/2 transform -translate-y-1/2"
                />
              </label>

              <label className="relative">
                <input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="flex justify-between items-center rounded-[30px] py-[15px] px-[30px] shadow-md w-[320px] h-[60px]"
                />
                <Image
                  src={callIcon}
                  alt="phone icon"
                  className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2"
                />
              </label>
            </div>

            {/* 3rd row  */}

            <div className="flex justify-between items-center p-0 gap-[10px] w-full h-[60px] relative">
              <label className="relative">
                <input
                  name="message"
                  placeholder="Your Message"
                  className="flex justify-between items-center rounded-[30px] py-[15px] px-[30px] shadow-md w-[670px] h-[60px] overflow-ellipsis overflow-hidden"
                />
                <Image
                  src={messageIcon}
                  alt="message"
                  className="w-5 h-5 absolute right-5 top-1/2 transform -translate-y-1/2"
                />
              </label>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center py-[15px] px-[35px] bg-[#3361FF] rounded-[30px] capitalize text-white"
            >
              send request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
