<template>
  <div class="wrapper">
    <el-row style="margin-bottom: 20px;">
      <label for="uploads" class="el-button el-button--primary">{{$t('common.xztp')}}</label>
      <input
        type="file"
        id="uploads"
        style="visibility: hidden;position:absolute; clip:rect(0 0 0 0);"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"
      />
    </el-row>
    <el-row>
      <el-col :span="18">
        <div class="copperWraper">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canScale="option.canScale"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :fixedBox="option.fixedBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :centerBox="option.centerBox"
            :high="option.high"
            :infoTrue="option.infoTrue"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            @realTime="realTime"
            @imgLoad="imgLoad"
            @cropMoving="cropMoving"
            @imgMoving="imgMoving"
            :enlarge="option.enlarge"
            :mode="option.mode"
          ></vueCropper>
        </div>
      </el-col>
      <el-col :span="4" class="rg">
        <div
          class="show-preview"
          :style="{'width':wid + 'px', 'height':hig + 'px',  'overflow': 'hidden','marginLeft': '5px','border':'1px solid #ccc',}"
        >
          <img :src="previews.url" :style="previews.img" />
        </div>

        <div :style="previewStyle1">
          <div :style="previews.div">
            <img :src="previews.url" :style="roundSy.img" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;">
      <el-button type="primary" @click="finish('base64')" class="btn">{{$t('common.yl')}}</el-button>
    </el-row>
    <div class="model" v-show="model">
      <div class="model-show" @click="model = false">
        <img :src="modelSrc" alt @click="model = false" />
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
export default {
  components: {
    VueCropper
  },
  props: {
    uploadData: {
      default: ""
    }
  },
  data() {
    return {
      roundSy: "",
      model: false,
      modelSrc: "",
      crap: false,
      previews: {
        div: "",
        h: "",
        html: "",
        img: {
          height: "",
          transform: "",
          width: ""
        },
        url: "",
        w: ""
      },
      option: {
        img: "",
        size: 1,
        full: false,
        outputType: "png",
        canMove: true,
        fixedBox: false,
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        original: false,
        canScale: true, //图片滚动
        canMoveBox: true,
        autoCrop: true,
        fixed: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300,
        autoCropHeight: 300,
        centerBox: false,
        high: true,
        cropData: {},
        enlarge: 1,
        mode: "contain"
      },
      downImg: "#",
      previewStyle1: {},
      wid: "300",
      hig: "300"
    };
  },
  methods: {
    finish(type) {
      // 输出

      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          var img = window.URL.createObjectURL(data);
          this.model = true;
          this.modelSrc = img;
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true;
          this.modelSrc = data;
        });
      }
    },
    // 实时预览函数
    realTime(data) {
      var previews = data;
      var h = 0.5;
      var w = 0.2;

      this.roundSy = JSON.parse(JSON.stringify(data));
      var dataList = JSON.parse(JSON.stringify(data));

      this.previewStyle1 = {
        width: 300 + "px",
        height: 300 + "px",
        overflow: "hidden",
        margin: "10px",
        zoom: h,
        borderRadius: "50%",
        border: "1px solid #ccc"
      };
      //方形展示区 等比展示

      let index = "";
      if (this.wid / dataList.w > this.hig / dataList.h) {
        index = this.hig / dataList.h;
      } else {
        index = this.wid / dataList.w;
      }
      let imgW = dataList.img.width.slice(0, dataList.img.width.length - 2);
      let imgH = dataList.img.height.slice(0, dataList.img.height.length - 2);
      dataList.img.width = Number(imgW) * index + "px";
      dataList.img.height = Number(imgH) * index + "px";

      var arr = dataList.img.transform.match(
        /(\+\d+|\d+|\-\d+|\d+\.\d+|\+\d+\.\d+|\-\d+\.\d+)+(px)/gi
      );

      var ary = arr.map(str => {
        return parseInt(
          str.match(/(\+\d+|\d+|\-\d+|\d+\.\d+|\+\d+\.\d+|\-\d+\.\d+)/gi)
        );
      });
      var [x, y, z] = ary;
      x = parseInt(x) * index + "px";
      y = parseInt(y) * index + "px";
      z = parseInt(z) * index + "px";
      var sca = dataList.img.transform.match(
        /scale\([0-9]+([.]{1}[0-9]+){0,1}\)/
      )[0];
      var dg = dataList.img.transform.match(
        /rotateZ\([0-9]+([.]{1}[0-9]+){0,1}deg\)/
      );

      dataList.img.transform = `${sca}translate3d(${x}, ${y}, ${z})${dg}`;
      dataList.img.transform =
        dataList.img.transform.substring(dataList.img.transform.length - 1) ==
        ","
          ? dataList.img.transform.substring(
              0,
              dataList.img.transform.length - 1
            )
          : dataList.img.transform;
      this.previews = dataList;
    },
    down(type) {
      if (type === "blob") {
        this.$refs.cropper.getCropBlob(data => {
          this.downImg = window.URL.createObjectURL(data);
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data;
          if (window.navigator.msSaveBlob) {
            var blobObject = new Blob([data]);
            window.navigator.msSaveBlob(blobObject, "demo.png");
          } else {
            this.$nextTick(() => {
              this.$refs.downloadDom.click();
            });
          }
        });
      }
    },
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      var reader = new FileReader();

      reader.onload = e => {
        let data;
        if (typeof e.target.result === "object") {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        if (num === 1) {
          this.option.img = data;
        }
      };
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file);
    },
    imgLoad(msg) {
      this.$refs.cropper.getCropData(data => {
        //获取base64数据
        this.$emit("getImgBase64", data);
      });
    },
    imgMoving(data) {
      this.$refs.cropper.getCropData(data => {
        //获取base64数据
        this.$emit("getImgBase64", data);
      });
    },
    cropMoving(data) {
      this.option.cropData = data;
      this.$refs.cropper.getCropData(data => {
        //获取base64数据
        this.$emit("getImgBase64", data);
      });
    }
  },
  mounted() {
    this.wid = this.hig = 200
    if(this.uploadData){
      this.option.img= this.uploadData
    }
    // this.wid = this.hig = document.querySelector(".rg").offsetWidth;
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
/*.content {
  margin: auto;
  max-width: 1200px;
  margin-bottom: 100px;
}*/
.des {
  line-height: 30px;
}

.copperWraper {
  height: 400px;
}
.model {
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}
.model-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  text-align: center;
}
.model img {
  display: block;
  margin: auto;
  max-width: 80%;
  width: auto;
  user-select: none;
  background-position: 0px 0px, 10px 10px;
  background-size: 20px 20px;
  background-image: linear-gradient(
      45deg,
      #eee 25%,
      transparent 25%,
      transparent 75%,
      #eee 75%,
      #eee 100%
    ),
    linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
}
.c-item {
  display: block;
  padding: 10px 0;
  user-select: none;
}
.pre {
  display: flex;
}
.pre-item {
  padding-right: 20px;
}
@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
@media screen and (max-width: 1000px) {
  /*.content {
    max-width: 90%;
    margin: auto;
  }*/
  .copperWraper {
    height: 400px;
  }
}
.el-dialog {
  margin-top: 50px !important;
}
</style>