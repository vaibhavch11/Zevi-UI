import React, { useEffect, useState } from 'react'
import {Shopping_Options, Shopping_URL } from '../utils/constant';
import SearchFilter from './SearchFilter';
import CardList from './CardList';

const Shopping = () => {

  const [shoppingItems,setShoppingItems] = useState([]);
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
        const data = await fetch('https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_all&concepts=H%26M%20MAN',Shopping_Options);
        const json = await data.json();
        // console.log(json?.response?.docs)
        console.log(json.results)

        let shoppingData = await addRating(json.results);
        setShoppingItems(shoppingData);
        
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
    

      if(shoppingItems.length == 0) return;

  return (
    <div className='grid grid-flow-col'>

      <div className='col-span-5'>
          
          <h1>Search Result</h1>

          <div>
            <div>Brand</div>
            <div>Price Range</div>
            <div>Rating</div>
          </div>
      </div>

      <div className='col-span-7 '>
        <div className='flex flex-wrap'>
          {shoppingItems.map((item) =>  (<div className='p-5 w-[25%] '>

            <button className='w-[20px] h-[20px] absolute '
               onClick={() => handleToggleLike(item.code)}
               style={{ backgroundColor: isLiked(item.code) ? 'red' : 'white' }}
          >
            Like
          </button>
           
            <img className="" src={item.allArticleBaseImages[0]} /> 
            <p>{item.brandName}</p>
            <p>{item.price.formattedValue}</p>
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