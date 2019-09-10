export function checkPhone(e){
    let canUse=false
    let phone=Number(e)
    if((/^1[3456789]\d{9}$/.test(phone))){
        canUse=true
    }
    return canUse
}

//播放次数超过10万，显示万
export function showCount(e){
    let flag=false;
    if(e>100000){
        flag=true
    }
    return flag
}