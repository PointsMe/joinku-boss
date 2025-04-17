<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <!-- <Header></Header> -->
    <!-- <sidebar class="sidebar-container"></sidebar> -->
    <MenuBar></MenuBar>
    <div class="main-container" :class="{tabLeft:$route.name == 'home',tabLeft2:$route.name == 'ProductList'}">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import {
  Navbar,
  Sidebar,
  AppMain,
  // Header,
  MenuBar
} from '../../views/layout/components'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    // Header,
    MenuBar
  },
  mounted() {
    // document.querySelector(".main-container").style.width = window.screen.width - 216 + "px";
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>
