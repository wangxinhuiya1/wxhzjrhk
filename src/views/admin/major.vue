<template>
    <!-- el-table显示数据,分页 -->

    <div class="majors">

        <div class="major-tools">
            <el-button type="warning" @click="toAdd">添加</el-button>
            <el-button type="warning" @click="selectByDepartId">按学院ID查询数据</el-button>
            <el-button type="warning" @click="selectByDepart">按学院名称查询数据</el-button>
            <el-button type="warning" @click="selectBySchoolId">按学校ID查询数据</el-button>
            <el-button type="warning" @click="selectById">按专业ID查询数据</el-button>
            <el-button type="warning" @click="refresh">刷新查询</el-button>
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

    <!-- 学院ID查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleByDepartId" title="学院ID查询">

        <el-form :model="Major">
            <el-form-item label="请输入学院ID" :label-width="120">
                <el-input v-model="searchText" placeholder="按学院ID搜索专业，请输入学院ID" clearable @clear="clearSearch"
                     style="margin-bottom: 20px;" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleByDepartId = false">Cancel</el-button>
                <el-button type="primary" @click="getMajorsByDepartID(searchText)">查询
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 学院名称查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleByDepart" title="学院名称查询">
        <el-form :model="Major">
            <el-form-item label="请输入学院名称" :label-width="120">
                <el-input v-model="searchText" placeholder="按学院名称搜索专业，请输入学院名称" clearable @clear="clearSearch"
                     style="margin-bottom: 20px;" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleByDepart = false">Cancel</el-button>
                <el-button type="primary" @click="getMajorsByDepart(searchText)">查询
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 学校ID查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleBySchoolId" title="学校ID查询">
        <el-form :model="Major">
            <el-form-item label="请输入学校ID" :label-width="120">
                <el-input v-model="searchText" placeholder="按学校ID搜索专业，请输入学校ID"
                     style="margin-bottom: 20px;" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleBySchoolId = false">Cancel</el-button>
                <el-button type="primary" @click="getMajorsBySchoolId(searchText)">查询
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 专业ID查询按钮点击后出现的表单 -->
    <el-dialog v-model="dialogFormVisibleById" title="专业ID查询">
        <el-form :model="Major">
            <el-form-item label="请输入专业ID" :label-width="120">
                <el-input v-model="searchText" placeholder="按专业ID搜索专业，请输入专业ID"
                    style="margin-bottom: 20px;" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleById = false">Cancel</el-button>
                <el-button type="primary" @click="getMajorsById(searchText)">查询
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { majorPage, majorDelId, majorAdd, majorEdit,  majorSelectByDepart, majorSelectByDepartId, majorSelectBySchoolId, majorSelectById } from '../../http/major';
import { cloneDeep } from 'lodash-es';
export default defineComponent({
    data() {
        return {
            searchText: '',
            majors: [],
            major: [],
            page: {
                total: 0,
                current: 1,
                size: 10
            },
            dialogFormVisible: false,
            dialogFormVisibleByDepartId: false,
            dialogFormVisibleByDepart: false,
            dialogFormVisibleBySchoolId: false,
            dialogFormVisibleById: false,
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

        // 按学院ID查询专业
        getMajorsByDepartID(departId) {
            const params = {
                departId: departId
            }
            majorSelectByDepartId(params).then(res => {
                this.dialogFormVisibleByDepartId = false;
                const majors = res.data.majors;
                this.majors = majors;
                ElMessage("查询成功")
            }).catch(err => {
                console.log(err);
                ElMessage("查询失败，没有该学院")
            })
        },

        // 按学院名称查询专业
        getMajorsByDepart(depart) {
            const params = {
                depart: depart
            }
            majorSelectByDepart(params).then(res => {
                this.dialogFormVisibleByDepart = false;
                const majors = res.data.majors;
                this.majors = majors;
                ElMessage("查询成功")
            }).catch(err => {
                ElMessage("查询失败，没有该学院")
                console.log(err);
            })
        },

        // 按学校ID查询专业
        getMajorsBySchoolId(schoolId) {
            const params = {
                schoolId: schoolId
            }
            majorSelectBySchoolId(params).then(res => {
                this.dialogFormVisibleBySchoolId = false;
                const majors = res.data.majors;
                this.majors = majors;
                console.log(this.majors)
                ElMessage("查询成功")
            }).catch(err => {
                ElMessage("查询失败，没有该学校")
                console.log(err);
            })
        },

        // 按专业ID查询专业
        getMajorsById(id) {
            this.major=[];
            const params = {
                id: id
            }
            majorSelectById(params).then(res => {
                this.dialogFormVisibleById = false;
                this.major.push(res.data.major);
                const majors = this.major;
                this.majors = majors;
                ElMessage("查询成功")
            }).catch(err => {
                ElMessage("查询失败，没有该专业")
                console.log(err);
            })
        },

        currentchange(current) {
            this.getMajorsPage(current);
            this.page.current = current;//数据更新到目前显示的页面
        },
        del(id) {
            if (confirm("是否删除") == true) {
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
                    ElMessage("删除失败")
                })
            }
        },
        //控制表单的显示
        toAdd() {//控制添加表单的显示
            this.dialogFormVisible = true;
        },
        selectByDepartId() {
            this.dialogFormVisibleByDepartId = true;
        },
        selectByDepart() {
            this.dialogFormVisibleByDepart = true;
        },
        selectBySchoolId() {
            this.dialogFormVisibleBySchoolId = true;
        },
        selectById() {
            this.dialogFormVisibleById = true;
        },
        refresh() {//刷新按钮
            this.getMajorsPage(1);
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