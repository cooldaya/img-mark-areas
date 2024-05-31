import BMF from "browser-md5-file";
import loadingIconImgURL from "@/assets/imgs/loading.svg";

export function getFile(config) {
  return new Promise((res, rej) => {
    var input = document.createElement("input");
    input.type = "file";
    Object.assign(input, config);
    input.onchange = function (event) {
      var selectedFile = event.target.files[0];
      res({
        file: selectedFile,
      });
      // 处理选中的文件
    };
    input.click();
  });
}

export async function downloadJson(json, fileName = "download.json") {
  const isJson =
    json instanceof Object || json instanceof Array || typeof json === "string";
  if (!isJson) {
    return console.error("json参数必须是对象或者数组或者字符串");
  }
  const jsonObj = typeof json === "string" ? JSON.parse(json) : json;
  const jsonStr = JSON.stringify(jsonObj, null, 4);

  const url = window.URL || window.webkitURL || window;
  const blob = new Blob([jsonStr]);
  const saveLink = document.createElementNS(
    "http://www.w3.org/1999/xhtml",
    "a"
  );
  saveLink.href = url.createObjectURL(blob);
  saveLink.download = fileName;
  saveLink.click();
}

const bmf = new BMF();
export function getFileMD5(file) {
  return new Promise((res, rej) => {
    bmf.md5(file, (err, md5) => {
      if (err) return rej(err);
      res({ md5 });
    });
  });
}

export function createLoadingOverlay() {
  // 创建蒙层元素
  var overlay = document.createElement("div");
  overlay.className = "loading-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.3)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";

  // 添加加载动画或文本
  var loadingIcon = document.createElement("div");
  loadingIcon.className = "loading-icon";

  loadingIcon.innerHTML = `<img src="${loadingIconImgURL}" alt="loading">`; // 可以根据需要修改加载文本

  overlay.appendChild(loadingIcon);

  // 将蒙层添加到页面中
  document.body.appendChild(overlay);

  addLoadingStyle();

  function addLoadingStyle() {
    // 创建一个<style>标签
    var style = document.createElement("style");
    // 添加自定义的加载样式
    style.innerHTML = `
      .loading-icon {
        /* 自定义加载样式的样式属性 */
        /* 例如： */
        /* 居中显示 */
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /* 添加动画效果 */
        animation: spin 2s linear infinite;
      }
  
      @keyframes spin {
        0% { transform:translate(-50%, -50%) rotate(0deg); }
        100% { transform:translate(-50%, -50%) rotate(360deg); }
      }
    `;
    // 将<style>标签添加到<head>中
    document.head.appendChild(style);
  }

  // 返回一个取消加载的函数对象
  return {
    cancel: function () {
      // 在需要取消加载时执行的操作
      document.body.removeChild(overlay);
    },
  };
}

export function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      try {
        const jsonStr = reader.result;
        const shapes = JSON.parse(jsonStr);
        resolve(shapes);
      } catch (e) {
        reject(e);
      }
    };
  });
}

export function areasControl() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 0;
  const config = {
    areas: [],
    areaLength: 0,
  };

  const setSize = (width, height) => {
    canvas.width = width;
    canvas.height = height;
  };
  const setAreas = (areas) => {
    if (!areas.length) return;
    const design = areas[0].points[0].design;
    if (design.dw !== canvas.width || design.dh !== canvas.height) {
      return alert("注意，图片尺寸与标注尺寸不匹配，请重新标注");
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const areaLength = areas.length;
    config.areas = areas;
    config.areaLength = areaLength;
    areas.forEach((area, areaIndex) => {
      ctx.beginPath();
      area.points.forEach((point, index) => {
        index === 0
          ? ctx.moveTo(point.x, point.y)
          : ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
      const color = `#${(areaIndex + 1).toString(16).padStart(8, "0")}`; // 从 1 开始，每增加一个区域，颜色递增 避免跟底图黑色冲突
      ctx.fillStyle = color;
      ctx.fill();
    });
  };

  const getClickArea = (x, y) => {
    const pixelBits = ctx.getImageData(x, y, 1, 1).data;
    const areaIndex =
      Array.from(pixelBits).reduce((pre, cur) => pre + cur, 0) - 1; // 最多就可以就会有255 * 4 -1个区域
    if (areaIndex < 0) {
      return null; // 未点中任何区域
    }
    return config.areas[areaIndex];
  };

  return {
    setSize,
    setAreas,
    getClickArea,
  };
}
