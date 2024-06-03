import META from "@/META";

const shapeStore = {
  getShapes() {
    const imgShapeMapStr = localStorage.getItem("img-shape-map") || "{}";
    const imgShapeMap = JSON.parse(imgShapeMapStr);
    const imgShapes = imgShapeMap[META.img_md5] || [];
    return imgShapes;
  },
  getLastId() {
    const imgShapeIdsMapStr = localStorage.getItem("img-shape-ids-map") || "{}";
    const imgShapeIdsMap = JSON.parse(imgShapeIdsMapStr);
    const imgShapeIds = imgShapeIdsMap[META.img_md5] || [];

    if (imgShapeIds.length === 0) return 1;
    const lastID = imgShapeIds.sort((a, b) => a - b).at(-1);
    return lastID * 1 + 1;
  },
  initShape() {
    const imgShapeMapStr = localStorage.getItem("img-shape-map");
    if (!imgShapeMapStr) {
      localStorage.setItem("img-shape-map", JSON.stringify({}));
      localStorage.setItem("img-shape-ids-map", JSON.stringify({}));
    }
  },
  saveShape(shape) {
    if (!META.img_md5) alert("请先上传图片");
    const imgShapeMapStr = localStorage.getItem("img-shape-map");
    const imgShapeIdsStr = localStorage.getItem("img-shape-ids-map");

    const imgShapeMap = JSON.parse(imgShapeMapStr) || {};
    const imgShapeIdsMap = JSON.parse(imgShapeIdsStr) || {};

    const imgShapes = imgShapeMap[META.img_md5] || [];
    const imgShapeIds = imgShapeIdsMap[META.img_md5] || [];

    let reWrite = false;
    if (imgShapeIds.includes(shape.id)) {
      if (confirm("该点已存在,确认覆盖？")) {
        reWrite = true;
      } else {
        return;
      }
    }
    if (reWrite) {
      const index = imgShapeIds.indexOf(shape.id + "");
      debugger
      imgShapes[index] = shape;
    } else {
      imgShapes.push(shape);
      imgShapeIds.push(shape.id);
    }

    imgShapeMap[META.img_md5] = imgShapes;
    imgShapeIdsMap[META.img_md5] = imgShapeIds;

    localStorage.setItem("img-shape-map", JSON.stringify(imgShapeMap));
    localStorage.setItem("img-shape-ids-map", JSON.stringify(imgShapeIdsMap));
  },
  saveShapes(shapes) {
    if (!META.img_md5) alert("请先上传图片");
    const imgShapeMapStr = localStorage.getItem("img-shape-map");
    const imgShapeIdsStr = localStorage.getItem("img-shape-ids-map");


    const imgShapeMap = JSON.parse(imgShapeMapStr) || {};
    const imgShapeIdsMap = JSON.parse(imgShapeIdsStr) || {};


    // const imgShapes = imgShapeMap[META.img_md5] || [];
    // const imgShapeIds = imgShapeIdsMap[META.img_md5] || [];

    const imgShapes = shapes;
    const imgShapeIds = shapes.map(item=>item.id);

    imgShapeMap[META.img_md5] = imgShapes;
    imgShapeIdsMap[META.img_md5] = imgShapeIds;

    localStorage.setItem("img-shape-map", JSON.stringify(imgShapeMap));
    localStorage.setItem("img-shape-ids-map", JSON.stringify(imgShapeIdsMap));
    
  }
};
export default shapeStore;
