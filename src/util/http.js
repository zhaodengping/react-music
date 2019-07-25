import axios from "axios";

let baseUrl =`http://musicapi.leanapp.cn`;


function http_get(url){
    let urlNew=`${baseUrl}${url}`
    return new Promise((resolve,reject)=>{
        axios.get(urlNew).then(res=>{
            resolve(res)
        }).then(err=>{
            reject(err)
        })
    })
}

function http_post(url,data){
    let urlNew=`${baseUrl}${url}`;
    return new Promise((resolve,reject)=>{
        axios.post(urlNew,data).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}

module.exports={
    http_get,
    http_post
}