import instance from "./axios";
// 编写major的api接口，每个功能都有单独的接口
// 页面page展示接口
const majorPage = (data) => {
    return instance.request({
        url: 'api/major/page',
        method: 'post',
        data
    })
}
// 增
const majorAdd = (data) => {
    return instance.request({
        url: 'api/major/add',
        method: 'post',
        data
    })
}
// 删
const majorDelId = (params) => {
    return instance.request({
        url: 'api/major/delete',
        params
    })
}
// 改
const majorEdit = (data) => {
    return instance.request({
        url: 'api/major/edit',
        method: 'post',
        data
    })
}
//以下未实现
// 按column展示api/major/colums
const majorColumn = (data) => {
    return instance.request({
        url: 'api/major/colums',
        params
    })
}
// 按学院ID展示api/major/getMajorForSelectByDepartId
const majorSelectByDepartId = (data) => {
    return instance.request({
        url: 'api/major/getMajorForSelectByDepartId',
        method: 'post',
        data
    })
}
// 按学院名称展示api/major/getMajorForSelectByDepart
const majorSelectByDepart = (data) => {
    return instance.request({
        url: 'api/major/getMajorForSelectByDepart',
        method: 'post',
        data
    })
}
// 按学校ID展示api/major/getMajorForSelectBySchoolId
const majorSelectBySchoolId = (data) => {
    return instance.request({
        url: 'api/major/getMajorForSelectBySchoolId',
        method: 'post',
        data
    })
}

export {
    majorPage,
    majorAdd,
    majorEdit,
    majorDelId,
    majorColumn,
    majorSelectByDepart,
    majorSelectByDepartId,
    majorSelectBySchoolId,
} 