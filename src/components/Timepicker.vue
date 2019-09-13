<script>
	import TimepickerByHalfDay from './TimepickerByHalfDay.vue';
	import TimepickerByHour from './TimepickerByHour.vue';
	import TimepickerByMinute from './TimepickerByMinute.vue';
	import moment from 'moment';
	moment.locale('fr');

	export default
	{
		name: 'Timepicker',
		components:
		{
			TimepickerByHalfDay,
			TimepickerByHour,
			TimepickerByMinute
		},
		props:
		{
			date: {},
			statut: { type: String },
			genre: { type: String }
		},
		data ()
		{
			return {
				timeProp: moment(),
				hourProp: '',
				minuteProp:''
			}
		},
		methods:
		{
			changeHour (timeObj)
			{
				this.hourProp = timeObj.hourProp;
				this.minuteProp = timeObj.minuteProp;
				this.timeProp.hour(this.hourProp);
				this.timeProp.minute(this.minuteProp);
			},
			submitTime ()
			{
				// if(this.statut === 'byHour')
				// {
				// 	let hourInputValue = document.querySelector('.hour-input').value;
				// 	console.log(hourInputValue)
				// 	this.hourProp = hourInputValue;
				// 	this.minuteProp = this.timeProp.minute(0);
				// } else if ( this.statut === 'byMinute')
				// {
				// 	let hourInputValue = document.querySelector('.hour-input').value;
				// 	this.hourProp = hourInputValue;
				// 	console.log(hourInputValue)
				// 	let minuteInputValue = document.querySelector('.minute-input').value;
				// 	this.minuteProp = minuteInputValue;
				// }

				if(this.statut !== 'byHalfDay')
				{
	                if (isNaN(parseInt(this.hourProp)) || parseInt(this.hourProp) >= 24 || parseInt(this.hourProp) < 0) 
	                {
		                // check hours
	                    alert('Format d\'heure invalide');
	                    return false;
	                }
					if(this.statut !== 'byHour')
					{
		                // check minutes
		                if (isNaN(parseInt(this.minuteProp)) || parseInt(this.minuteProp) >= 60 || parseInt(this.minuteProp) < 0) 
		                {
		                    alert('Format de minute invalide');
		                    return false;
		                }
					}
				}
				this.$emit('setTime', this.timeProp);
			},
			cancel ()
			{
				this.$emit('cancel');
			},
		},
		computed:
		{
			hour_formatted ()
			{
				return this.timeProp.hour()
			},
			minute_formatted ()
			{
				return this.timeProp.minute()
			},
		},
		mounted()
		{
		}
	};
</script>

<template>
	<div class="timepicker-wrap">
		<timepicker-by-half-day :statut="statut" :timeProp.sync="timeProp" name="hour-start" @change="changeHour" v-if="statut === 'byHalfDay'"></timepicker-by-half-day>
		<timepicker-by-hour  :hour="hour_formatted" :statut="statut" :timeProp.sync="timeProp" name="hour-start" @change="changeHour" v-if="statut === 'byHour'"></timepicker-by-hour>
		<timepicker-by-minute :hour="hour_formatted" :minute="minute_formatted" :statut="statut" :timeProp.sync="timeProp" name="hour-start" @change="changeHour" v-if="statut === 'byMinute'"></timepicker-by-minute>
		<div class="actions" v-if="genre === 'time' || genre === 'datetime'">
			<button @click="cancel" class="cancel">Annuler</button>
			<button class="sub" @click="submitTime">Choisir</button>
		</div>
	</div>
</template>

<style lang="scss" scoped>

	$header-width: 20rem;
	$color-blue: #0075BF;
	$color-grey: #F4F4F4;
	$color-grey-dark: #8795a1;

	.timepicker-wrap
	{
    	width: 100%;
	}
	.actions
	{
		padding: 0 1rem;
		display: flex;
		justify-content: flex-end;
	}

		button
		{
			border: none;
			cursor: pointer;
			background-color: transparent;
			outline: none;	
			font-size: 0.86rem;
			font-weight: 500;
			text-transform: uppercase;
			min-width: 6rem;
			padding: 1rem;
			transition: all 0.3s;

			&:hover
			{
				background-color: $color-grey
			}
		}
		
		.cancel
		{
			color: $color-grey-dark;
		}
		
		.sub
		{
			color: $color-blue;
		}
		.slide-enter-active, .slide-leave-active 
		{
			transition: opacity .5s;
		}
		.slide-enter, .slide-leave-to 
		{
			opacity: 0;
		}
</style>