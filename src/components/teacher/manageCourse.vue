<template>
  <div>
    <el-container>
      <el-header>
        <el-button type="primary"
                   style="width: 100%"
                   @click="addCourse">
          添加课程
        </el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu class="el-menu-vertical-demo"
                   @select="selected"
                   :default-active="active">
            <el-menu-item-group>
              <template #title>您的课程列表</template>
              <el-menu-item v-for="course in courses" :index="course.courseName">
                {{ course.courseName }}
              </el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-aside>
        <el-main>
          <el-form ref="form" :model="courseDetail" label-width="80px" style="width: 500px;">
            <el-form-item label="课程名称" prop="courseName">
              <el-input v-model="courseDetail.courseName"></el-input>
            </el-form-item>
            <el-form-item label="教师名称" prop="username">
              <el-input v-model="user.username" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="每天课时" prop="timeLength">
              <el-input v-model="courseDetail.timeLength"></el-input>
            </el-form-item>
            <el-form-item label="每周课次" prop="weekLength">
              <el-input v-model="courseDetail.weekLength"></el-input>
            </el-form-item>
            <el-form-item label="持续周长" prop="weekNumber">
              <el-input v-model="courseDetail.weekNumber"></el-input>
            </el-form-item>
            <el-form-item>
              <div v-if="courseDetail.state==1" class="char">
                <p>已选课</p>
              </div>
              <div v-if="courseDetail.state!=1" class="char">
                <p>未选课</p>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">提交</el-button>
              <el-button type="warning" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue';
import axios from "axios";
import {Course, ResultVO, User} from "../../datasource";
import router from "../../router";
import {ElForm} from "element-plus";

export default defineComponent({
  name: "addCourse",
  setup() {
    const courses: Ref<Course[]> = ref([]);
    const courseDetail: Ref<Course> = ref({});
    const form = ref({});
    const user: Ref<User> = ref(JSON.parse(sessionStorage.getItem("loginUser") as string) as User);
    const active: string | null = sessionStorage.getItem("currentCourse");
    const allCourse = () => {
      axios({
        method: "POST",
        url: "/allCourse",
        data: JSON.parse(sessionStorage.getItem("loginUser") as string) as User
      }).then(resp => {
        courses.value = resp.data.data.courses
        sessionStorage.setItem("currentCourse", resp.data.data.courses[0].courseName)
        courseDetail.value = resp.data.data.courses[0]
      })
    }
    allCourse()
    const addCourse = () => {
      router.push("/addCourse")
    }
    const selected = (news: string) => {
      sessionStorage.setItem("currentCourse", news)
      axios({
        method: "POST",
        url: "/courseByName",
        params: {
          course: news
        }
      }).then(resp => {
        courseDetail.value = resp.data.data.course
      })
    }
    const reset = () => {
      selected(sessionStorage.getItem("currentCourse") as string)
    }
    return {
      addCourse,
      courses,
      active,
      selected,
      courseDetail,
      user,
      form,
      reset,
    }
  }
})
</script>

<style scoped>
.char{
  font-size: 30px;
}
</style>