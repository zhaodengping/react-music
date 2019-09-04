import React from 'react'

import { Layout, Menu, Icon } from 'antd';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Suggestion from "./Suggestion";

import '../css/app.css'
import {http_get} from '../util/http'

const { Header, Content,Footer, Sider } = Layout;

class App extends React.Component{ 

  componentDidMount(){
    this.getBanner();
  };

  getBanner(){
    let postData={
      url:'/banner'
    }
    http_get(postData).then(res=>{
      console.log(res)
    })
  };
  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible >
          <div className="menu-item">个人信息</div>
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
          <Header style={{display:'flex',justifyContent: 'space-around', background: '#fff', padding: 0 }}>
            <Router className="title">
              <Route path='/' component={Suggestion}>个性推荐</Route>
              <div>歌单</div>
              <div>主播电台</div>
              <div>排行榜</div>
              <div>歌手</div>
              <div>最新音乐</div>
            </Router>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
          <Footer style={{textAlign:"center"}}>仿网易云音乐 ©2019 Created by Alice.Zhao</Footer>
        </Layout>
      </Layout>
    );
  }
}


export default App;