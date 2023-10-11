import React, { useEffect } from 'react'
import { Details_Options, Details_URL } from '../utils/constant';

const DetailsPage = () => {

    const searchDataCollections = async() => {
        const data = await fetch('https://zappos1.p.rapidapi.com/products/detail?productId=9143855',Details_Options);
        const json = await data.json();
        console.log(json)
      }
  
      useEffect(()=>{
        searchDataCollections()
      },[])

  return (
    <div>Details</div>
  )
}

export default DetailsPage