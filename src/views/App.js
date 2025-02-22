import React from 'react'

import { Layout, Menu, Icon } from 'antd';

import { BrowserRouter as Router, Route,Link } from "react-router-dom";

import Login from './Login'
import Suggestion from "../component/suggestion/Suggestion";
import SongList from './SongList';
import FM from './FM'

import '../assets/css/app.css'

const { Header, Content,Footer, Sider } = Layout;

class App extends React.Component{
  state={
    isClickedSuggestion:true,
    isClickedSongList:false,
    isClickedFM:false,
    isLoginShow:false
  }
  clickTitle(e){
    this.setState({
      isClickedSuggestion:false,
      isClickedSongList:false,
      isClickedFM:false
    })
    // eslint-disable-next-line
    switch(e){
      // eslint-disable-next-line
      case 'suggestion':{
        this.setState({
          isClickedSuggestion:true
        })
        break;
      };
      // eslint-disable-next-line
      case 'songList':{
        this.setState({
          isClickedSongList:true
        })
        break;
      };
      case 'FM':{
        this.setState({
          isClickedFM:true
        })
        break;
      }
    }
  };
  //显示登陆框
  toLogin(){
    this.setState({
      isLoginShow:true
    })
  };
  render() {
    return (
      <div className="contanier">
      <Layout>
        <Sider trigger={null} collapsible className="sider">
        <div className="menu-item" onClick={(e)=>this.toLogin(e)}>
          <div className="info">
            <i className='iconfont slide-icon'>&#xe616;</i>
            <span>未登录</span>
            <i className='iconfont slide-right'>&#xe6b7;</i>
          </div>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <i className="iconfont menu-icon">&#xe617;</i>
            <span>发现音乐</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>私人FM</span>
          </Menu.Item>
          <Menu.Item key="3">
            <i className="iconfont menu-icon">&#xe637;</i>
            <span>视频</span>
          </Menu.Item>
          <Menu.Item key="4">
            <i className="iconfont menu-icon">&#xe61a;</i>
            <span>朋友</span>
          </Menu.Item>
          <div className="menu-item">我的音乐</div>
          <Menu.Item key="5">
            <i className="iconfont menu-icon">&#xe642;</i>
            <span>iTunes音乐</span>
          </Menu.Item>
          <Menu.Item key="6">
            <i className="iconfont menu-icon">&#xe71e;</i>
            <span>下载管理</span>
          </Menu.Item>
          <Menu.Item key="7">
            <i className="iconfont menu-icon">&#xe78d;</i>
            <span>我的音乐云盘</span>
          </Menu.Item>
          <Menu.Item key="8">
            <i className="iconfont menu-icon">&#xe639;</i>
            <span>我的收藏</span>
          </Menu.Item>
          </Menu>
        </Sider>
      <Layout>
        <Router>
        <Header style={{display:'flex',justifyContent: 'space-around', background: '#fff', padding: 0 }}>
          <div className="title">
            <Link to='/' className={this.state.isClickedSuggestion?'title-select':''} onClick={(e)=>this.clickTitle('suggestion')}>个性推荐</Link>
            <Link to='/songList' className={this.state.isClickedSongList?'title-select':''} onClick={(e)=>this.clickTitle('songList')}>歌单</Link>
            <Link to='/FM' className={this.state.isClickedFM?'title-select':''} onClick={(e)=>this.clickTitle('FM')}>主播电台</Link>
            <div>排行榜</div>
            <div>歌手</div>
            <div>最新音乐</div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <Route exact path='/' component={Suggestion}></Route>
          <Route exact path='/songList' component={SongList}></Route>
          <Route exact path='/FM' component={FM}></Route>
        </Content>
        <Footer style={{textAlign:"center"}}>仿网易云音乐 ©2019 Created by Alice.Zhao</Footer>
      </Router>
      </Layout>
      </Layout>
      <Login isShow={this.state.isLoginShow}></Login>
      </div>
    );
  }
}


export default App;