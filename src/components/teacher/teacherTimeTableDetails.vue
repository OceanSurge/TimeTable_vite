<template>
  <div>
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
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ courseName }}</span>
              <el-button class="button" type="text" @click="deleteCourse">退选</el-button>
            </div>
          </template>
          <div v-for="timeTable in selectCourseDetail" :key="timeTable.courseName" class="text item">
            {{ '第' + timeTable.week + '周周' + timeTable.weekDay + '第' + timeTable.lesson + '节课' }}
          </div>
        </el-card>
      </el-main>
    </el-container>

  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue';
import {Course, TimeTable, User} from "../../datasource";
import axios from "axios";
import router from "../../router";

export default defineComponent({
  name: "teacherTimeTableDetails",
  setup() {
    const userLogin: User = JSON.parse(sessionStorage.getItem("loginUser") as string) as User
    const selectCourseDetail: Ref<TimeTable[]> = ref();
    const courses: Ref<Course[]> = ref([]);
    const courseName: Ref<string> = ref();
    const active: string | null = sessionStorage.getItem("currentCourseByState");
    const selectCourseDetails = () => {
      axios({
        method: "POST",
        url: "selectCourseDetails",
        params: {
          courseName: active
        }
      }).then(resp => {
        selectCourseDetail.value = resp.data.data.courseName
      })
    };
    selectCourseDetails();
    const allCourse = () => {
      axios({
        method: "POST",
        url: "/allCourseByState",
        data: JSON.parse(sessionStorage.getItem("loginUser") as string) as User
      }).then(resp => {
        courses.value = resp.data.data.courses
        sessionStorage.setItem("currentCourseByState", courses.value[0].courseName)
        courseName.value = courses.value[0].courseName
      })
    };
    allCourse();
    const selected = (news: string) => {
      courseName.value = news;
      sessionStorage.setItem("currentCourseByState", news)
      axios({
        method: "POST",
        url: "selectCourseDetails",
        params: {
          courseName: news
        }
      }).then(resp => {
        selectCourseDetail.value = resp.data.data.courseName
        console.log(selectCourseDetail.value)
      })
    }
    const deleteCourse = () => {
      axios({
        method: "POST",
        url: "deleteCourse",
        data: selectCourseDetail.value,
        params: {
          courseName: courseName.value
        }
      }).then(resp => {

      });
      router.push("/selectCourse");
    }
    return {
      selectCourseDetail,
      courses,
      active,
      selected,
      deleteCourse,
      courseName,
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

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.el-main {
  height: 100%;
}
</style>