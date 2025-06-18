<template>
  <transition name="rotate-fall">
    <div id="app">
        <keep-alive :include="keepIncludes">
            <router-view  class="app-router-view" />
        </keep-alive>
    </div>
  </transition>
</template>

<script>
// import 'vue-transition.css'
export default {
  name: 'App',
    data() {
        return {
            keepIncludes: ['PlatformProduct']
        };
    },
}
</script>
<style lang='scss'>
body,
html {
  font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei",
    "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  font-size: 14px;
}

#app .app-router-view {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  .el-submenu__title {
    font-size: 14px;
  }
}
</style>
