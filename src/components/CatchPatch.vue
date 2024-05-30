<template>
  <div class="catch-patch">
    <Controls />
    <canvas ref="canvasElRef" @click.stop="markPoint"></canvas>
    <div class="img-wrap">
      <img :src="pageRefData.img_url" alt="" ref="imgElRef" />
    </div>
  </div>
</template>

<script setup>
import Controls from "./Controls.vue";
import eventBus, { onEvents, offEvents } from "@/eventBus";
import { ref, onBeforeUnmount, onMounted, nextTick } from "vue";
import META from "@/META";
import shapeStore from "@/lib/shapeStore";

const props = defineProps({});
const canvasElRef = ref(null);
const imgElRef = ref(null);
const pageRefData = ref({
  img_url: "",
});

const events = {
  "update-img-url": (payload) => {
    const img_el = META.img_el;
    img_el.onload = (e) => {
      const { width, height } = img_el.getBoundingClientRect();
      resetCanvasSize(width, height);
    };
    pageRefData.value.img_url = payload.img_url;
  },
  "stop-mark-point": (payload) => {
    const shape = payload.shape;
    drawShape(shape);
  },
  "draw-all-shapes": (payload) => {
    const shapes = payload.shapes;
    shapes.forEach((shape) => {
      drawShape(shape);
    });
  },
};
onEvents(events);

const initCanvas = () => {
  const canvasEl = canvasElRef.value;
  const ctx = canvasEl.getContext("2d");
  ctx.font = `${META.fontSize}px Arial`;
  META.canvas_el = canvasEl;
  META.ctx = ctx;
  canvasEl.width = canvasEl.height = 0;
};
const initImg = () => {
  const imgEl = imgElRef.value;
  META.img_el = imgEl;
};

function resetCanvasSize(width, height) {
  META.design.dw = width;
  META.design.dh = height;
  META.canvas_el.width = width;
  META.canvas_el.height = height;
  META.ctx.clearRect(0, 0, width, height);
}

const init = () => {
  shapeStore.initShape();
  initCanvas();
  initImg();
};

const markPoint = (event) => {
  if (META.writing) {
    const point = {
      x: event.offsetX,
      y: event.offsetY,
      design: {
        ...META.design,
      },
      px: ((event.offsetX * 100) / META.design.dw).toFixed(2) + "%",
      py: ((event.offsetY * 100) / META.design.dh).toFixed(2) + "%",
    };
    console.log(point, window.devicePixelRatio);
    META.currentPoints.push(point);
    drawPoint(point);
  } else {
    alert("Please start writing first");
  }
  // const { x, y } = eventBus.emit("get-mouse-position");
};

function drawPoint(point) {
  const ctx = META.ctx;
  ctx.beginPath();
  ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = META.markPinterColor;
  ctx.fill();
}

function drawShape(shape) {
  const ctx = META.ctx;
  const { id = 99, points } = shape;
  const len = points.length;
  let x_total = 0;
  let y_total = 0;

  ctx.beginPath();
  for (let i = 0; i < len; i++) {
    const point = points[i];
    x_total += point.x;
    y_total += point.y;
    if (!i) {
      ctx.moveTo(point.x, point.y);
      continue;
    }
    ctx.lineTo(point.x, point.y);
  }
  // 画出形状
  ctx.closePath(); // 将最后一个点与起点连接
  ctx.fillStyle = "red"; // 边框颜色
  ctx.fill(); // 绘制边框

  // 画出ID
  const x_center = x_total / len;
  const y_center = y_total / len;
  ctx.fillStyle = "white"; // 填充颜色
  ctx.fillText(id, x_center, y_center);
}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  offEvents(events);
});
</script>

<style lang="less" scoped>
.catch-patch {
  position: relative;
  & > canvas {
    position: absolute;
    z-index: 2;
  }
  .img-wrap {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
}
</style>
