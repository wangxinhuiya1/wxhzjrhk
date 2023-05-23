import instance from "./axios";
const adminLogin=(data)=>{
    return instance.request({
        url:'',
        method:'',
        data
    })
}

const classinfoAll=(data)=>{
    return instance.request({
        url:'api/classinfo/all',
        method:'get',
        data
    })
}
const classinfoAdd=(data)=>{
    return instance.request({
      url:'api/classinfo/add',
      method :'post',
      data
  })
  }
  const classinfoPage=(data)=>{
    return instance.request({
      url:'api/classinfo/page',
      method :'post',
      data
  })
  }
  const classinfoEdit=(data)=>{
    return instance.request({
      url:'api/classinfo/edit',
      method :'post',
     data
  })
  } 
  const classinfoDelId=(params)=>{
    return instance.request({
        url:'api/classinfo/delete',
        params
    })
}
export {
    classinfoAll,
    classinfoAdd,
    classinfoEdit,
    classinfoDelId,
    adminLogin,
    classinfoPage
} 