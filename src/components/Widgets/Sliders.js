import React, { Component } from "react";
import Slider from "react-slick";

import CatItem from '../Widgets/CatItem'
import cats from '../../fakeCat.json'
import './Widgets.css'
export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 3
    };
    
    return (
      <div>
        <div className="slider-continer">
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
        </div>
      </div>
    );
  }
}