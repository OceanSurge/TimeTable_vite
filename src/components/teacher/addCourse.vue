<template>
  <div class="container">
    <el-form :model="course" status-icon ref="elForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程名称:" prop="courseName" class="input">
        <el-input type="text" v-model="course.courseName" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="教师名称:" prop="courseName" class="input">
        <el-input type="text" :readonly="true" v-model="user.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="每天课时:" prop="timeLength" class="input">
        <el-select v-model="course.timeLength" placeholder="请选择">
          <el-option
              v-for="item in timeLength"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="每周课次:" prop="weekLength" class="input">
        <el-select v-model="course.weekLength" placeholder="请选择">
          <el-option
              v-for="item in weekLength"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="持续周长:" prop="weekNumber" class="input">
        <el-select v-model="course.weekNumber" placeholder="请选择">
          <el-option
              v-for="item in weekNumber"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="input">
        <el-button type="primary" @click="addCourse">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue';
import {Course, User} from "../../datasource";
import axios from "axios";
import router from "../../router";
import {ElForm} from "element-plus";

export default defineComponent({
  name: "addCourse",
  setup() {
    const user: Ref<User> = ref(JSON.parse(sessionStorage.getItem("loginUser") as string) as User);
    const timeLength: Ref<number[]> = ref([1, 2, 3, 4, 5]);
    const weekLength: Ref<number[]> = ref([1, 2, 3, 4, 5, 6, 7]);
    const weekNumber: Ref<number[]> = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    const course: Ref<Course> = ref({
      teacherId: user.value.id
    });
    const elForm = ref({});
    const cancel = () => {
      router.push("/manageCourse")
    }

    const addCourse = () => {
      axios({
        method: "POST",
        url: "/addCourse",
        data: course.value
      }).then(resp => {
        alert(resp.data.message)
        router.push("/manageCourse")
      })
    }
    const reset = () => {
      (elForm.value as typeof ElForm).resetFields()
    }
    return {
      course,
      elForm,
      cancel,
      user,
      timeLength,
      weekLength,
      weekNumber,
      addCourse,
      reset,
    }
  }
})
</script>

<style scoped>
.container{
  width: 100%;
  height: 600px;
  /*border: 1px solid red;*/
  display: flex;
  align-items: center;
  justify-content: center;
}
.demo-ruleForm{
  width: 500px;
}
.input{
  width: 500px;
}

</style>