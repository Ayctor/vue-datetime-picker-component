import Vue from 'vue';
import Vuex from 'vuex';
import Datepicker from './components/Datepicker';
import moment from 'moment';

Vue.use(Vuex);
Vue.use(Datepicker);
const store = new Vuex.Store({
  state: {
  	valueStart: moment(),
  	valueEnd: moment("2075-12-25")
  },
  mutations: {
  }
})

new Vue({
	el: '#app',
	components: {
		datepicker: Datepicker
	},
	store
})

