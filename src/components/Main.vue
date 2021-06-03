<template>
  <div>
    <el-container>
      <el-header>
        <el-button type="primary" @click="exit">主要按钮</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu :default-active="currentPath?currentPath:'/welcome'"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   :collapse="isCollapse"
                   :router="true">
            <el-menu-item :index="menu.path" v-for="menu of menus" class="sideBar" @click="changePath(menu.path)"
                          :key="menu.id">
              <i class="el-icon-menu"></i>
              <template #title>{{ menu.menuName }}</template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import {defineComponent, Ref, ref} from 'vue';
import axios from "axios";
import {User, Menu} from "../datasource";
import router from "../router";

export default defineComponent({
  name: "Main",
  methods: {
    handleOpen(key: string, keyPath: string) {
      console.log(key, keyPath);
    },
    handleClose(key: string, keyPath: string) {
      console.log(key, keyPath);
    }
  },
  setup() {
    const isCollapse = ref(false);
    const menus: Ref<Menu[]> = ref([]);
    const currentPath = sessionStorage.getItem("currentPath");
    const changePath = (path: string) => {
      sessionStorage.setItem("currentPath", path)
    };
    const exit = ()=>{
      sessionStorage.removeItem("loginUser");
      router.push("/")
    }
    axios({
      method: "POST",
      url: "main",
      params: {
        role: (JSON.parse(sessionStorage.getItem("loginUser") as string) as User).role
      }
    }).then(resp => {
      menus.value = resp.data.data.menus
    })
    return {
      isCollapse,
      menus,
      currentPath,
      changePath,
      exit
    }
  }
})
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.sideBar {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-main{
  width: 100%;
  height: 700px;
}

</style>