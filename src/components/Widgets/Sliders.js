import React, {useState, useEffect}from "react";
import Slider from "react-slick";
import axios from 'axios'

import CatItem from '../Widgets/CatItem'
import './Widgets.css'
import API from "../../API";

const settings = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
}

const Sliders = props => {

  const [categories, setCategories] = useState(null)

  useEffect(() => {
    axios.get(API.allCategory)
    .then(res => {
      // console.log(res.data.category.length)
      setCategories(res.data.category)
    })
  }, [])


  return (
    <Slider {...settings}>
      {
        categories &&
        categories.map((cat,i)=>{
          console.log(cat)
          return(
            <CatItem 
              title={cat.category_name} 
              img={cat.image} 
              key={i}
            />
          )
        })
      }
    </Slider>
  )
}

export default Sliders