<template>
  <section class="app-main" :class="{main2:$route.name != 'home'}">
    <div style="padding: 20px;" v-if="$route.name == 'home'">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </div>
    <transition name="fade-transform" mode="out-in" v-else>
        <router-view :key="key"/>
      </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  created() {
    
    },
}
</script>
<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  height: calc(100vh - 99px);
  position: relative;
  overflow-y: auto;
  /*padding: 20px;*/
  background-color: #f5f7fa;
}
.main2{
  overflow-y: inherit;
  padding: 20px;
}
</style>
