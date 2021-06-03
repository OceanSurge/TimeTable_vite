<template>
  <div>
    <el-form :model="teacher" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="username" prop="username">
        <el-input v-model="teacher.username"></el-input>
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input v-model="teacher.password"></el-input>
      </el-form-item>
      <el-form-item label="deleted" prop="deleted">
        <el-input v-model="teacher.deleted"></el-input>
      </el-form-item>
      <el-form-item label="role" prop="role">
        <el-input v-model="teacher.role" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue';
import {User} from "../../datasource";
import router from "../../router";
import axios from "axios";

export default defineComponent({
  name: "addTeacher",
  setup() {
    const teacher: Ref<User> = ref({
      role: "教师"
    })
    const submit = () => {
      axios({
        method: "POST",
        url: "addTeacher",
        data: teacher.value
      }).then(resp => {
        alert(resp.data.message)
        router.push("/teacherManage")
      })
    }
    const cancel = () => {
      router.push("/teacherManage")
    }
    return {
      teacher,
      submit,
      cancel
    }
  }
})
</script>

<style scoped>

</style>