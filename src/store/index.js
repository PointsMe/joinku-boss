import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import app from "./modules/app";
import permission from "./modules/permission";
import getters from "./getters";
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		user,
		permission,
		app
	},
	getters
});

export default store;