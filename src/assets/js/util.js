export function checkPhone(e){
    let canUse=false
    let phone=Number(e)
    if((/^1[3456789]\d{9}$/.test(phone))){
        canUse=true
    }
    return canUse
}