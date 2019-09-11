<script>
	import Month from '../modules/month.js';
	import Timepicker from './Timepicker.vue';
	import moment from 'moment';
	import 'moment-range';
	moment.locale('fr');

	//Functions
	String.prototype.capitalize = function() 
	{
    	return this.charAt(0).toUpperCase() + this.slice(1);
	}

	//Component
	export default
	{
		name: 'Calendar',
		components:
		{
			Timepicker
		},
		props: 
		{
			date: {},
			name: { type: String },
			displayedCalendar: {type: Boolean, default: true},
			statut: { type: String },
			genre: { type: String },
			today: { type: Boolean }
		},
		data ()
		{
			return {
				weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
				month: new Month(this.date.month(), this.date.year()),
				dateProp: this.date,
	    		hourFocused: false,
	    		minuteFocused: false,
	    		invalidDate: false,
	    		regex: /^[0-9]$/
			}
		},
		methods:
		{
			isSelected (day)
			{
				return this.dateProp.dayOfYear() === day.dayOfYear();
			},
			isDisabled (day)
			{
				if(this.today)
				{
					if(this.name==="date-start" && day.isBefore(moment(), 'day'))
					{
						return day
					} else if (this.name==="date-start" && day.isAfter(this.$store.state.valueEnd, 'day'))
					{
						return day
					} else if (this.name==="date-end" && day.isBefore(this.$store.state.valueStart, 'day'))
					{
						return day
					} else
					{
						return ''
					}
				}
			},
			selectDate (day)
			{
				return this.dateProp = day;
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
			setTime (timeProp)
			{	
				let hourProp = timeProp.format('HH');
				let minuteProp = timeProp.format('mm');
				this.dateProp.hour(hourProp);
				this.dateProp.minute(minuteProp);
				this.$emit('setDate', this.dateProp);
			},
			submit ()
			{
				this.dateProp = this.dateProp.clone();
				this.$emit('setDate', this.dateProp);
			},
			cancel ()
			{ 
				this.$emit('cancel');
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
		},
		mounted()
		{
		}
	};
</script>

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
				<div class="calendar-day" @click="selectDate(day)" v-for="day in month.getMonthDays()" :class="{'selected': isSelected(day), 'disabled': isDisabled(day)}">
					<span class="calendar-day-text">{{day.format('D')}}</span>
					<span class="calendar-day-effect"></span>
				</div>
			</div>
			<timepicker :date.sync="date" @setTime="setTime" @cancel="cancel" :genre="genre" :statut="statut" format="HH:mm" name="timepicker" v-if="genre === 'datetime'"></timepicker>
			<div class="actions" v-if="genre === 'date'">
				<button @click="cancel" class="cancel">Annuler</button>
				<button class="sub" @click="submit">Choisir</button>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
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
		width: $header-width;
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
		padding: 2rem 0;
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
    	margin-bottom: 4rem;
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
	
	.calendar-day.disabled
	{
		opacity: 0.3;
		pointer-events: none;
		cursor: default;
	}
	.calendar-day.disabled .calendar-day-effect
	{
		opacity: 0;
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
	.actions
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
		align-items: center;
	}
	.timepicker-wrap
	{
		position: relative;
		width : 100%;
	}
</style>