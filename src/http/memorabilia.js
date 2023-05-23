import instance from "./axios";
// 编写memorabilia的api接口，每个功能都有单独的接口

const memorabiliaAdd = (data) => {
    return instance.request({
        url: 'api/memorabilia/add',
        method: 'post',
        data
    })
}

const memorabiliaAll = (params) => {
    return instance.request({
        url: 'api/memorabilia/all',
        params
    })
}

const memorabiliaDelete = (params) => {
    return instance.request({
        url: 'api/memorabilia/delete',
        params
    })
}


const memorabiliaEdit = (data) => {
    return instance.request({
        url: 'api/memorabilia/edit',
        method: 'post',
        data
    })
}

const memorabiliaOne = (params) => {
    return instance.request({
        url: 'api/memorabilia/one',
        params
    })
}

const memorabiliaGetMemorabiliasPage = (data) => {
    return instance.request({
        url: 'api/memorabilia/page',
        method: 'post',
        data
    })
}

const memorabiliaUserMemorabilias = (params) => {
    return instance.request({
        url: 'api/memorabilia/userMemorabilias',
        params
    })
}


export default{
    memorabiliaAdd,
    memorabiliaAll,
    memorabiliaDelete,
    memorabiliaEdit,
    memorabiliaOne,
    memorabiliaGetMemorabiliasPage,
    memorabiliaUserMemorabilias
} 