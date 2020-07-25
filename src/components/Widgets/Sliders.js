import React, { Component } from "react";
import Slider from "react-slick";

import CatItem from '../Widgets/CatItem'
import cats from '../../fakeCat.json'
import './Widgets.css'
export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
  };
    
    return (
      <Slider {...settings}>
        {
          cats.map((cat,i)=>{
            return(
              <CatItem title={cat.CatName} 
                img={cat.img} key={i}/>
            )
          })
        }
      </Slider>
    );
  }
}