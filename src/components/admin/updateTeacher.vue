<template>
  <div>
    <el-form :model="teacher" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="id" prop="id">
        <el-input v-model="teacher.id"></el-input>
      </el-form-item>
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
import {defineComponent, ref, Ref, computed} from 'vue';
import {User} from "../../datasource";
import axios from "axios";
import router from "../../router";
import {Store, useStore} from "vuex";
import {State} from "../../store";

export default defineComponent({
  name: "updateTeacher",
  setup() {
    const store: Store<State> = useStore();

    const teacher: Ref<User> = ref({});
    const TeacherId = computed(() => store.state.TeacherId);
    console.log(TeacherId.value)
    console.log(store.state.LoginUser)
    const getTeacherById = () => {
      axios({
        method: "POST",
        url: "getTeacherById",
        params: {
          "id": TeacherId.value
        }
      }).then(resp => {
        teacher.value = resp.data.data.teacherById
      })
    }
    getTeacherById();
    const submit = () => {
      axios({
        method: "POST",
        url: "TeacherSubmit",
        data: teacher.value
      }).then(resp => {
        alert(resp.data.message)
        sessionStorage.removeItem("teacherId")
        router.push("/TeacherManage")
      })
    }
    const cancel = () => {
      sessionStorage.removeItem("teacherId")
      router.push("/TeacherManage")
    }
    return {
      teacher,
      cancel,
      submit
    }
  }
})
</script>

<style scoped>

</style>