import axios from "axios";

let baseUrl =`http://localhost:3000`;


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

export function http_post({url,data}){
    let urlNew=`${baseUrl}${url}`;
    return new Promise((resolve,reject)=>{
        axios.post(urlNew,data).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
} 