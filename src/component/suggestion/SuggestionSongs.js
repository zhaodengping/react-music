import React from 'react'

import '../../assets/css/suggestionSongs.css'

export default class SuggestionSongs extends React.Component{
    render(){
        return(
            <div>
                <div className="sugg-title">
                    <span>推荐歌曲</span>
                    <i className='iconfont'>&#xe64a;</i>
                </div>
            </div>
        )
    }
}