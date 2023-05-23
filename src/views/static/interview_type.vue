<template>
    <div class="interviewTypes">
        <div class="interviewType-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <el-table :data="interviewTypes" style="width: 100%">
            <el-table-column fixed prop="id" label="编号" width="120" />
            <el-table-column prop="typeName" label="面试题型" />

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
    <el-dialog v-model="dialogFormVisible" title="面试题型编辑">
        <el-form :model="type">
            <el-form-item label="编号" :label-width="formLabelWidth">
                <el-input v-model="interviewType.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="面试题型" :label-width="formLabelWidth">
                <el-input v-model="interviewType.typeName" autocomplete="off" />
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
import {  adtypePage,
    adtypeDelId,
    adtypeAdd,
    adtypeEdit, } from "../../http/interview_type";
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
export default defineComponent({
    data() {
        return {
            interviewTypes: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            interviewType: {
                "id": 0,
                "typeName": ""
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getAdtypePage(1)
    },
    methods: {
        toEdit(interviewType) {
            console.log(interviewType);
            this.dialogFormVisible = true;
            this.interviewType = cloneDeep(interviewType);
        },
        getAdtypePage(current) {
            const data = {
                current: current,
                size: 2
            }
            adtypePage(data).then(res => {
                console.log(res);
                const page = res.data.interviewTypes;
                this.interviewTypes = page;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })

        },
        currentchange(current) {
            // console.log(current);
            this.getAdtypePage(current);
            this.page.current = current;//数据更新目前显示的页面
        },
        del(id) {
            console.log(id)
            const params = {
                id: id
            }
            adtypeDelId(params).then(res => {
                if (res.success) {
                    this.getAdtypePage(this.page.current)
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
            const interviewType = this.interviewType;
            if (interviewType.id == 0) {
                adtypeAdd(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdtypePage(this.page.current)
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
                adtypeEdit(adcate).then(res => {
                    if (res.success) {
                        //刷新页面
                        this.dialogFormVisible = false;
                        this.getAdtypePage(this.page.current)
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
