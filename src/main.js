import Vue from 'vue'
import Datepicker from './components/Datepicker'

Vue.use(Datepicker);

new Vue({
	el: '#app',
	components: {
		datepicker: Datepicker
	}
})