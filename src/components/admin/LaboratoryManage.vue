<template>
  <div>
    <el-container>
      <el-header>
        <el-button type="primary" plain style="width: 100%" @click="addLaboratory">添加实验室</el-button>
      </el-header>
      <el-main>
        <el-carousel :interval="4000"
                     type="card"
                     :loop="true"
                     ref="elCarousel"
                     height="500px"
                     @change="((pre, next) => {onChange(pre, next)})">
          <el-carousel-item v-for="(laboratory,index) in laboratories"
                            :key="laboratory.id" class="carousel">
            <div class="container">
              <div class="img_container">
                <img :src="laboratory.img" style="width: 400px;height: 250px">
                <el-button type="danger" icon="el-icon-delete" circle
                           @click="removeLaboratory(laboratory.id)"></el-button>
              </div>

              <div>
                <el-form label-width="100px" :model="laboratoryItem"
                         style="width: 400px"
                         size="mini"
                         class="input">
                  <el-form-item label="实验室名称">
                    <el-input v-model="laboratoryItem.laboratoryName"></el-input>
                  </el-form-item>
                  <el-form-item label="实验室编号">
                    <el-input v-model="laboratoryItem.number"></el-input>
                  </el-form-item>
                  <el-form-item label="机器数量">
                    <el-input v-model="laboratoryItem.machineAmount"></el-input>
                  </el-form-item>
                  <el-form-item label="人数">
                    <el-input v-model="laboratoryItem.peopleAmount"></el-input>
                  </el-form-item>
                </el-form>
                <el-button type="primary" @click="commit">保存修改</el-button>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>

  </div>
</template>

<script lang="ts">
import {defineComponent, ref, Ref, onMounted} from 'vue';
import axios from "axios";
import {Laboratory} from "../../datasource";
import {ElCarousel, ElUpload} from "element-plus"
import router from "../../router";

export default defineComponent({
  name: "LaboratoryManage",
  methods: {
    init() {
      console.log(this.$refs.ea)
    }
  },
  setup() {
    // onMounted(()=>(this.$refs.ea as typeof ElCarousel).next)
    const laboratories: Ref<Laboratory[]> = ref([]);
    const size: Ref<number> = ref(0);
    const elCarousel = ref({});
    const laboratoryItem: Ref<Laboratory> = ref({});

    onMounted(() => {
      (elCarousel.value as typeof ElCarousel).next();
    });

    const LaboratoryManage = () => {
      axios({
        method: "POST",
        url: "LaboratoryManage"
      }).then(resp => {
        laboratories.value = resp.data.data.allLaboratory
        size.value = resp.data.data.size
        laboratoryItem.value = laboratories.value[0]
      })
    };

    onMounted(() => {
      LaboratoryManage();
    });

    const onChange = (pre: number, next: number) => {
      laboratoryItem.value = laboratories.value[pre]
    };

    const commit = () => {
      axios({
        method: "POST",
        url: "updateLaboratory",
        data: laboratoryItem.value
      }).then(resp => {
        alert(resp.data.message)
      })
    };

    const addLaboratory = () => {
      router.push("/addLaboratory")
    };

    const removeLaboratory = (id: number) => {
      axios({
        method: "POST",
        url: "/removeLaboratory",
        params: {
          id: id
        }
      }).then(resp => {

      })
    }

    return {
      laboratories,
      size,
      elCarousel,
      laboratoryItem,
      onChange,
      commit,
      addLaboratory,
      removeLaboratory,
    }
  }
})
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.carousel {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

/*.container{*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: space-between;*/
/*  align-items: center;*/
/*}*/

.img_container {
  width: 600px;
  height: 260px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}


</style>