<script>
	import TimepickerByHalfDay from './TimepickerByHalfDay.vue';
	import TimepickerByHour from './TimepickerByHour.vue';
	import TimepickerByMinute from './TimepickerByMinute.vue';
	import moment from 'moment';

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
			value: { type: String, required: true },
			statut: { type: String }
		},
		data ()
		{
			return {
				timeProp: moment(),
	    		hourProp: '',
	    		minuteProp: ''
			}
		},
		methods:
		{
			submit ()
			{
				// check hours
				if(!(this.statut === 'byDay')&&!(this.statut === 'byHalfDay'))
				{
	                if (isNaN(parseInt(this.hourProp)) || parseInt(this.hourProp) >= 24 || parseInt(this.hourProp) < 0) 
	                {
	                    alert('Format d\'heure invalide');
	                    return false;
	                }

					if(!(this.statut === 'byHour'))
					{
		                // check minutes
		                if (isNaN(parseInt(this.minuteProp)) || parseInt(this.minuteProp) >= 60 || parseInt(this.minuteProp) < 0) 
		                {
		                    alert('Format de minute invalide');
		                    return false;
		                }
					}
				}
				this.timeProp = this.timeProp.clone();
				this.$emit('change', this.timeProp);
			},
			cancel ()
			{
				this.$emit('cancel');
			},
			changeHour: function (timeObj)
			{
				this.hourProp = timeObj.hourProp;
				this.minuteProp = timeObj.minuteProp;

				this.timeProp.minute(this.minuteProp);
				this.timeProp.hour(this.hourProp);
			},
		},
		computed:
		{
			hour_formatted ()
			{
				return this.timeProp.format('HH')
			},
			minute_formatted ()
			{
				return this.timeProp.format('mm')
			},
		},
		mounted()
		{
			console.log(this.statut)
		}
	};
</script>

<template>
	<div class="timepicker-wrap">
		<timepicker-by-half-day :statut="statut" :value="value" :date.sync="date" name="hour-start" @change="changeHour"></timepicker-by-half-day>
		<timepicker-by-hour  :hour="hour_formatted" :statut="statut" :value="value" :date.sync="date" name="hour-start" @change="changeHour"></timepicker-by-hour>
		<timepicker-by-minute :hour="hour_formatted" :minute="minute_formatted" :statut="statut" :value="value" :date.sync="date" name="hour-start" @change="changeHour"></timepicker-by-minute>
	</div>
</template>