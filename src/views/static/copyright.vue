<template>
    <div class="copyright">
        <div class="copyright-tools">
            <el-button type="danger" @click="toAdd" round>添加</el-button>
        </div>
        <el-table :data="copyrights" style="width: 100%">
            <el-table-column fixed prop="id" label="编号" width="100" />
            <el-table-column prop="attachment" label="佐证材料" width="160" />
            <el-table-column prop="copyrightNo" label="著作权编号" width="140" />
            <el-table-column prop="finishTime" label="完成时间" width="140" />
            <el-table-column prop="name" label="著作权名称" width="140" />
            <el-table-column prop="publishTime" label="首次发表时间" width="140" />
            <el-table-column prop="userId" label="著作权人：第一位" width="140" />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev,pager,next" :page-size="page.size" @current-change="currentchange"
            :total="page.total" />
    </div>
    <el-dialog v-model="dialogFormVisible" title="著作权编辑">
        <el-form :model="copyright">
            <el-form-item label="佐证材料" :label-width="140">
                <el-input v-model="adCate.attachment" autocomplete="off" />
            </el-form-item>
            <el-form-item label="著作权编号" :label-width="140">
                <el-input v-model="adCate.copyrightNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="完成时间" :label-width="140">
                <el-input v-model="adCate.finishTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="著作权名称" :label-width="140">
                <el-input v-model="adCate.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="首次发表时间" :label-width="140">
                <el-input v-model="adCate.publishTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="著作权人：第一位" :label-width="140"><!-- :label-width="formLabelWidth" -->
                <el-input v-model="adCate.userId" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="save">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import {copyrightPage,
    copyrightAdd,
    copyrightEdit}from'../../http/copyright'
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            copyrights: [],
            page: {
                total: 0,
                current: 1,
                size: 2
            },
            dialogFormVisible: false,
            dialogFormVisible1: false,
            copyright: {
                "attachment": "",
                "copyrightNo": "",
                "finishTime": "",
                "id": 0,
                "name": "",
                "publishTime": "",
                "userId": 0
            },
            formLabelWidth: 80,
        }
    },
    mounted() {
        this.getAdcatesPage(1)
    },
    methods: {
        toEdit(copyright) {
            console.log(copyright)
            this.dialogFormVisible = true
            this.copyright = cloneDeep(copyright);

        },
        getAdcatesPage(current) {
            const data = {
                current: current,
                size: 2
            }
            copyrightPage(data).then(res => {
                console.log(res);
                const page = res.data.page;
                this.copyrights = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err)
            })
        },
        currentchange(current) {
            this.getAdcatesPage(current);
            this.page.current = current;
        },
        cancle() {
            this.dialogFormVisible1 = false
        },
        dele() {
            this.dialogFormVisible1 = true;
        },
        del(id) {
            const params = {
                id: id
            }
            adCateDelId(params).then(res => {
                if (res.success) {
                    this.getAdcatesPage(this.page.current)
                }
                else {
                    console.log(res.msg)
                    return false
                }
            }).catch(err => {

            })
            this.dialogFormVisible1 = false;
        },
        toAdd() {
            //到添加页面
            this.dialogFormVisible = true
        },
        save() {
            const copyright = this.copyright;
            if (copyright.id == 0) {
                copyrightAdd(copyright).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getAdcatesPage(this.page.current)
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
                copyrightEdit(copyright).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false
                        this.getAdcatesPage(this.page.current)
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
        },

    },
});
</script>
<style lang='scss' scoped></style>