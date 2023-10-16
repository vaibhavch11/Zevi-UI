import React, { useEffect, useState } from 'react'
import {Shopping_Options, Shopping_URL, stars } from '../utils/constant';
import SearchFilter from './SearchFilter';
import { AiFillStar } from 'react-icons';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ShoppingNavBar from './ShoppingNavBar';

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


      //-------Handle Star Rating----------
      const handleRatingStar = (rating) => {
        let star = '';
        for(let i = 0;i<rating;i++){
           star +=  '⭐'
        }
          return star
      }
      //------------------------------

    

      if(shoppingItems.length == 0) return;

      

  return (
    <>
    

      <ShoppingNavBar />
      <div className='grid grid-flow-col'>

      <div className='col-span-6 p-4'>
          
          <h1 className='text-3xl'>Search Result</h1>

          <div>

          <div className='flex flex-col mt-10'>
              <div className='text-2xl flex items-start py-2'>Brand</div>
               <label className='flex items-center space-x-2'> <input value="test" type="checkbox" onClick={()=>{
                const brandFilter = shoppingItems.filter((res)=>(res.brandName == "H&M"))
                setFilterShoppingItems(brandFilter)
               }} /><span>H&M</span></label>

              
            </div>



            <div className='flex flex-col mt-10'>
              <div className='text-2xl flex items-start py-2'>Price Range</div>
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
            <div className='text-2xl flex items-start py-2'>Rating</div>



            <div>{stars.map((li)=>( <label className='flex '> <input  value="test" type="checkbox" onChange={()=>{
              const temp = shoppingItems.filter((res)=>(res.rating == li.value));
              setFilterShoppingItems(temp)
            }}/>
             <span>{handleRatingStar(li.value)} </span></label>
            ))}
            </div>

            
            {/* <label className='flex items-center space-x-2'> <input value="test" type="checkbox" onClick={()=>{  
              const fourStar = shoppingItems.filter((res)=>(res.rating == 4));
              setFilterShoppingItems(fourStar)
            }} /><span>4 star</span></label>
            <label className='flex items-center space-x-2'> <input value="test" type="checkbox" onClick={()=>{  
              const threeStar = shoppingItems.filter((res)=>(res.rating == 3));
              setFilterShoppingItems(threeStar)
            }} /><span>3 star</span></label>
            <label className='flex items-center space-x-2'> <input value="test" type="checkbox" onClick={()=>{  
              const twoStar = shoppingItems.filter((res)=>(res.rating == 2));
              setFilterShoppingItems(twoStar)
            }}/><span>2 star</span></label>
            <label className='flex items-center space-x-2'> <input value="test" type="checkbox" onClick={()=>{  
              const oneStar = shoppingItems.filter((res)=>(res.rating == 1));
              setFilterShoppingItems(oneStar)
            }}/><span>1 star</span></label> */}
          </div>


          </div>
      </div>

      <div className='col-span-6 '>
        <div className='flex flex-wrap'>
          {filterShoppingItems.map((item) =>  (
           <div className='p-5 w-[25%] '>

           

          <div className='relative flex justify-end '>

          <button className='absolute p-2 ' onClick={() => handleToggleLike(item?.code)}>
              {isLiked(item?.code) ? <FontAwesomeIcon icon={faHeart} size='2xl' className='text-red-600'/> : <FontAwesomeIcon icon={faHeart} style={{color: "#b4b8c0",}} size='2xl' className=''/>}
            </button>
            <img className="" src={item?.allArticleBaseImages[0] }  /> 

            <div className='flex absolute bottom-0 p-5 w-full h-[10%] bg-cyan-500 text-white justify-center items-center hover:cursor-pointer opacity-0 hover:opacity-70 text-xl'> View Product</div>
          </div>
           


            <p className='text-xl'>{item?.name}</p>

            <div className='flex justify-center'>
              <p className='text-xl text-blue-700 line-through px-4'>{item?.whitePrice?.formattedValue}</p>
              <p className='text-xl text-blue-700'>{item?.price?.formattedValue}</p>
            </div>

            

            <p>{handleRatingStar(item.rating)}</p>
            
            </div>))}
        </div>
          
      </div>

      {/* <SearchFilter />
      <CardList /> */}
    </div>
    </>
  )
}

export default Shopping