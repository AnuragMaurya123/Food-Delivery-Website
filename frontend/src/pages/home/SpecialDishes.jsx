import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '../../component/specialCard/Card';

const SpecialDishes = () => {
  const [recepit, setRecepit] = useState([])
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };


      useEffect(()=>{
        fetch("/menu.json").then(res=>res.json()).then((data)=>{
          const popularItems=data.filter(item=>item.category === "popular")
         setRecepit(popularItems);
         return popularItems;
        })
      },[])

      
  return (
    <div className="section-container py-16">
      <div className="">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title leading-7 md:w-1/4">Standout Dishes  From Our Menu</h2>
      </div>

      <div className="slider-container ">
      <Slider {...settings}>
        {recepit?.map((item,i)=><Card key={i} item={item}/>)}
      </Slider>
    </div>
      </div>
      
    
  )
}

export default SpecialDishes
