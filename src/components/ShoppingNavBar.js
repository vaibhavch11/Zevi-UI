import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// import zevi_logo from "../themes/SVGs/zevi_logo_svg.svg";
// import { RiSearch2Line } from "react-icons/ri";

const ProductsNavBar = () => {
  return (
    <div className="bg-white  md:p-8 md:pt-10 flex items-center justify-between w-screen">
      <div className="flex items-center w-full">
      <form className=' flex p-2  w-1/2  mx-auto right-0 left-0 text-Black bg-opacity-50 border border-gray-300 rounded-lg'>
    <input type='email' placeholder='Search' className='w-full rounded-l-lg  bg-white' 

     />
    <button className=' my-2 bg-white  w-1/4 rounded-r-lg '><FontAwesomeIcon icon={faMagnifyingGlass} size='2xl' className='text-gray-400'/></button>
</form>
      </div>
      <div className="hidden md:block">
        {/* <img src={zevi_logo} alt="Zevi Logo" className="w-20" /> */}
      </div>
    </div>
    
  );
};

export default ProductsNavBar;
