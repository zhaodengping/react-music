import React from 'react'

import {http_get,http_getWithCookie} from '../assets/js/http'
import '../assets/css/songsList.css'
import {showCount} from '../assets/js/util'

import {Pagination,Spin} from 'antd'

export default class Suggestion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            songsList:[],
            hotTags:[],
            pageIndex:1,
            pageSize:20,
            pageTotals:0,
            loading:true,
        }
    };
    componentDidMount(){
        this.getAllSongs()
        this.getHotTags()
        this.getRecommondSongs()
    };
    getHotTags(){
        let url=`/playlist/hot`;
        http_get({url}).then(res=>{
            if(res.data.code===200){
                this.setState({
                    hotTags:res.data.tags
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    getRecommondSongs(){
        let url='/recommend/songs';
        http_getWithCookie({url}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    };
    getAllSongs(){
        let url=`/top/playlist?limit=${this.state.pageSize}`
        http_get({url}).then(res=>{
            if(res.data.code===200){
                let playList=res.data.playlists;
                playList.forEach(item => {
                    let isShow=showCount(item.playCount);
                    item.isShow=isShow;//是否显示“万”
                    item.playCountShow=item.playCount
                    if(isShow){
                        item.playCountShow=parseInt(item.playCountShow/10000)
                    }
                });
                this.setState({
                    loading:false,
                    songsList:res.data.playlists,
                    pageTotals:res.data.total
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render(){
        let tags=this.state.hotTags.map((item,index)=>{
            return (
                <span key={index}>
                    <span className="tag-name">{item.name}</span>
                    {index===(this.state.hotTags.length-1)?null:<span>|</span>}
                </span>
            )
        })
        let songList=this.state.songsList.map(item=>{
            return (
                <div key={item.id} className='songs-item'>
                    <img src={item.coverImgUrl} alt='' className='coverImg'/>
                    <span className='songs-playCount'>
                        <i className='iconfont'>&#xe615;</i>
                        {item.isShow?<span>{item.playCountShow}万</span>:<span>{item.playCountShow}</span>}
                    </span>
                    <span className='songs-creator'>
                        <i className='iconfont'>&#xe619;</i>
                        <span>{item.creator.nickname}</span>
                    </span>
                    <span className='songs-play'>
                        <i className='iconfont'>&#xe6b7;</i>
                    </span>
                    <div>{item.name}</div>
                </div>
            )
        })
        return (
            <div>
                <Spin spinning={this.state.loading}>
                <div className="songs-flex">
                    <div className='allSongs'>
                        <span>全部歌单</span>
                        <i className='iconfont'>&#xe64a;</i>
                    </div>
                    <div>{tags}</div>
                </div>
                <div className='songsList-flex'>
                    {songList}
                </div>
                <div className="songs-page">
                    <Pagination defaultCurrent={1} total={this.state.pageTotals} />
                </div>
                </Spin>
            </div>
        )
    }
}