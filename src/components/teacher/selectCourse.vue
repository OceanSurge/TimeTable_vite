<template>
  <div>
    <el-container>
      <el-header>
        <el-menu class="el-menu-demo"
                 mode="horizontal"
                 @select="change"
                 :default-active="laboratoryActive">
          <el-menu-item v-for="laboratory in laboratories"
                        :index="(laboratory).laboratoryName"
                        :key="laboratory.laboratoryName"
          >
            {{ laboratory.laboratoryName }}
          </el-menu-item>
        </el-menu>
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
          <el-card class="box-card">

            <div :class="course.state==1?'inSelect':'none'">
              <p>已选课</p>
            </div>

            <div v-for="result in results" :class="course.state==1?'none':'select'"
            >
              <div class="select_left">
                <div class="list1">
                  <p>第{{ result.week }}周开始上课</p>
                </div>
                <div class="list2">
                  <div class="select21">
                    <div v-for="w in result.weekDay" class="list21">
                      <p>周{{ w }}</p>
                    </div>
                  </div>
                  <div class="select22">
                    <div v-for="l in result.lesson" class="list22">
                      <p>第{{ l }}节开始上课</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="select_right">
                <el-button type="primary" @click="selectingCourse(result)" :disabled="course.state==1">选课</el-button>
              </div>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue';
import axios from "axios";
import {Course, CourseSelectList, Laboratory, User} from "../../datasource";
import router from "../../router";

export default defineComponent({
  name: "selectCourse",
  setup() {
    const courses: Ref<Course[]> = ref([]);
    const course: Ref<Course> = ref({});
    const active: string | null = sessionStorage.getItem("currentSelectCourse");
    const laboratoryActive: string | null = sessionStorage.getItem("laboratoryActive");
    const laboratories: Ref<Laboratory[]> = ref([])
    const selectMessage: Ref<{ laboratoryName?: string; courseName?: string }> = ref({})
    const results: Ref<CourseSelectList[]> = ref([]);
    const allCourse = () => {
      axios({
        method: "POST",
        url: "/allCourse",
        data: JSON.parse(sessionStorage.getItem("loginUser") as string) as User
      }).then(resp => {
        courses.value = resp.data.data.courses
        sessionStorage.setItem("currentSelectCourse", resp.data.data.courses[0].courseName)
        selectMessage.value.courseName = resp.data.data.courses[0].courseName
      })
    }
    const allLaboratory = () => {
      axios({
        method: "POST",
        url: "allLaboratory",
      }).then(resp => {
        laboratories.value = resp.data.data.allLaboratory
        sessionStorage.setItem("laboratoryActive", resp.data.data.allLaboratory[0].laboratoryName);
        selectMessage.value.laboratoryName = resp.data.data.allLaboratory[0].laboratoryName
      })
    }
    const selected = (news: string) => {
      selectMessage.value.courseName = news;
      sessionStorage.setItem("currentSelectCourse", news)
      axios({
        method: "POST",
        url: "selectCourseByName",
        params: {
          courseName: news
        }
      }).then(resp => {
        course.value = resp.data.data.course
      })
      selectCourse();
    }
    const change = (news: string) => {
      selectMessage.value.laboratoryName = news;
      sessionStorage.setItem("currentSelectCourse", news)
      selectCourse();
    }
    const selectCourse = () => {
      axios({
        method: "POST",
        url: "selectCourse",
        params: {
          courseName: selectMessage.value.courseName,
          laboratoryName: selectMessage.value.laboratoryName
        }
      }).then(resp => {
        // console.log(resp.data[0].weekDay[0] as number)
        // console.log(resp.data[0].lesson[resp.data[0].weekDay[0] as number] as number)
        results.value = resp.data.data
        // console.log(Array.from(results.value[0].weekDay[0]))
      })
    }
    allCourse()
    allLaboratory()
    selectCourse()
    // selectCourse()
    console.log(selectMessage)
    const selectingCourse = (result: CourseSelectList) => {
      axios({
        method: "POST",
        url: "selectingCourse",
        data: result,
        params: {
          course: selectMessage.value.courseName,
          laboratory: selectMessage.value.laboratoryName
        }
      }).then(resp => {
        router.push("/teacherTimeTableDetails")
        sessionStorage.setItem("selectingCourse", JSON.stringify(result))
      });

    }
    console.log(selectMessage)
    return {
      courses,
      active,
      allCourse,
      selected,
      laboratories,
      laboratoryActive,
      selectCourse,
      change,
      results,
      selectingCourse,
      course
    }
  }
})
</script>

<style scoped>

.none {
  display: none;
}

.inSelect {
  width: 700px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
}

.select {
  width: 700px;
  height: 150px;
  background-color: rgba(255, 221, 157, 0.54);
  margin-bottom: 20px;
  display: flex;
}

.select_left {
  width: 600px;
  height: 150px;
}

.select_right {
  width: 100px;
  height: 150px;
  display: flex;
}

.list1 {
  width: 600px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>