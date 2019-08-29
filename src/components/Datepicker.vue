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
				timeProp: ''
			}
		},
		methods:
		{
			setDate: function (dateProp)
			{
				this.date = dateProp;
				this.hideCalendar();
			},
			setTime: function (timeProp)
			{	
				if(this.genre === 'time')
				{
					timeProp.minute(0)
				}
				this.date=timeProp;
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
				if(this.genre === "datetime")
				{
				return this.date.format('DD/MM/YYYY HH:mm');
				} else
				{	
					return this.date.format('DD/MM/YYYY');
				}
			},	
			hour_formatted () 
			{
				return this.date.format('HH:mm')
			},
			date_raw () 
			{
				return this.date.format(defaultFormat)
			},
		},
		mounted()
		{
		}
	};
</script>

<template>	
	<div class="calendar-wrap">
		<input type="text" v-model="hour_formatted" @focus="" v-if="genre === 'time'" readonly>
		<input type="hidden" :name="name" v-model="date_formatted" readonly>

		<input type="text" v-model="date_formatted" @click="showCalendar" @focus="" v-if="genre === 'datetime' || genre === 'date'" readonly>
		<input type="hidden" :name="name" v-model="date_formatted" readonly>

		<calendar :statut="statut" v-model="date_raw" :displayedCalendar="visibleCalendar" :date.sync="date" @setDate="setDate" @cancel="hideCalendar" v-if="genre === 'datetime' || genre === 'date'" :genre="genre" ></calendar>
		<timepicker :genre="genre" :statut="statut" value="2000-01-01T00:00" format="HH:mm" name="timepicker" :date.sync="date" @setTime="setTime" v-if="genre === 'time'"></timepicker>
	</div>
</template>

<style>
	.calendar-wrap
	{
		position: relative;
		top: 100%;
	}
</style>