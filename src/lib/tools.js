import BMF from "browser-md5-file";
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

export function downloadJson(json, fileName = "download.json") {
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
