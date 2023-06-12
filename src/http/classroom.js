import instance from "./axios";


// 添加教室接口
const addFile = (data) => {
  return instance.request({
    url: "api/classroom/add",
    method: "post",
    data,
  });
};

// 获取所有教室接口
const getAllFile = () => {
  return instance.request({
    url: "/api/file-info/all",
    method: "get",
  });
};

// 删除教室接口
const deleteFile = (params) => {
  return instance.request({
    url: "/api/file-info/delete",
    method: "get",
    params
  });
};

// 编辑教室接口
const editFile = (data) => {
  return instance.request({
    url: "/api/file-info/edit",
    method: "post",
    data
  });
};

// 获取单个教室接口
const getOneFile = (id) => {
  return instance.request({
    url: "/api/file-info/one/{id}",
    method: "get",
    params: {
      id: id,
    },
  });
};




export {
  getOneFile,
  editFile,
  deleteFile,
  getAllFile,
  addFile,
};
