import React, { useEffect, useState } from 'react'
import { API_Options, SearchData_URL } from '../utils/constant';
import Details from './Shopping';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const MainPage = () => {

    //show suggestion only while we are on input box
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchData,setSearchData] = useState([]);
    const [topFiveItems,setTopFiveItems] = useState([]);


    const searchDataCollections = async() => {
      const data = await fetch(SearchData_URL,API_Options);
      const json = await data.json();
      console.log(json)
      setSearchData(json);
      // console.log(searchData)

      //Taking top five category of Clothes
      let topData = json.filter((item)=> (item.CatName == 'Men' || item.CatName == 'Women' || item.CatName == 'H&M HOME' || item.CatName == 'Sport' || item.CatName == 'Beauty'))
      console.log("top Data",topData)
      setTopFiveItems(topData);
    }

    useEffect(()=>{
      searchDataCollections()
      
    },[])

    if(searchData.length && topFiveItems.length == null ) return; 

  return (
    <div>

      {/* <div className='relative'>
        <img className=' w-1/4' src='https://cdnv2.cutshort.io/company-static/621e5a59947ca30028c62e91/user_uploaded_data/logos/zevi_logo_L_OcnDgjmK.png' alt='Logo'/>
      </div> */}

      <div className='absolute w-full'>
         <img src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' alt='background login img' className='w-screen' />
      </div>

      <form className=' flex absolute  w-1/2 p-12 my-28 mx-auto right-0 left-0 text-Black  bg-opacity-50 '>
            <input type='email' placeholder='Search' className='p-4  my-2 w-full rounded-l-lg  bg-white' 
             onClick={()=> setShowSuggestions(!showSuggestions)}
             />
            <button className='p-4 my-2 bg-white  w-1/4 rounded-r-lg '><FontAwesomeIcon icon={faMagnifyingGlass} size='2xl' className='text-gray-400'/></button>
        </form>

        <div className='flex justify-center '>
        {
          showSuggestions && (
            <div className=' absolute bg-white py-2 px-5 w-[70%] shadow-lg rounded-lg mt-64 pt-10 pb-10'>
               
              <div className='flex flex-col items-start'>

              <h1 className='text-2xl mt-4 mb-4'>Latest Trend</h1>

              <div className='flex justify-between w-full'>
                {topFiveItems.map((item)=>(
                  <Link to={"shopping/" + item.tagCodes}> 
                   <div className='w-[180px] h-[200px] bg-slate-300 p-2 mx-1 bg-gradient-to-tr from-blue-500 text-2xl rounded-md shadow-md hover:to-sky-600 text-white text-center flex items-center justify-center '>
                      {item.CatName}
                    </div>
                    </Link>
                  ))
                }
                </div>

              </div>



              <div className='flex flex-col items-start'>
                  <h1 className='text-2xl mt-4 mb-4'>Popular Suggestions</h1>
                        
                  <div className='text-start'>
                     {topFiveItems[0]?.CategoriesArray?.map((item)=> <div className='text-l p-1'>{item.CatName}</div>)}
                  </div>
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
              