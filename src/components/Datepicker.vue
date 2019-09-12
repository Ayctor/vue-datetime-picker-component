<script>
	//Imports
	import moment from 'moment';
	import 'moment/locale/fr'
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
			name: { type: String },
			statut: { type: String },
			genre: { type: String },
			today: { type:Boolean },
		},
		data () 
		{
			return {
				visibleCalendar: false,
				date: moment()
			}
		},
		methods:
		{
			setDate: function (dateProp)
			{
				if(this.genre === 'datetime' && this.statut === 'byHour')
				{
					dateProp.minute(0);
				};

				if(this.name === 'date-start')
				{
					this.$store.state.valueStart= dateProp;
				} else if(this.name === 'date-end')
				{
					this.$store.state.valueEnd= dateProp;
				};
				this.date = dateProp;
				this.hideCalendar();
				var changeEvent = document.createEvent('Event');
				changeEvent.initEvent('input', true, true);
			},
			setTime (timeProp)
			{
				if(this.genre === 'time')
				{
					timeProp.minute(0);
				};
				this.date = timeProp;
				var changeEvent = document.createEvent('Event');
				changeEvent.initEvent('input', true, true);
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
			}
		},
		computed: 
		{
			date_formatted () 
			{
				// if(this.genre === "datetime")
				// {
				// 	return this.date.format('DD/MM/YYYY HH:mm');
				// } else if (this.genre === "date")
				// {	
				// 	return this.date.format('DD/MM/YYYY');
				// } else if (this.genre === "time")
				// {
				// 	return this.date.format('HH:mm');
				// }
				let formattedDate = (this.date)
				return formattedDate
			},
			date_raw () 
			{
				return this.date
			}
		},
		mounted()
		{
		}
	};
</script>

<template>	
	<div class="calendar-wrap">
		<input type="text" class="datepicker_input" v-model="date_formatted.format('LLL')" @click="showCalendar" @focus="" readonly>

		<calendar :statut="statut" v-model="date_raw" :displayedCalendar="visibleCalendar" :date.sync="date" @setDate="setDate" @cancel="hideCalendar" v-if="genre === 'datetime' || genre === 'date'" :genre="genre" :today="today" :name="name"></calendar>
		<timepicker :genre="genre" :statut="statut" format="HH:mm" name="timepicker" :date.sync="date" @setTime="setTime" @cancel="hideCalendar" v-if="genre === 'time'"></timepicker>
	</div>
</template>

<style lang="scss" scoped>
	$header-height: 6rem;
	$header-width: 22rem;
	$weekday-size: 3rem;

	$weight-thin: 200;
	$weight-light: 300;
	$weight-normal: 400;
	$weight-medium: 500;

	$font-sm: 0.86rem;
	$font-base: 1rem;
	$font-2xl: 1.5rem;
	$font-3xl: 1.875rem;
	$color-blue: #0075BF;
	$color-blue-light: #3499D9;
	$color-grey: #F4F4F4;
	$color-grey-dark: #8795a1;
	.calendar-wrap
	{
		position: relative;
		top: 100%;
	}
	input
	{
		cursor: pointer;
		width: 100%;
		background-color: transparent;
	}
</style>