<script>
	//Imports
	import moment from 'moment';
	moment.locale('fr');
	import Calendar from './Calendar.vue';
	import Timepicker from './Timepicker.vue';

	//Variables
	const defaultFormat = 'YYYY-MM-DDTHH:mm';

	//Component
	export default
	{
		name: 'Datepicker',
		components: 
		{
			Calendar,
			Timepicker,
		},
		props: 
		{
			value: { type: String, required: true },
			name: { type: String },
			statut: { type: String },
			genre: { type: String }
		},
		data () 
		{
			return {
				visibleCalendar: false,
				date: moment(),
			}
		},
		methods:
		{
			setDate: function (selectedDate)
			{
				this.date = selectedDate;
				this.hideCalendar();
			},
			showCalendar ()
			{
				this.visibleCalendar = true;
				setTimeout(() => document.addEventListener('click', this.hideCalendar), 0)
			},
			hideCalendar ()
			{
				this.visibleCalendar = false;
				document.removeEventListener('click', this.hideCalendar)
			},
		},
		computed: 
		{
			date_formatted () 
			{
				if(this.statut==='byDay')
				{
					return this.date.format('DD/MM/YYYY');
				} else
				{
					return this.date.format('DD/MM/YYYY HH:mm');
				}
			},
			date_raw () 
			{
				return this.date.format(defaultFormat)
			},
		},
	};
</script>

<template>	
	<div class="calendar-wrap">
		<input type="text" v-model="date_formatted" @click="showCalendar" @focus="" readonly>
		<input type="hidden" :name="name"v-model="date_formatted" readonly>
		<calendar :statut="statut" v-model="date_raw" :dateProp="this.date" :displayedCalendar="visibleCalendar" :date.sync="date" @change="setDate" @cancel="hideCalendar" ></calendar>
		<timepicker statut="byMinute" value="2000-01-01T00:00" format="HH:mm" name="timepicker"></timepicker>
	</div>
</template>

<style>
	.calendar-wrap
	{
		position: relative;
		top: 100%;
	}
</style>