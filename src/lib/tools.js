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
