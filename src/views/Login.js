import React from 'react'

import { Input,Button,Icon,message } from 'antd';

import '../assets/css/login.css'
import {checkPhone} from '../assets/js/util'
import {http_get} from '../assets/js/http'

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isShow:props.isShow,
            userInfo:{
                phone:'',
                password:''
            },
            btnName:'登录',
            loginText:'请输入密码',
            isLogin:true,//目前是登录 
            isCheck:false,//发送验证码页面
            timeBtn:'发送验证码',
            timeBtnClick:true,
            code:'',//验证码
        }
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
            userInfo:{
                phone:'',
                password:''
            },
            isLogin:false,
            btnName:'注册',
            loginText:"设置登录密码，不少于6位",
            isCheck:false
        })
    };
    //返回登录
    gotoLogin(){
        this.setState({
            userInfo:{
                phone:'',
                password:''
            },
            isLogin:true,
            btnName:'登录',
            loginText:"请输入密码",
            isCheck:false
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
            this.checkPhoneUse()
        }
    }
    //登陆
    login(){
        let url=`/login/cellphone?phone=${this.state.userInfo.phone}&password=${this.state.userInfo.password}`;
        http_get({url}).then(res=>{
            console.log(res)
        }).catch(err=>{
            message.error('账户不存在')
        })
    };
    // 注册
    checkPhoneUse(){
        let url=`/cellphone/existence/check?phone=${this.state.userInfo.phone}`
        http_get({url}).then(res=>{
            if(res.data.exist===-1){
                this.setState({
                    isCheck:true
                })
                this.sendCode()
            }else{
                message.warning('手机号已经注册，请直接登陆！')
            }
        }).catch(err=>{
            console.log(err)
        })
    };
    //发送验证码
    sendCode(){
        let url=`/captcha/sent?phone=${this.state.userInfo.phone}`;
        http_get({url}).then(res=>{
            if(res.data.code===200){
                let time=60
                let that=this;
                setInterval(function(){
                    if(time>0){
                        time--
                        that.setState({
                            timeBtn:time
                        })
                    }else{
                        that.setState({
                            timeBtnClick:false,
                            timeBtn:'发送验证码'
                        })
                    }
                },1000)
            }
        }).catch(err=>{
            message.error('验证码一天最多发5次～');
            this.setState({
                isShow:false
            })
        })
    };
    //下一步,注册
    nextStep(){
        let url=`/register/cellphone?phone=${this.state.userInfo.phone}&password=${this.state.userInfo.password}&captcha=${this.state.code}`
        http_get({url}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    };
    //填写验证码
    getCode(e){
        this.setState({
            code:e.target.value
        })
    };
    render(){
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
        return(
            <div>{this.state.isShow?
                <div className="login">
                    <Icon type="close" className="login-icon" onClick={()=>this.close()}/>
                    <div className="login-width">
                        <img src={require('../assets/images/login-bg.png')} alt='默认图片' width="300" className="login-img"/>
                        {this.state.isCheck?
                            <div>
                                <div>为了安全，我们会向你的手机发送短信校验码</div>
                                <div className='code-flex'>
                                    <Input placeholder='请写验证码' prefix={<i className="iconfont">&#xe618;</i>} onChange={(e)=>this.getCode(e)}/>
                                    <Button className='btn-time' type='danger' disabled={this.state.timeBtnClick}>{this.state.timeBtn}</Button>
                                </div>
                                <Button type="danger" block className='next-step' onClick={()=>this.nextStep()}>下一步</Button>
                                <div className="login-back" onClick={()=>this.gotoLogin()}>返回登录</div>
                            </div>
                            :
                            <div>
                                <Input placeholder="请输入手机号" prefix={<i className="iconfont">&#xe6bd;</i>} onChange={(e)=>this.getInputValue(e,'mobile')} className="input"/>
                                <Input.Password placeholder={this.state.loginText} prefix={<i className="iconfont">&#xe672;</i>} onChange={(e)=>this.getInputValue(e,'password')} className="input"/>
                                <Button type="danger" block className="login-btn" onClick={()=>this.btnRequest()}>{this.state.btnName}</Button>
                                <div>{this.state.isLogin}</div>
                                {this.state.isLogin?<div className="login-register" onClick={()=>this.gotoRegister()}>注册</div>:null}
                                <div className="login-otherTitle">
                                    <div className="login-lineLeft"></div>
                                    <div>其他{this.state.btnName}方式</div>
                                    <div className="login-lineRight"></div>
                                </div>
                                <div className="login-other">{otherLoginStyle}</div>
                                {this.state.isLogin?null:<div className="login-back" onClick={()=>this.gotoLogin()}>返回登录</div>}
                            </div>
                        }
                     </div>
                </div>:null}
            </div>
        )
    }
}