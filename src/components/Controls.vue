<template>
  <div class="controls" ref="controlsElRef">
    <div class="actions">
      <button @click.stop="uploadImage">上传图片</button>
      <button @click.stop="startMarkPoint" ref="startElRef">开始</button>
      <button @click.stop="stopMarkPoint" ref="stopElRef" disabled>完毕</button>
      <button type="number" @click.stop="drawAllShapes">画出全部图形</button>
      <button @click.stop="exportData">导出数据</button>
      <button @click="resetControl">清空画板</button>
      <input type="number" ref="inputElRef" />
    </div>
    <div class="settings">
      <div>
        标记点的颜色 <input type="color" @change="updateMarkPointColor" />
      </div>
      <div class="user-data">
        
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import META from "@/META";
import {
  getFile,
  downloadJson,
  getFileMD5,
  createLoadingOverlay,
} from "@/lib/tools";
import eventBus from "@/eventBus";
import shapeStore from "@/lib/shapeStore";

const controlsElRef = ref(null);
const startElRef = ref(null);
const stopElRef = ref(null);
const inputElRef = ref(null);
const uploadImage = async () => {
  const res = await getFile({
    accept: "image/*",
    multiple: false,
  });
  const file = res.file;
  META.img_name = file.name;
  const { md5 } = await getFileMD5(file);
  META.img_md5 = md5;
  const url = URL.createObjectURL(file);
  META.img_url = url;
  eventBus.emit("update-img-url", { img_url: url });
  console.log(META);

  // 重置control状态
  resetControl();
};

// 重置control状态
const resetControl = () => {
  const startEl = startElRef.value;
  const stopEl = stopElRef.value;
  startEl.removeAttribute("disabled");
  stopEl.setAttribute("disabled", true);
  META.writing = false;
  META.currentPoints.length = 0;
  clearCanvas();
  eventBus.emit("reset-control");
};

function clearCanvas() {
  META.ctx.clearRect(0, 0, META.canvas_el.width, META.canvas_el.height);
}

// 开始标记点
const startMarkPoint = (event) => {
  if (!META.img_url) return alert("请先上传图片");
  const startEl = startElRef.value;
  const stopEl = stopElRef.value;
  const inputEl = inputElRef.value;
  inputEl.value = shapeStore.getLastId();
  META.writing = true;
  startEl.setAttribute("disabled", true);
  stopEl.removeAttribute("disabled");
  alert("开始标记点");
  META.currentPoints.length = 0;
  eventBus.emit("start-mark-point");
};

// 结束标记点
const stopMarkPoint = (event) => {
  if (META.currentPoints.length < 3) return alert("至少需要三个点才能画图");
  const startEl = startElRef.value;
  const stopEl = stopElRef.value;
  const inputEl = inputElRef.value;

  META.writing = false;
  startEl.removeAttribute("disabled");
  stopEl.setAttribute("disabled", true);
  alert("结束标记点");
  const shape = {
    id: inputEl.value,
    points: [...META.currentPoints],
  };
  META.shapes.push(shape);
  shapeStore.saveShape(shape);
  drawAllShapes(META.shapes);
  // eventBus.emit("stop-mark-point", { shape });
};

// 画出全部图形
const drawAllShapes = () => {
  if (!META.img_url) return alert("请先上传图片");
  clearCanvas();
  const shapes = (META.shapes = shapeStore.getShapes());
  eventBus.emit("draw-all-shapes", { shapes });
};

// 更新标记点颜色
const updateMarkPointColor = (event) => {
  META.markPinterColor = event.target.value;
};

// 导出数据
const exportData = async () => {
  const { cancel } = createLoadingOverlay();
  const shapes = shapeStore.getShapes();
  const jsonFileName =
    META.img_name.replace(/\.[^/.]+$/, "") + "(区域标记).json";
  await downloadJson(shapes, jsonFileName);
  cancel();
};

// 监听用户页面缩放，同步control的缩放,使其大小不变
window.onresize = function (event) {
  const scale = window.devicePixelRatio;
  const controlsEl = controlsElRef.value;
  controlsEl.style.transform = `scale(${1 / scale})`;
};
</script>

<style lang="less" scoped>
.controls {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10;
  transform-origin: top right;

  .actions {
    display: flex;
    column-gap: 10px;
  }
  .settings {
    margin-top: 20px;
    display: flex;
  }
}
</style>
