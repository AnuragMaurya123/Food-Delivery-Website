/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {Link} from "react-router-dom"
import { IoMdHeart } from "react-icons/io";
const Card = ({ item, i }) => {
  const [isHeart, setIsHeart] = useState(false)
  console.log(isHeart);
  
  return (
   
      <div className="card rounded-2xl bg-base-100 w-96 shadow-xl relative overflow-hidden">
        <div className={`absolute heartStar top-0 right-0 bg-green px-4 py-4 rating gap-1 ${isHeart? "text-rose-500":"text-white"}`}>
    <IoMdHeart className="h-5 w-5 cursor-pointer"  onClick={()=>setIsHeart(!isHeart)}/>
        </div>
       <Link to={`/menu/${item._id}`}>
       <figure>
          <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72"/>
        </figure>
        </Link>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <p>Description of the item</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold"><span className="text-red text-sm">$</span>{item.price}</h5>
            <button className="btn bg-green text-white">Buy Now</button>
          </div>
        </div>
      </div>
   
  );
};

export default Card;
