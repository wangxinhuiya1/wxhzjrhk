<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->


    <div class="Papers">
        <div class="Paper-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <el-input v-model="searchId" placeholder="请输入ID" clearable style="width: 120px;"></el-input>
            <el-button type="primary" @click="searchPaper">搜索</el-button>
        </div>
        <el-table :data="Papers" style="width: 100%">
            <el-table-column fixed prop="attachment" label="佐证材料" width="120" />
            <el-table-column prop="count" label="引用次数" width="120" />
            <el-table-column prop="id" label="论文编号" width="120" />
            <el-table-column prop="name" label="论文题目" width="120" />
            <el-table-column prop="publication" label="刊物" width="120" />
            <el-table-column prop="publicationCate" label="刊物种类" width="120" />
            <el-table-column prop="publishTime" label="发表时间" width="120" />
            <el-table-column prop="type" label="论文类型" width="120" />
            <el-table-column prop="userId" label="作者" width="120" />
            <el-table-column prop="type" label="修改操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="编辑Paper表单">
        <el-form :model="Paper">
            <el-form-item label="佐证材料" :label-width="formLabelWidth">
                <el-input v-model="Paper.attachment" autocomplete="off" />
            </el-form-item>
            <el-form-item label="引用次数" :label-width="formLabelWidth">
                <el-input v-model="Paper.count" autocomplete="off" />
            </el-form-item>
            <el-form-item label="论文编号" :label-width="formLabelWidth">
                <el-input v-model="Paper.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="论文题目" :label-width="formLabelWidth">
                <el-input v-model="Paper.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="刊物" :label-width="formLabelWidth">
                <el-input v-model="Paper.publication" autocomplete="off" />
            </el-form-item>
            <el-form-item label="刊物种类" :label-width="formLabelWidth">
                <el-input v-model="Paper.publicationCate" autocomplete="off" />
            </el-form-item>
            <el-form-item label="发表时间" :label-width="formLabelWidth">
                <el-input v-model="Paper.publishTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="论文类型" :label-width="formLabelWidth">
                <el-input v-model="Paper.type" autocomplete="off" />
            </el-form-item>
            <el-form-item label="作者" :label-width="formLabelWidth">
                <el-input v-model="Paper.userId" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
import { adCatePage, adCateDelId, adCateAdd, adCateEdit, } from "../../http/paper";
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            Papers: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            Paper: {
                "attachment": "",
                "count": 0,
                "id": 0,
                "name": "",
                "publication": "",
                "publicationCate": "",
                "publishTime": "",
                "type": "",
                "userId": 0
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getAdCatesPage(1)
    },
    methods: {
        toEdit(Paper) {
            console.log(Paper);
            this.dialogFormVisible = true;
            this.Paper = cloneDeep(Paper);
        },
        getAdCatesPage(current) {
            const data = {
                current: current,
                size: 2
            }
            adCatePage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.Papers = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getAdCatesPage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        del(id) {
            //删除数据
            //模拟删除，服务器进行处理 
            //要别人反悔机会
            // 如果只有一条数据，删除数据之后如何处理？
            //人机交互
            console.log(id)
            const params = {
                id: id
            }
            adCateDelId(params).then(res => {
                if (res.success) {
                    this.getAdCatesPage(this.page.current)

                }
                else {
                    console.log(res.msg)
                    return false
                }


            }).catch(err => {

            })
        },
        toAdd() {
            //到添加的页面
            this.dialogFormVisible = true;
            this.Paper = {
                "attachment": "",
                "count": 0,
                "id": 0,
                "name": "",
                "publication": "",
                "publicationCate": "",
                "publishTime": "",
                "type": "",
                "userId": 0
            }
        },
        searchPaper() {
            const id = parseInt(this.searchId);
            if(isNaN(id)) {
                ElMessage.warning('请输入有效的ID');
                return;
            }

            console.log('Searching Paper with ID:', id);

            getOnePaper(id)
                .then(res => {
                    console.log('Search result:', res);
                    if (res.success) {
                        // 处理搜索结果
                        const Paper = res.data.records;
                        this.Papers = [Paper]; // 将结果放入数组中
                        this.page = {
                            total: 1,
                            current: 1,
                            size: this.page.size
                        };
                    } else {
                        ElMessage.error(res.msg);
                    }
                })
                .catch(err =>{
                    ElMessage.error('网络错误，请联系管理员');
                });
        },
        save() {
            const Paper = this.Paper;
            if (Paper.id == 0) {
                adCateAdd(Paper).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else {
                adCateEdit(Paper).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdCatesPage(this.page.current)
                        ElMessage(res.msg)
                    }
                    else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }

        }

    }

});
</script>

<style lang="scss" scoped></style>
