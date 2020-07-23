import React, { Component } from "react";
import Slider from "react-slick";

import CatItem from '../Widgets/CatItem'
import cats from '../../fakeCat.json'
import RestList from '../Widgets/RestList'
import './Widgets.css'
import fake from '../../fakeRest.json';
export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
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
        <h2>Popular Restaurant</h2>
        <div className="RestDiv">
          <ul id="RestUl">
            {fake.map((cats,index)=>{
              return(
                <li key={index}>
                  <RestList name={cats.name}
                    location={cats.location}
                    tel={cats.telephone}
                    rate={cats.rate}/>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}