import React, { useEffect, useState } from 'react'
import { API_Options, SearchData_URL } from '../../utils/constant';


const MainPage = () => {

    //show suggestion only while we are on input box
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [serachData,setSearchData] = useState();

    const searchDataCollections = async() => {
      const data = await fetch(SearchData_URL,API_Options);
      const json = await data.json();
      console.log(json)
    }

    useEffect(()=>{
      searchDataCollections()
    },[])

  return (
    <div>

      <div className='absolute '>
         <img src='https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='background login img' className='' />
      </div>

      <form className=' flex absolute bg-black w-1/2 p-16 my-36 mx-auto right-0 left-0 text-white  bg-opacity-80'>
            <input type='email' placeholder='What would you like to watch?' className='p-4  my-2 w-full rounded-l-lg bg-gray-700' 
             onFocus={()=> setShowSuggestions(true)}/>
            <button className='p-4 my-2 text-white  w-1/2 rounded-r-lg bg-red-600'>Search</button>
        </form>

        {
          showSuggestions && (
            <div className='absolute bg-white'>


            </div>
          )
        }
        
    </div>
  )
}

export default MainPage