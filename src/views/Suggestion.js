import React from 'react'
import {http_get} from '../util/http'

import { Carousel } from 'antd';

import SuggestionItem from './SuggestionSongs'

import '../css/suggestion.css'

export default class Suggestion extends React.Component{
    state={
        bannerList:[]
    }
    componentDidMount(){
        this.getBanner();
      };
      getBanner(){
        let postData={
          url:'/banner'
        }
        http_get(postData).then(res=>{
          this.setState({
              bannerList:res.data.banners
          })
        })
      };
    render(){
        let ulItem=this.state.bannerList.map(item=>{
            return (
                <img src={item.imageUrl} key={item.imageUrl} alt=''/>
            )
        })
        return (
            <div>
                <div className="banner">
                    <Carousel autoplay>{ulItem}</Carousel>
                </div>
                <SuggestionItem></SuggestionItem>
            </div>
        )
    }
}