<template>
    <!--
         1 el-table显示数据,分页 
         2  token cookie|session 服务端保存状态信息方式   
         H5 token 如果有值 登录状态 否则就是登录
         进入某个页面就要进行拦截：判断用户是否登录
         通过什么方式：路由守卫
         3 添加和更新
    -->


    <div class="adCates">
        <div class="adcate-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="adCates" style="width: 100%">
            <el-table-column fixed prop="id" label="分类id" width="120" />
            <el-table-column prop="catName" label="类别名称" width="120"/>
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="deleted" label="删除" width="120" />
            
            <el-table-column prop="parentId" label="夫级id" width="120" />
            <el-table-column prop="showInNav" label="是否导航显示" width="120" />
            <el-table-column prop="sortOrder" label="排序" width="120" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="更新文章类别信息">
        <el-form :model="adCate">
            <el-form-item label="分类id" :label-width="formLabelWidth">
                <el-input v-model="adCate.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="类别名称" :label-width="formLabelWidth">
                <el-input v-model="adCate.catName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="adCate.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="删除" :label-width="formLabelWidth">
                <el-input v-model="adCate.deleted" autocomplete="off" />
            </el-form-item>
            <el-form-item label="夫级id" :label-width="formLabelWidth">
                <el-input v-model="adCate.parentId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否导航显示" :label-width="formLabelWidth">
                <el-input v-model="adCate.showInNav" autocomplete="off" />
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input v-model="adCate.sortOrder" autocomplete="off" />
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
                <el-input v-model="adCate.updateTime" autocomplete="off" />
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
import { adCatePage, adCateDelId, adCateAdd, adCateEdit } from "../../http/articlecat";
import { ElMessage } from 'element-plus'
import {cloneDeep} from 'lodash-es'
export default defineComponent({
    data() {
        return {
            adCates: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            adCate: {
                "catName": "",
                "createTime": "",
                "deleted": 0,
                "id": 0,
                "parentId": 0,
                "showInNav": true,
                "sortOrder": 0,
                "updateTime": ""
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getAdCatesPage(1)
    },
    methods: {
        toEdit(adcate) {
            console.log(adcate);
            this.dialogFormVisible=true;
            this.adCate=cloneDeep(adcate);    
        },
        getAdCatesPage(current) {
            const data = {
                current: current,
                size: 2
            }
            adCatePage(data).then(res => {
                console.log(res);
                const page = res.data.articleCats;
                this.adCates = page;
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
        },
        save() {
            const adcate = this.adCate;
            if (adcate.id == 0) {
                adCateAdd(adcate).then(res => {
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
            else{
                adCateEdit(adcate).then(res => {
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
