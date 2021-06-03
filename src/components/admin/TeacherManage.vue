<template>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <div class="card-header-search">
            <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getUserList"/>
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </div>
          <el-button class="button" type="info" @click="addTeacher">添加教师</el-button>
        </div>
      </template>
      <div class="block">
        <el-table
            :data="teachers"
            stripe
            style="width: 100%">
          <el-table-column
              prop="id"
              label="id"
              width="180">
          </el-table-column>
          <el-table-column
              prop="username"
              label="用户名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="password"
              label="密码"
              width="180">
          </el-table-column>
          <el-table-column
              prop="deleted"
              label="密码"
              width="180">
            <template #default="scope">
              <el-switch
                  :active-value=0
                  :inactive-value=1
                  v-model="scope.row.deleted"
                  @change="updateState(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              width="180">
            <template #default="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini"
                         @click="updateTeacher(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"
                         @click="deleteTeacher(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pageNum"
            :page-sizes="[1, 2, 5, 100]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue';
import axios from "axios";
import {queryInfo, User} from "../../datasource";
import router from "../../router";

export default defineComponent({
  name: "TeacherManage",
  setup() {
    const queryInfo: Ref<queryInfo> = ref({
      query: "",
      pageNum: 1,
      pageSize: 5
    });
    const teachers: Ref<User[]> = ref([])
    const total: Ref<number> = ref(0)
    axios({
      method: "POST",
      url: "allTeacher",
      data: queryInfo.value
    }).then(resp => {
      teachers.value = resp.data.data.teachers
      total.value = resp.data.data.number
    })
    const getUserList = () => {
      axios({
        method: "POST",
        url: "allTeacher",
        data: queryInfo.value
      }).then(resp => {

        teachers.value = resp.data.data.teachers
        total.value = resp.data.data.number
      })
    }
    const handleSizeChange = (newSize: number) => {
      queryInfo.value.pageSize = newSize;
      getUserList();
    }
    const handleCurrentChange = (newPage: number) => {
      queryInfo.value.pageNum = newPage;
      getUserList();
    }
    const updateState = (teacherInfo: User) => {
      // console.log(teacherInfo)
      axios({
        method: "POST",
        url: "updateState",
        data: teacherInfo
      }).then(resp => {
        // console.log(resp.data.message)
        // alert(resp.data.message)

      })
    }
    const updateTeacher = (id: number) => {
      sessionStorage.setItem("teacherId", JSON.stringify(id))
      router.push("/updateTeacher")
    }
    const deleteTeacher = (id: number) => {
      axios({
        method: "POST",
        url: "deleteTeacher",
        params: {
          "id": id
        }
      }).then(resp => {
        alert(resp.data.message)
        getUserList()
      })
    }
    const addTeacher = () => {
      router.push("/addTeacher")
    }
    return {
      queryInfo,
      total,
      teachers,
      handleSizeChange,
      handleCurrentChange,
      updateState,
      updateTeacher,
      getUserList,
      deleteTeacher,
      addTeacher
    }
  }
})
</script>


<style scoped>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-search {
  display: flex;

}

</style>