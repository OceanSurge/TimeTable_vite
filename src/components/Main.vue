<template>
  <div>
    <el-drawer
        title="我是标题"
        v-model="drawer"
        :with-header="false"
        size="300px">
      <el-card class="box-card">
        <div class="text item">
          用户名：{{ loginUser.username }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          密码：{{ loginUser.password }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          角色：{{ loginUser.role }}
        </div>
      </el-card>
    </el-drawer>
    <el-container>

      <el-header>
        <el-button @click="drawer = true" type="info" style="margin-left: 16px;" class="login">
          {{ loginUser.role }}:{{ loginUser.username }}
        </el-button>
        <el-button type="primary" @click="exit">退出登录</el-button>
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
            <el-menu-item :index="menu.path"
                          v-for="menu of menus"
                          class="sideBar"
                          @click="changePath(menu.path)"
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
import {computed, defineComponent, Ref, ref, onMounted} from 'vue';
import axios from "axios";
import {User, Menu} from "../datasource";
import router from "../router";
import {Store, useStore} from "vuex";
import {State} from "../store";
import {RESET_LoginUser} from "../store/VuexTypes";

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
    const store: Store<State> = useStore();

    const isCollapse = ref(false);
    const menus: Ref<Menu[]> = ref([]);
    const currentPath = sessionStorage.getItem("currentPath");

    const loginUser = computed(() => {
      if (store.state.LoginUser) {
        return store.state.LoginUser
      } else {
        return {
          username: null,
          role: null
        } as User
      }
    });

    const changePath = (path: string) => {
      sessionStorage.setItem("currentPath", path)
    };

    const exit = () => {
      store.commit(RESET_LoginUser);
      router.push("/Login")
    };

    const main = () => {
      axios({
        method: "POST",
        url: "main",
        params: {
          role: (loginUser.value as User).role
        }
      }).then(resp => {
        menus.value = resp.data.data.menus
      })
    };

    onMounted(() => {
      main();
    });

    const drawer: Ref<boolean> = ref(false);

    return {
      isCollapse,
      menus,
      currentPath,
      changePath,
      exit,
      drawer,
      loginUser,
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

.el-main {
  width: 100%;
  height: 700px;
}

.login {
  height: 50px;
  width: 150px;
}

.el-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer {
  width: 100px;
}

</style>