import React, { useEffect, useState } from 'react'
import { API_Options, SearchData_URL } from '../utils/constant';
import Details from './Shopping';


const MainPage = () => {

    //show suggestion only while we are on input box
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchData,setSearchData] = useState({});


    const searchDataCollections = async() => {
      const data = await fetch(SearchData_URL,API_Options);
      const json = await data.json();
      setSearchData(json);

      //Taking top five category of Clothes
      const topData = searchData.filter((item)=> item.CatName == 'Men' || item.CatName == 'Women' || item.CatName == 'Kids' || item.CatName == 'Sport')
      console.log("top Data",topData)
      setTopFiveItems(topData);
      // console.log(json)
      
    }

    useEffect(()=>{
      searchDataCollections()
    },[])

    //top five data from json data.

    console.log(searchData)

    const [topFiveItems,setTopFiveItems] = useState({});

    if(searchData.length != null ){
      
    }

   
    
      
    

    
    

  return (
    <div>

      <div className='absolute '>
         <img src='https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='background login img' className='' />
      </div>

      <form className=' flex absolute bg-black w-1/2 p-12 my-36 mx-auto right-0 left-0 text-Black  bg-opacity-80 '>
            <input type='email' placeholder='What would you like to watch?' className='p-4  my-2 w-full rounded-l-lg bg-white' 
             onFocus={()=> setShowSuggestions(true)}
             onBlur={()=> setShowSuggestions(false)}

             />
            <button className='p-4 my-2 text-white  w-1/2 rounded-r-lg bg-red-600'>Search</button>
        </form>

        <div className='flex justify-center '>
        {
          showSuggestions && (
            <div className=' absolute bg-white py-2 px-5 w-[60%] shadow-lg rounded-lg mt-80 '>
              
              <div className='flex justify-between'>

                {/* {searchData.slice(0,5).map((li)=>(<div className='w-[200px] h-[150px] bg-slate-300 mx-2'>{li.CatName}</div>))} */}

                {topFiveItems.map((item)=>(<div className='w-[200px] h-[150px] bg-slate-300 mx-2'>{item.CatName}</div>))}
                      
              </div>

            </div>
          )
          
        }
        
        </div>
    </div>
  )
}

export default MainPage




{/* <div className='flex'>
                {searchData.slice(0,5).map((li)=> (<div className=' w-1/2 p-5 mx-2 ' ><img src={li.image}  className=' py-2' /></div>))}
              </div>
             <ul className='items-start'>
              <h1>Popular Suggestions</h1>
               {searchData.slice(0,5).map((li)=> (<li  className=' py-2 text-black '>{li.category}</li>))}
             </ul> */}
              