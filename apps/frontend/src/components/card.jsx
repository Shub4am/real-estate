import Image from 'next/image';
import React from 'react';
import eyeIcon from '../assets/icons/eye.png';
import { formatCurrency } from '../utils/format';

// Import all local images
import cardImageBg1 from '../assets/images/Image.png';
import cardImageBg2 from '../assets/images/Image-2.png';
import cardImageBg3 from '../assets/images/Image-3.png';
import cardImageBg4 from '../assets/images/Image-4.png';
import cardImageBg5 from '../assets/images/Image-5.png';
import cardImageBg6 from '../assets/images/Image-6.png';
import cardImageBg7 from '../assets/images/Image-7.png';
import cardImageBg8 from '../assets/images/Image-8.png';
import cardImageBg9 from '../assets/images/Image-9.png';

// Map of local images to use when database images aren't available
const localImages = [
  cardImageBg1, cardImageBg2, cardImageBg3, cardImageBg4, cardImageBg5,
  cardImageBg6, cardImageBg7, cardImageBg8, cardImageBg9
];

// Support both legacy and new property data structure
const Card = (props) => {
  // Handle both property object and individual props
  const { property, imageSrc, title, price, onClick } = props;
  
  // If using legacy props directly
  if (!property) {
    return (
      <div className="w-[350px] h-[400px] hover:scale-105 ease-in duration-200 mx-auto bg-white rounded-xl shadow-md overflow-hidden dark:bg-slate-700">
        <div className="flex flex-col items-start">
          <div className="relative">
            <Image
              className="h-[190px] w-full object-contain"
              src={imageSrc}
              alt="house image"
              priority
            />
            <div className="absolute top-0 left-0 mt-[30px] ml-[30px] flex justify-center items-center ">
              <div className="flex justify-center items-center bg-black bg-opacity-[50%] rounded-[5px] py-[3px] pr-[10px] pl-[5px]">
                <Image src={eyeIcon} alt="icon" className="w-6 h-6" />
                <p className="font-black text-[10px] leading-5 text-white">65</p>
              </div>
              <div className="flex justify-center items-center bg-black bg-opacity-[50%] rounded-[5px] ml-[10px] px-[10px] py-[5px]">
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
            <p className="text-2xl leading-[30px] font-bold text-cardText py-[10px] dark:text-white">
              {price}
            </p>
            <p className="text-[13px] leading-[25px] text-blueCardSubTitle font-bold py-[10px] dark:text-white">
              14 Patrick Brem Ct. Mahwah, NJ07430
            </p>
            <p className="text-xs leading-5 text-blueCardSubTitle font-bold dark:text-white">
              3 Beds&nbsp;&nbsp;-&nbsp;&nbsp;2 baths&nbsp;&nbsp;-&nbsp;&nbsp;3,450 sqft
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // If using property object from database
  // Get a local image based on property ID or index
  const getLocalImage = () => {
    if (property._id) {
      // Use last character of ID as number to pick an image
      const idChar = property._id.slice(-1);
      const index = parseInt(idChar, 16) % localImages.length;
      return localImages[index];
    }
    // Fallback to first image
    return localImages[0];
  };
  
  // Format price
  const formattedPrice = formatCurrency(property.price);
  
  // Use local image
  const displayImage = getLocalImage();
  
  // Use property details if available
  const yearBuilt = property.details?.yearBuilt || "1995";
  const address = property.address?.full || "14 Patrick Brem Ct. Mahwah, NJ07430";
  const details = property.details ? 
    `${property.details.beds} Beds - ${property.details.baths} baths - ${property.details.sqft} sqft` :
    "3 Beds - 2 baths - 3,450 sqft";
    
  return (
    <div 
      className="w-[350px] h-[400px] hover:scale-105 ease-in duration-200 mx-auto bg-white rounded-xl shadow-md overflow-hidden dark:bg-slate-700 cursor-pointer"
      onClick={() => onClick && onClick(property)}
    >
      <div className="flex flex-col items-start">
        <div className="relative">
          <Image
            className="h-[190px] w-full object-contain"
            src={displayImage}
            alt={property.title}
            priority
          />
          <div className="absolute top-0 left-0 mt-[30px] ml-[30px] flex justify-center items-center ">
            <div className="flex justify-center items-center bg-black bg-opacity-[50%] rounded-[5px] py-[3px] pr-[10px] pl-[5px]">
              <Image src={eyeIcon} alt="icon" className="w-6 h-6" />
              <p className="font-black text-[10px] leading-5 text-white">65</p>
            </div>
            <div className="flex justify-center items-center bg-black bg-opacity-[50%] rounded-[5px] ml-[10px] px-[10px] py-[5px]">
              <p className="font-black text-[10px] leading-5 text-white text-center">
                {yearBuilt}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="capitalize text-cardText font-black text-[15px] leading-[30px] dark:text-white">
            {property.title}
          </div>
          <p className="text-2xl leading-[30px] font-bold text-cardText py-[10px] dark:text-white">
            {formattedPrice}
          </p>
          <p className="text-[13px] leading-[25px] text-blueCardSubTitle font-bold py-[10px] dark:text-white">
            {address}
          </p>
          <p className="text-xs leading-5 text-blueCardSubTitle font-bold dark:text-white">
            {details}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
