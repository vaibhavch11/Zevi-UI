import React, { useEffect, useState } from 'react'
import {Shopping_Options, Shopping_URL } from '../utils/constant';
import SearchFilter from './SearchFilter';
import { AiFillStar } from 'react-icons';
import { useParams } from 'react-router-dom';

const Shopping = () => {


  const {resId} = useParams();
  console.log(resId)

  const [shoppingItems,setShoppingItems] = useState([]);
  const [filterShoppingItems,setFilterShoppingItems] = useState([]);
  const [likes,setLikes] = useState({})


  

  async function addRating(array){

    let shoppingData = array.map((curr)=>{
      let new_val=Math.floor(Math.random() * 4)+1
      curr['rating']=new_val
      return curr;
     })   
   
   return shoppingData
  }

    const searchDataCollections = async() => {
        const data = await fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories="+resId,Shopping_Options);
        // const data = await fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=ladies_all",Shopping_Options);
        const json = await data.json();
        // console.log(json?.response?.docs)
        console.log(json.results)

        let shoppingData = await addRating(json.results);
        setShoppingItems(shoppingData);
        setFilterShoppingItems(shoppingData);
        
      }
  
      useEffect(()=>{
        searchDataCollections()
      },[])

      console.log(shoppingItems)

      const handleToggleLike = (productId) => {
        setLikes((prevLikes) => {
          if (prevLikes[productId]) {
            const updatedLikes = { ...prevLikes };
            delete updatedLikes[productId];
            return updatedLikes;
          } else {
            return { ...prevLikes, [productId]: true };
          }
        });
      };

      const isLiked = (productId) => likes[productId];


      //------------------------------

    

      if(shoppingItems.length == 0) return;

  return (
    <div className='grid grid-flow-col'>

      <div className='col-span-6 p-4'>
          
          <h1>Search Result</h1>

          <div>
            <div>Brand</div>

            <div className='flex flex-col mt-10'>
              <div>Price Range</div>
               <label className='flex items-center space-x-2'> <input value="test" type="checkbox" onClick={()=>{
                const priceFilter = shoppingItems.filter((res)=>(res.price.value < 50))
                setFilterShoppingItems(priceFilter)
               }} /><span>under $50 </span></label>

              <label className='flex items-center space-x-2'> <input value="test" type="checkbox" onClick={()=>{
                const priceFilter = shoppingItems.filter((res)=>(res.price.value >= 50 && res.price.value <= 100))
                setFilterShoppingItems(priceFilter)
              }}/><span>$50 to $100</span>   </label>
            </div>

          <div className='flex flex-col mt-10'>
            <div>Rating</div>
            <label className='flex items-center space-x-2'> <input  value="test" type="checkbox" /><span> star</span></label>
            <label className='flex items-center space-x-2'> <input value="test" type="checkbox" /><span>4 star</span></label>
            <label className='flex items-center space-x-2'> <input value="test" type="checkbox" /><span>3 star</span></label>
            <label className='flex items-center space-x-2'> <input value="test" type="checkbox" /><span>2 star</span></label>
            <label className='flex items-center space-x-2'> <input value="test" type="checkbox" /><span>1 star</span></label>
          </div>


          </div>
      </div>

      <div className='col-span-6 '>
        <div className='flex flex-wrap'>
          {filterShoppingItems.map((item) =>  (<div className='p-5 w-[25%] '>

            <button className='w-[20px] h-[20px] absolute '
               onClick={() => handleToggleLike(item.code)}
               style={{ backgroundColor: isLiked(item.code) ? 'red' : 'white' }}
          >
            Like
          </button>
           
            <img className="" src={item.allArticleBaseImages[0] }  /> 
            <p className='text-xl'>{item.name}</p>
            {/* <p>{item.brandName}</p> */}
            <p className='text-xl text-blue-700'>{item.price.formattedValue}</p>
            <p>Rating: {item.rating}</p>
            {/* <p>{item.title.substring(0,20)}..</p> */}
            
            </div>))}
        </div>
          
      </div>

      {/* <SearchFilter />
      <CardList /> */}
    </div>
  )
}

export default Shopping