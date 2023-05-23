import instance from "./axios";

// 用户登录接口
const userLogin = (data) => {
  return instance.request({
    url: 'api/mobile/elogin',
    method: 'post',
    data,
    headers: {}
  });
};

// 管理员登录接口
const adminLogin2 = function(data) {
  return instance.request({
    url: '', // 添加实际的URL
    method: 'post',
    data
  });
};

// 添加类接口
const adCateAdd = (data) => {
  return instance.request({
    url: "api/articleCat/add",
    method: "post",
    data,
  });
};

// 获取所有类接口
const adCatePage = () => {
  return instance.request({
    url: "api/articleCat/all",
    method: "get",
  });
};

// 删除接口
const adCateDelId = (params) => {
  return instance.request({
    url: "api/articleCat/delete",
    method: "get",
    params
  });
};

// 编辑类接口
const adCateEdit = (data) => {
  return instance.request({
    url: "api/articleCat/edit",
    method: "post",
    data
  });
};

// 获取获取文章类别分类列
const getArticleCatsByColums = (id) => {
  return instance.request({
    url: "api/articleCat/colums",
    method: "get",
    
  });
};


// 获取用于选择的文章类别
const getArticleCatForSelect = () => {
  return instance.request({
    url: "api/articleCat/getArticleCatForSelect",
    method: "get",
  });
};



// 获取单个文章类
const getOnearticleCat = (id) => {
    return instance.request({
      url: "api/articleCat/one",
      method: "get",
      params: {
        id: id,
      },
    });
  };

export {
  userLogin,
  adminLogin2,
  adCateAdd,
  getArticleCatsByColums,
  adCatePage,
  adCateDelId,
  getArticleCatForSelect,
  getOnearticleCat,
  adCateEdit
};
