import axios from "axios";
let baseUrl =`http://localhost:3000`;
axios.defaults.withCredentials=true
//请求头上不用加cookie
export function http_get({url}){
    let urlNew=`${baseUrl}${url}`
    return new Promise((resolve,reject)=>{
        axios.get(urlNew).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}

export function http_getWithCookie({url}){
    let urlNew=`${baseUrl}${url}`;
  
    console.log(window.document.cookie)
    return new Promise((resolve,reject)=>{
        axios({
            url:urlNew,
            withCredentials: true //关键
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
        // axios.get(urlNew).then(res=>{
        //     resolve(res)
        // }).catch(err=>{
        //     reject(err)
        // })
    })
} 