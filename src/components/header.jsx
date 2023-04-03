import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import hamburgerMenu from '../../src/assets/icons/menu.png';
import searchIcon from '../../src/assets/icons/search.png';

const Header = () => {
  return (
    <div className="w-full h-20 shadow-xl flex justify-between items-center relative">
      {/*navbar always on top: className="w-full h-20 shadow-xl flex justify-between items-center fixed top-0 left-0 right-0 bg-[#040508a4] z-50 " */}
      {/* Menu + Name */}

      <div className="ml-40">
        <Link
          href="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex mx-4 py-2 "
        >
          <Image
            src={hamburgerMenu}
            alt="Menu"
            className="w-4 h-4 self-center"
          />
          <p className="ml-8 py-2 text-xl font-bold text-white hover:text-orange-500">
            Constructor
          </p>
        </Link>
      </div>

      {/* Search */}

      <div className="flex ml-3">
        <Link href="/" className="flex">
          <Image src={searchIcon} alt="Menu" className="w-4 h-4 self-center" />
          <input
            type="text"
            placeholder="Search"
            className="w-20 bg-transparent outline-none placeholder-gray-300 mx-4 py-2 text-white capitalize"
          />
        </Link>
      </div>

      {/* navbar Links */}

      <ul
        className="flex text-sm font-bold text-white 
      "
      >
        <li>
          <Link href="/" className="mx-7 py-2 hover:text-orange-500">
            About
          </Link>
        </li>
        <li>
          <Link href="/" className="mx-7 py-2 hover:text-orange-500">
            Services
          </Link>
        </li>
        <li>
          <Link href="/" className="mx-7 py-2 hover:text-orange-500">
            Reviews
          </Link>
        </li>
        <li>
          <Link href="/" className="mx-7 py-2 hover:text-orange-500">
            Contacts
          </Link>
        </li>
      </ul>

      <p className=" text-sm font-bold text-white  mx-2 mr-40 hover:text-orange-500 cursor-pointer">
        Get In Touch
      </p>
    </div>
  );
};

export default Header;
