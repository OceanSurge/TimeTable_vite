<template>
  <div class="container">
    <el-upload
        action="http://localhost:8080/addLaboratoryImg"
        list-type="picture-card"
        :auto-upload="true"
        name="img"
        ref="upload"
        :on-success="handleAvatarSuccess">
      <template #default>
        <i class="el-icon-plus"></i>
      </template>
      <template #file="{file}">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""/>
          <span class="el-upload-list__item-actions">
            <span
                class="el-upload-list__item-delete"
                @click="clear">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-form ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm"
             style="width: 500px;"
             :model="laboratory">
      <el-form-item label="实验室名称" prop="laboratoryName">
        <el-input v-model="laboratory.laboratoryName"></el-input>
      </el-form-item>
      <el-form-item label="实验室编码" prop="number">
        <el-input v-model="laboratory.number"></el-input>
      </el-form-item>
      <el-form-item label="人数上限" prop="peopleAmount">
        <el-input v-model="laboratory.peopleAmount"></el-input>
      </el-form-item>
      <el-form-item label="机器数量" prop="machineAmount">
        <el-input v-model="laboratory.machineAmount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="clearAll" type="warning">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, Ref} from 'vue';
import {ElUpload, ElForm, ElInput, ElFormItem, ElMessage} from "element-plus";
import {Laboratory} from "../../datasource";
import axios, {AxiosResponse} from "axios";
import router from "../../router";

export default defineComponent({
  name: "addLaboratory",
  setup() {
    const upload = ref({});
    const ruleForm = ref({})
    const laboratory: Ref<Laboratory> = ref({
      peopleAmount: 30,
      machineAmount: 30
    });
    const openCenter = () => {
      ElMessage({
        message: '居中的文字',
        center: true,
        duration: 0,
        showClose: true
      });
    }
    const submit = () => {
      axios({
        method: "POST",
        url: "addLaboratory",
        data: laboratory.value
      }).then(resp => {

        router.push("/LaboratoryManage")
      });
    }

    const clear = () => {
      (upload.value as typeof ElUpload).clearFiles();
      axios({
        method: "POST",
        url: "delLaboratoryImg",
        params:
            {"url": laboratory.value.img}
      })
    }

    const clearAll = () => {
      (ruleForm.value as typeof ElForm).resetFields();
      clear();
    }

    const handleAvatarSuccess = (response:any) => {
      laboratory.value.img = response.data.url
    }
    const cancel = () => {
      router.push("/LaboratoryManage")
    }

    return {
      upload,
      submit,
      clear,
      laboratory,
      clearAll,
      handleAvatarSuccess,
      ruleForm,
      cancel,
    }
  }
})
</script>

<style scoped>
.container {
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>