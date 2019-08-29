<style lang="scss">

	$header-height: 6rem;
	$header-width: 24rem;
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

	.calendar
	{
		position: absolute;
		z-index: 5;
		background-color: #fff;
		box-shadow: 0 2px 14px 0 rgba(0, 0, 0, .40);
		border-radius: 0 0 0.5rem 0.5rem;
	}
	.calendar-header
	{
		background-color: $color-blue;
		color: #fff;
		padding: 1.5rem;
		font-weight: $weight-light;
		height: $header-height;
		width: $header-width;
	}
	.calendar-year
	{
		font-size: $font-sm;
		line-height: $font-sm;
		margin-bottom: 0.5rem;
	}
	.calendar-date
	{
		font-size: $font-3xl;
		line-height: $font-3xl;
	}
	.calendar-controls
	{
		font-size: $font-2xl;
		font-weight: $weight-thin;
		padding: 2rem;
		height: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: $color-blue;
		button
		{
			border: none;
			cursor: pointer;
			background-color: transparent;
			outline: none;
		}
	}
	.calendar-weekdays
	{
		font-size: $font-base;
		line-height: $font-base;
		color: $color-blue;
		padding: 0 1.5rem;
		display: flex;
	}
	.calendar-weekday
	{
		width: $weekday-size;
		text-align: center;
	}
	.calendar-days
	{
		padding: 0 1.5em;
		height: $weekday-size * 5;
		width: $header-width;
		display: flex;
		flex-wrap: wrap;
	}
	.calendar-day
	{
		position: relative;
		width: $weekday-size;
		height: $weekday-size;
		line-height: $weekday-size;
		cursor: pointer;
		text-align: center;
	}
	.calendar-day-text
	{
		position: relative;
		z-index: 2;
	}
	.calendar-day-effect
	{
		position: absolute;
		left: 0.25rem;
		top: 0.25rem;
		z-index: 0;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
		background-color: $color-blue-light;
		transition: all 450ms cubic-bezier(0.14, 0.82, 0.4, 0.94);
		transform: scale(0);
		opacity: 0;
	}

	.calendar-day:hover 
	{
		color: #fff;
	}


	.calendar-day:hover .calendar-day-effect
	{
		transform: scale(1);
		opacity: 0.6;
	}

	.calendar-day.selected 
	{
		color: #fff;
	}

	.calendar-day.selected .calendar-day-effect
	{
		transform: scale(1);
		background-color: $color-blue;
		opacity: 1;
	}
	.calendar-actions
	{
		padding: 0 1rem;
		display: flex;
		justify-content: flex-end;

		button
		{
			border: none;
			cursor: pointer;
			background-color: transparent;
			outline: none;	
			font-size: $font-sm;
			font-weight: $weight-medium;
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
	}
	.options
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: ceneter;
	}
	timepicker
	{
		position: relative;
		border-top: 1px solid $color-blue-light;
		height: 4em;
		width : 100%;
	}
</style>

<template>
	<transition name="slide">
		<div class="calendar" v-show="displayedCalendar" @click.stop>
			<div class="calendar-header">
				<div class="calendar-year">
					{{year}}
				</div>
				<div class="calendar-date">
					{{date_formatted}}
				</div>
			</div>
			<div class="calendar-controls">
				<button class="calendar-controls-prev" @click="prevMonth()">
					<img src="../assets/chevron-left.svg" alt="next">
				</button>
				<div class="calendar-controls-month">
					{{month.getFormatted()}}
				</div>
				<button class="calendar-controls-next" @click="nextMonth()">
					<img src="../assets/chevron-right.svg" alt="next">
				</button>
			</div>
			<div class="calendar-weekdays">
				<div v-for="weekday in weekdays" class="calendar-weekday">	
					{{weekday}}
				</div>
			</div>
			<div class="calendar-days">
				<div class="calendar-day" :style="{ width: (month.getWeekBeginning()*3) + 'rem'}">
				</div>
				<div class="calendar-day" @click="selectDate(day)" v-for="day in month.getMonthDays()" :class="{'selected': isSelected(day)}">
					<span class="calendar-day-text">{{day.format('D')}}</span>
					<span class="calendar-day-effect"></span>
				</div>
			</div>
			<!-- <timepicker-by-day :statut="statut" :value="value" :date.sync="date" name="hour-start" v-if="byDay"></timepicker-by-day> -->
			<timepicker :statut="statut" :value="value" :date.sync="date"></timepicker>
			<div class="calendar-actions">
				<button @click="cancel" class="cancel">Annuler</button>
				<button class="sub" @click="submit">Choisir</button>
			</div>
		</div>
	</transition>
</template>


<script>

	import Month from '../modules/month.js';
	import Timepicker from './Timepicker.vue';
	import moment from 'moment';

	//Functions
	String.prototype.capitalize = function() 
	{
    	return this.charAt(0).toUpperCase() + this.slice(1);
	}

	//Component
	export default
	{
		props: 
		{
			date: {},
			displayedCalendar: {type: Boolean, default: true},
			value: { type: String, required: true },
			statut: { type: String },
		},
		data ()
		{
			return {
				weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
				month: new Month(this.date.month(), this.date.year()),
				dateProp: this.date,
	    		timeProp: this.date,
	    		hourFocused: false,
	    		minuteFocused: false,
	    		hourProp: '',
	    		minuteProp: '',
	    		invalidDate: false,
	    		regex: /^[0-9]$/,
			}
		},
		methods:
		{
			isSelected: function (day)
			{
				return this.dateProp.dayOfYear() === day.dayOfYear();
			},
			selectDate: function (day)
			{
				let dayClone = day.clone()
				dayClone.hours(parseInt(this.hourProp));
				dayClone.minutes(parseInt(this.minuteProp));
				return this.dateProp = dayClone;
			},
			nextMonth ()
			{
				let month = this.month.month + 1;
				let year = this.month.year;
				if (month>11)
				{
					year += 1;
					month = 0;
				}
				this.month = new Month(month, year)
			},
			prevMonth ()
			{
				let month = this.month.month - 1;
				let year = this.month.year;
				if (month<0)
				{
					year -= 1;
					month = 11;
				}
				this.month = new Month(month, year)
			},
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
			changeHour: function (timeObj)
			{
				this.hourProp = timeObj.hourProp;
				this.minuteProp = timeObj.minuteProp;

				this.dateProp.minute(this.minuteProp);
				this.dateProp.hour(this.hourProp);
			},
			isHalfDay ()
			{
				if(this.statut === 'byHalfDay') 
				{	
					this.byHalfDay = true
				} else
				{
					this.byMinute = false
				}
			},
			isHour ()
			{
				if(this.statut === 'byHour') 
				{	
					this.byHour = true
				}else
				{
					this.byMinute = false
				}
			},
			isMinute ()
			{
				if(this.statut === 'byMinute') 
				{	
					this.byMinute = true
				} else
				{
					this.byMinute = false
				}
			},
		},
		computed: 
		{

			year ()
			{
				return this.dateProp.format('YYYY');
			},
			date_formatted ()
			{
				return this.dateProp.format('ddd, D MMMM').capitalize();
			},
			hour_formatted ()
			{
				return this.dateProp.format('HH')
			},
			minute_formatted ()
			{
				return this.dateProp.format('mm')
			},
		},
		mounted ()
		{
			this.isHalfDay();
			this.isHour();
			this.isMinute();
		}
	};
</script>