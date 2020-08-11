import React, { Component } from "react";
import Slider from "react-slick";

// component
import DishItems from '../Widgets/DishItems'

import './Widgets.css'
export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: this.props.dishes.length < 4 ? this.props.dishes.length : 4,
      slidesToScroll: 4,
  };
    
    return (
      <Slider {...settings}>
        {
          this.props.dishes.map((dish,i)=>{
            return(
              <DishItems 
                title={dish.dishName} 
                img={dish.img} 
                key={i}
              />
            )
          })
        }
      </Slider>
    );
  }
}