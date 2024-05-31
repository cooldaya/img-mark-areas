<template>
  <div>
    <div class="controls">
      <button @click="selectImg">选择图片</button>
      <button @click="uploadMarkAreasJsonFile" v-if="imgUrl">上传文件areas</button>
    </div>
    <div class="img-container">
      <img :src="imgUrl" alt="" ref="imgElRef" @click="imgClick" />
    </div>
    <PageToggle />
  </div>
</template>

<script setup>
import PageToggle from "@/components/PageToggle.vue";
import { getFile, readJsonFile, areasControl } from "@/lib/tools";
import { ref, nextTick } from "vue";

const imgUrl = ref("");
const imgElRef = ref(null);

let isUpLoadAreasJsonFile = false;


const ac = areasControl();

const uploadMarkAreasJsonFile = async () => {
  const res = await getFile({
    accept: ".json",
  });
  const shapes = await readJsonFile(res.file);
  ac.setAreas(shapes);
  isUpLoadAreasJsonFile = true;
};

const selectImg = async () => {
  const res = await getFile({
    accept: "image/*",
  });
  console.log(res.file);
  const fileUrl = URL.createObjectURL(res.file);

  imgElRef.value.onload = () => {
    const { width, height } = imgElRef.value.getBoundingClientRect();
    ac.setSize(width, height);
  };
  imgUrl.value = fileUrl;
};

const imgClick = (e) => {
  if (!isUpLoadAreasJsonFile) {
    alert("请先上传文件areas.json");
  }
  const { offsetX: x, offsetY: y } = e;
  const area = ac.getClickArea(x, y);
  if (area) {
    console.log("点中的区域信息为--->", area);
  } else {
    console.log("未点中任何区域");
  }
};
</script>

<style lang="less" scoped>
.img-container {
  position: relative;
}
</style>
