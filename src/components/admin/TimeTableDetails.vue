<template>
  <div>
    <el-container>
      <el-aside width="150px"
                style="max-height:650px;
                background-color: red">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @select="select">
          <el-menu-item :index="week"
                        v-for="week in weekList"
                        :key="week"
                        @click="allCourseByWeekAndLaboratory">
            <i class="el-icon-menu"></i>
            <template #title>第{{ week }}周</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-menu class="el-menu-demo"
                   mode="horizontal"
                   @select="change"
                   default-active="实验室1">
            <el-menu-item v-for="laboratory in laboratories"
                          :index="laboratory.laboratoryName"
                          :key="laboratory.laboratoryName"
                          @click="allCourseByWeekAndLaboratory">
              {{ laboratory.laboratoryName }}
            </el-menu-item>
          </el-menu>
        </el-header>
        <el-main>
          <div class="box">
            <div class="row" v-for="TimeTableList in TimeTableContainer">
              <div class="inner" v-for="TimeTable in TimeTableList">
                <el-card shadow="hover"
                         :class=" TimeTable.state==0?'state0':TimeTable.state==1?'state1':'state2'"
                         @click="changeState(TimeTable)">
                  <p :class="TimeTable.state==2?'b':'a'">课程名称:</p>
                  <p :class="TimeTable.state==1?'b':'a'">未被选中</p>
                  <p :class="TimeTable.state==0?'b':'a'">不可用</p>
                  {{ (TimeTable).courseName }}
                </el-card>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue';
import axios from "axios";
import {Laboratory, TimeTable, TimeTableQuery} from "../../datasource";

export default defineComponent({
  name: "LessonDetails",
  setup() {
    const weekList: Ref<string[]> = ref([
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", '18'
    ])
    const numbers: Ref<number[]> = ref([1, 2, 3, 4, 5])
    const laboratories: Ref<Laboratory[]> = ref([])
    const TimeTableQuery: Ref<TimeTableQuery> = ref({
      laboratory: "实验室1",
      week: "1",
    })
    const TimeTableContainer: Ref<Map<string, TimeTable[]> | any> = ref();
    const change = (news: string) => {
      TimeTableQuery.value.laboratory = news
    }
    axios({
      method: "POST",
      url: "allLaboratory",
    }).then(resp => {
      laboratories.value = resp.data.data.allLaboratory
    })
    const select = (news: string) => {
      TimeTableQuery.value.week = news
    }
    const allCourseByWeekAndLaboratory = () => {
      axios({
        method: "POST",
        url: "allCourseByWeekAndLaboratory",
        data: TimeTableQuery.value
      }).then(resp => {
        TimeTableContainer.value = resp.data.data
        // console.log(resp.data.data)
      })
    }
    allCourseByWeekAndLaboratory()
    const changeState = (TimeTable: TimeTable) => {
      axios({
        method: "POST",
        url: "changeState",
        data: TimeTable
      }).then(resp => {
        // console.log(resp.data)
        allCourseByWeekAndLaboratory()
      });

    }
    return {
      laboratories,
      TimeTableQuery,
      change,
      weekList,
      select,
      numbers,
      TimeTableContainer,
      changeState,
      allCourseByWeekAndLaboratory,
    }
  }
})
</script>

<style scoped>
.box {
  width: 800px;
  height: 550px;
  /*background-color: blue;*/
  display: flex;
  justify-content: space-around;
  border-radius: 5px;
}

.row {
  width: 100px;
  height: 550px;
  /*background-color: red;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;

}

.inner {
  width: 100px;
  height: 100px;
  background-color: black;
}

.text {
  font-size: 14px;
}

.item {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

}

.box-card {
  width: 100px;
  height: 100px;

}


.state0 {
  width: 100px;
  height: 100px;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.state1 {
  width: 100px;
  height: 100px;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.state2 {
  width: 100px;
  height: 100px;
  background-color: rgba(251, 255, 251, 0.54);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.a {
  display: none;
  width: 100px;
}

.b {
  width: 100px;
}
</style>