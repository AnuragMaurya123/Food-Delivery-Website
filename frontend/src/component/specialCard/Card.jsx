/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {Link} from "react-router-dom"
import { IoMdHeart } from "react-icons/io";
const Card = ({ item, i }) => {
  const [isHeart, setIsHeart] = useState(false)
  console.log(isHeart);
  
  return (
   <div className="mx-6">
      <div className="card rounded-2xl bg-base-100 shadow-xl relative ">
        <div className={`absolute heartStar top-0 right-0 bg-green px-4 py-4 rating gap-1 ${isHeart? "text-rose-500":"text-white"}`}>
    <IoMdHeart className="h-5 w-5 cursor-pointer"  onClick={()=>setIsHeart(!isHeart)}/>
        </div>
       <Link to={`/menu/${item._id}`}>
       <figure>
          <img src={item.image}  className="hover:scale-105 transition-all duration-300 md:h-40 md:mt-16 lg:h-60 lg:mt-10"/>
        </figure>
        </Link>
        <div className="card-body">
        <Link to={`/menu/${item._id}`}> <h2 className="card-title ">{item.name}</h2></Link>
          <p>Description of the item</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold"><span className="text-red text-sm">$</span>{item.price}</h5>
            <button className="btn bg-green text-white">Buy Now</button>
          </div>
        </div>
      </div>
   </div>
  );
};

export default Card;
