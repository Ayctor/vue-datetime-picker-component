<template>
	<div class="timepicker-wrap">
		<timepicker-by-halfday :statut="statut" :value="value" :date.sync="date" name="hour-start" @change="changeHour" v-if="byHalfDay"></timepicker-by-halfday>
		<timepicker-by-hour  :hour="hour_formatted" :statut="statut" :value="value" :date.sync="date" name="hour-start" @change="changeHour" v-if="byHour"></timepicker-by-hour>
		<timepicker-by-minute :hour="hour_formatted" :minute="minute_formatted" :statut="statut" :value="value" :date.sync="date" name="hour-start" @change="changeHour" v-if="byMinute"></timepicker-by-minute>
		<div class="timepicker-actions">
			<button @click="cancel" class="cancel">Annuler</button>
			<button class="sub" @click="submit">Choisir</button>
		</div>
	</div>
</template>

<script>
	import TimepickerByHalfDay from './TimepickerByHalfDay.vue';
	import TimepickerByHour from './TimepickerByHour.vue';
	import TimepickerByMinute from './TimepickerByMinute.vue';

	export default 
	{
		components:
		{
			'timepicker-by-halfday': TimepickerByHalfDay,
			'timepicker-by-hour': TimepickerByHour,
			'timepicker-by-minute': TimepickerByMinute
		},
		props:
		{
			statut: { type: String }
		},
		data ()
		{
			return {
				byHalfDay: false,
	    		byHour: false,
	    		byMinute: false
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
				this.dateProp = this.dateProp.clone();
				this.$emit('change', this.dateProp);
			},
			cancel ()
			{
				this.$emit('cancel');
			},
		}
	}
</script>