//统一api管理
import instance from "./axios";
//data json
const userLogin=(data)=>{
    //返回Prommise对象
     return instance.request({
        url:'api/mobile/elogin', //fullpath=baseURL+url  http://api.jqrjq.cn/api/mobile/elogin
        method:'post',
        data
    })
} 
const adminLogin=(data)=>{
    return instance.request({
        url:'', //url=baseURL+url
        method:'post',
        data
    })
}
const copyrightPage=(data)=>{
    return instance.request({
        url:'api/copyright/page',
        method:'post',
        data
    })
}
const copyrightAdd=(data)=>{
    return instance.request({
        url:'api/copyright/add',
        method:'post',
        data
    })
}
const copyrightEdit=(data)=>{
    return instance.request({
        url:'api/copyright/edit',
        method:'post',
        data
    })
}
export {
    userLogin,
    adminLogin,
    copyrightPage,
    copyrightAdd,
    copyrightEdit
} //多个输出