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
				if(this.genre === "datetime")
				{
					this.date = dateProp.format('LLL');
				} else if (this.genre === "date")
				{	
					this.date = dateProp.format('LL');
				} else if (this.genre === "time")
				{
					this.date = dateProp.format('HH:mm');
				}
				if(this.name === 'date-start')
				{
					this.$store.state.valueStart = dateProp;
				} else if(this.name === 'date-end')
				{
					this.$store.state.valueEnd = dateProp;
				};
				this.hideCalendar();

				let event = document.createEvent('Event'); 
				let input = document.querySelector('.datepicker_input');
				event.initEvent('input', true, true);
				input.dispatchEvent(event)
			},
			setTime (timeProp)
			{
				if(this.genre === 'time' && this.statut === 'byHour')
				{
					timeProp.minute(0);
				};
				if(this.name === 'date-start')
				{
					this.$store.state.valueStart= timeProp;
				} else if(this.name === 'date-end')
				{
					this.$store.state.valueEnd= timeProp;
				};
				if(this.genre === "datetime")
				{
					this.date = timeProp.format('LLL');
				} else if (this.genre === "date")
				{	
					this.date = timeProp.format('LL');
				} else if (this.genre === "time")
				{
					this.date = timeProp.format('HH:mm');
				}
				let event = document.createEvent('Event'); 
				let input = document.querySelector('.datepicker_input');
				event.initEvent('input', true, true);
				input.dispatchEvent(event)
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
			date_raw () 
			{
				return this.date;
			}
		},
		mounted()
		{
			if(this.genre === "datetime")
			{
				this.date = this.date.format('LLL');
			} else if (this.genre === "date")
			{	
				this.date = this.date.format('LL');
			} else if (this.genre === "time")
			{
				this.date = this.date.format('HH:mm');
			}
		}
	};
</script>

<template>	
	<div class="calendar-wrap">
		<input type="text" class="datepicker_input" @click="showCalendar" @focus="" :value="date" readonly :genre="genre">

		<calendar :statut="statut" v-model="date_raw" :displayedCalendar="visibleCalendar" :date.sync="date" @setDate="setDate" @cancel="hideCalendar" v-if="genre === 'datetime' || genre === 'date'" :genre="genre" :today="today" :name="name"></calendar>
		<timepicker :genre="genre" :statut="statut" format="HH:mm" name="timepicker" :date.sync="date" @setTime="setTime" @cancel="hideCalendar" v-if="genre === 'time'"></timepicker>
	</div>
</template>

<style lang="scss" scoped>
	$header-height: 6rem;
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