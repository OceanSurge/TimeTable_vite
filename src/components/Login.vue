<template>
  <div class="container">
    <el-form label-width="80px" class="input">
      <el-form-item label="用户名">
        <el-input v-model="user.username" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" prefix-icon="el-icon-unlock" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="commit">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref} from 'vue';
import axios from "axios";
import {User} from ".././datasource"
import router from "../router";

export default defineComponent({
  name: "Login",
  setup() {
    const user: Ref<User> = ref({
      username: "admin",
      password: "000000"
    })
    const commit = () => {
      axios({
        method: "POST",
        url: "login",
        data:user.value
      }).then(resp => {
        console.log(resp.data)
        if (resp.data.code == 200){
          alert("成功")
          router.push("/Main")
          sessionStorage.setItem("loginUser",JSON.stringify(resp.data.data.user))
        }if (resp.data.code == 500){
          alert(resp.data.msg)
        }
      })
    }
    return {
      user,
      commit
    }
  }
})
</script>

<style scoped>

.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input {
  width: 500px;
}

</style>