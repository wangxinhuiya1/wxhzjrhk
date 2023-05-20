<template>
    <!-- el-table显示数据,分页 -->

    <div class="majors">
        <div class="major-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
        </div>
        <!-- 表单显示部分 -->
        <el-table :data="majors" style="width: 100%">
            <el-table-column fixed prop="id" width="150" />
            <el-table-column prop="majorName" label="专业名称" width="120" />
            <el-table-column prop="majorDesc" label="专业描述" width="120" />
            <el-table-column prop="departId" label="学院ID" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />
            <el-table-column prop="deleted" label="删除" width="120" />
            <el-table-column prop="schoolId" label="学校ID" width="120" />
            <el-table-column fixed="right" label="功能管理" width="120">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="toEdit(scope.row)">更新</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
            @current-change="currentchange" />
    </div>
    <!-- 添加按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisible" title="专业信息编辑">
        <el-form :model="Major">
            <el-form-item label="专业名称" :label-width="formLabelWidth">
                <el-input v-model="Major.majorName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="专业描述" :label-width="formLabelWidth">
                <el-input v-model="Major.majorDesc" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学院ID" :label-width="formLabelWidth">
                <el-input v-model="Major.departId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校ID" :label-width="formLabelWidth">
                <el-input v-model="Major.schoolId" autocomplete="off" />
            </el-form-item>
            
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="save">保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { majorPage, majorDelId, majorAdd, majorEdit, majorColumn } from '../../http/major';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            majors: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            Major: {
                "id": 0,
                "majorName": "",
                "majorDesc": "",
                "departId": 0,
                "createTime": "",
                "updateTime": "",
                "deleted": 0,
                "schoolId": 0,
            },
            MajorColums: {
                "colums":"",
            },
            formLabelWidth: 80
        }
    },
    mounted() {
        this.getMajorsPage(1)
    },
    methods: {
        toEdit(major) {
            this.dialogFormVisible = true;
            this.Major = cloneDeep(major);
        },
        // 按page展示
        getMajorsPage(current) {
            const data = {
                current: current,
                size: 4
            }

            majorPage(data).then(res => {
                const page = res.data.page;
                this.majors = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
        },
        // 按column展示
        getMajorsColumn(colums) {
            const params = {
                colums: colums,
            }

            majorColumn(params).then(res => {
                const page = res.params.page;
                this.majors = page.records;
                this.page = page;
            }).catch(err => {
                console.log(err);
            })
        },
        currentchange(current) {
            // console.log(current);
            this.getMajorsPage(current);
            this.page.current = current;//数据更新到目前显示的页面
        },
        del(id) {
            if (confirm("是否删除") == true) {
                console.log(id);
            }
            console.log(id);
            const params = {
                id: id
            }
            majorDelId(params).then(res => {
                if (res.success) {
                    this.getMajorsPage(this.page.current)
                } else {
                    console.log(res.msg);
                    return false
                }
            }).catch(err => {

            })
        },
        toAdd() {
            this.dialogFormVisible = true;
        },
        save() {
            const major = this.Major
            if (major.id == 0) {
                majorAdd(major).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getMajorsPage(this.page.current)
                        ElMessage(res.msg)
                    } else {
                        ElMessage(res.msg)
                        return false
                    }
                }).catch(err => {
                    ElMessage('网络错误联系管理员')
                })
            }
            else {
                majorEdit(major).then(res => {
                    if (res.success) {
                        this.dialogFormVisible = false
                        this.getMajorsPage(this.page.current)
                        ElMessage(res.msg)
                    } else {
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
<style lang = "scss" scoped></style>