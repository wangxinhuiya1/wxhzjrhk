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
// 按学院ID展示api/major/getMajorForSelectByDepartId
const majorSelectByDepartId = (params) => {
    return instance.request({
        url: 'api/major/getMajorForSelectByDepartId',
        params
    })
}
// 按学院ID查询数据是否存在api/major/getMajorForSelectByDepart
const majorSelectByDepart = (params) => {
    return instance.request({
        url: 'api/major/getMajorsForSelectByDepart',
        params
    })
}
// 按学校ID寻找数据是否存在api/major/getMajorForSelectBySchoolId
const majorSelectBySchoolId = (params) => {
    return instance.request({
        url: 'api/major/getMajorsForSelectBySchoolId',
        params
    })
}
// 按ID寻找数据是否存在api/major/getMajorForSelectBySchoolId
const majorSelectById = (params) => {
    return instance.request({
        url: 'api/major/one',
        params
    })
}

export {
    majorPage,
    majorAdd,
    majorEdit,
    majorDelId,
    majorSelectByDepart,
    majorSelectByDepartId,
    majorSelectBySchoolId,
    majorSelectById,
} 