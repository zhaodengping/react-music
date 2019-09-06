import React from 'react'

import { Input,Button,Icon,message } from 'antd';

import '../assets/css/login.css'
import {checkPhone} from '../assets/js/util'
import {http_get} from '../assets/js/http'

export default class Login extends React.Component{ 
    state={
        btnName:'登录',
        loginText:'请输入密码',
        isShow:false,
        isLogin:true,//目前是登录
        userInfo:{
            phone:'',
            password:''
        }
    }
    constructor(props){
        super(props);
        this.state.isShow=props.isShow
    };
    componentWillReceiveProps(props){
        this.setState({
            isShow:props.isShow
        })
    }
    close(){
        this.setState({
            isShow:false
        })
    }
    //还在开发中
    otherLoginStyle(){
        message.warning('功能还在开发中，请耐心等待～');
    };
    //注册
    gotoRegister(){
        this.setState({
            isLogin:false,
            btnName:'注册',
            loginText:"设置登录密码，不少于6位",
        })
    };
    //返回登录
    gotoLogin(){
        this.setState({
            isLogin:true,
            btnName:'登录',
            loginText:"请输入密码",
        })
    };
    getInputValue(e,flag){
        let value=e.target.value
        let userInfo=null;
        if(flag === 'mobile'){ 
            userInfo=Object.assign(this.state.userInfo,{phone:value})
        }else{
            userInfo=Object.assign(this.state.userInfo,{password:value})
        }
        this.setState({
            userInfo
        })
    };
    //登录或注册
    btnRequest(){
        let canUse=checkPhone(this.state.userInfo.phone);
        if(!canUse||this.state.userInfo.phone.length!==11){
            message.error('请填写正确的手机号');
            return
        }
        if(this.state.isLogin){
            this.login()
        }else{
            if(this.state.userInfo.password.length<6){
                message.error('请填写安全的密码');
                return
            }
        }
    }
    login(){
        let url=`/login/cellphone?phone=${this.state.userInfo.phone}&password=${this.state.userInfo.password}`;
        http_get({url}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    };
    render(){
        let loginItem=null;
        //其他登录方式
        let otherStyle=[{
            icon:'\ue7e5',
            name:'微信'
        },{
            icon:'\ue666',
            name:'QQ'
        },{
            icon:'\ue62a',
            name:'新浪微博'
        },{
            icon:'\ue600',
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

        //返回登录
        let backLogin=null;
        if(!this.state.isLogin){
            backLogin=(
                <div className="login-back" onClick={()=>this.gotoLogin()}>返回登录</div>
            )
        }
        //注册
        let register=null;
        if(this.state.isLogin){
            register=(
                <div className="login-register" onClick={()=>this.gotoRegister()}>注册</div>
            )
        }
        if(this.state.isShow){
            loginItem=(
                <div className="login">
                    <Icon type="close" className="login-icon" onClick={()=>this.close()}/>
                    <div className="login-width">
                        <img src={require('../assets/images/login-bg.png')} alt='默认图片' width="300" className="login-img"/>
                        <Input placeholder="请输入手机号" prefix={<i className="iconfont">&#xe6bd;</i>} onChange={(e)=>this.getInputValue(e,'mobile')} className="input"/>
                        <Input placeholder={this.state.loginText} prefix={<i className="iconfont">&#xe672;</i>} onChange={(e)=>this.getInputValue(e,'password')} className="input"/>
                        <Button type="danger" block className="login-btn" onClick={()=>this.btnRequest()}>{this.state.btnName}</Button>
                        {register}
                        <div className="login-otherTitle">
                            <div className="login-lineLeft"></div>
                            <div>其他{this.state.btnName}方式</div>
                            <div className="login-lineRight"></div>
                        </div>
                        <div className="login-other">{otherLoginStyle}</div>
                        {backLogin}
                    </div>
                </div>
            )
        }
        return(
            <div>{loginItem}</div>
        )
    }
}