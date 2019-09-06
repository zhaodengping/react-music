import React from 'react'

import { Input,Button,Icon,message } from 'antd';

import '../assets/css/login.css'

export default class Login extends React.Component{ 
    state={
        btnName:'登陆',
        isLoginShow:false
    }
    constructor(props){
        super(props);
        this.state.isLoginShow=props.isShow
    };
    componentWillReceiveProps(props){
        console.log(props)
        this.setState({
            isLoginShow:props.isShow
        })
    }
    close(){
        this.setState({
            isLoginShow:false
        })
    }
    //还在开发中
    otherLoginStyle(){
        message.warning('功能还在开发中，请耐心等待～');
    };
    render(){
        let loginItem=null;
        let otherStyle=[{
            icon:'&#xe7e5;',
            name:'微信'
        },{
            icon:'&#xe666;',
            name:'QQ'
        },{
            icon:'&#xe62a;',
            name:'新浪微博'
        },{
            icon:'&#xe600;',
            name:'网易邮箱'
        }]
            
        let otherLoginStyle=otherStyle.map((item,index)=>{
            return(
                <div onClick={()=>this.otherLoginStyle()} key={index}>
                    <div className="login-border">
                        <i className="iconfont login-icon1">{item.icon}</i>
                    </div>
                    <div>{item.name}</div>
                </div> 
            )
        })
        if(this.state.isLoginShow){
            loginItem=(
                <div className="login">
                    <Icon type="close" className="login-icon" onClick={()=>this.close()}/>
                    <div className="login-width">
                        <img src={require('../assets/images/login-bg.png')} alt='默认图片' width="300" className="login-img"/>
                        <Input placeholder="请输入手机号" prefix={<i className="iconfont">&#xe6bd;</i>} className="input"/>
                        <Input placeholder="设置登陆密码，不少于6位" prefix={<i className="iconfont">&#xe672;</i>} className="input"/>
                        <Button type="danger" block className="login-btn">{this.state.btnName}</Button>
                        <div className="login-register">注册</div>
                        <div className="login-otherTitle">
                            <div className="login-lineLeft"></div>
                            <div>其他{this.state.btnName}方式</div>
                            <div className="login-lineRight"></div>
                        </div>
                        <div className="login-other">{otherLoginStyle}</div>
                        <div className="login-back">返回登陆</div>
                    </div>
                </div>
            )
        }
        
        return(
            <div>{loginItem}</div>
        )
    }
}