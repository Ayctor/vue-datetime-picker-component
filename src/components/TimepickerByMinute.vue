<script>
	import moment from 'moment';
	moment.locale('fr');
	
	export default 
	{
		name: 'TimepickerByMinute',
		props: 
		{
			statut: { type: String },
			hour: { type: String },
			minute: { type: String },
		},
		data()
		{
			return{		
	    		activeMorning: true,
	    		activeAfternoon: false,
	    		hourProp: this.hour,
	    		minuteProp: this.minute,
	    		hourInt: parseInt(this.hour),
	    		minuteInt: parseInt(this.minute),
	    		
			}
		},
		methods:
		{
			toggleHalfday()
			{
				this.activeMorning = !this.activeMorning;
				this.activeAfternoon = !this.activeAfternoon;
			},
			addHour()
			{
				if(this.hourInt > 22)
				{
					this.hourInt = 0
				} else
				{
					this.hourInt++;
				};
				this.hourProp = this.hourInt;
				this.minuteProp = this.minuteInt;
			},
			subHour()
			{
				if(this.hourInt < 1)
				{
					this.hourInt = 23
				} else
				{
					this.hourInt--;
				};
				this.hourProp = this.hourInt;
				this.minuteProp = this.minuteInt;
			},
			addQuarter()
			{
				if(this.minuteInt > 30)
				{
					this.minuteInt = 0;
					this.hourInt++
				} else
				{
					this.minuteInt += 15;
				}
				this.hourProp = this.hourInt;
				this.minuteProp = this.minuteInt;
			},
			subQuarter()
			{
				if(this.minuteInt < 15)
				{
					this.minuteInt = 45;
					this.hourInt--
				} else
				{
					this.minuteInt -= 15;
				}
				this.hourProp = this.hourInt;
				this.minuteProp = this.minuteInt;
			},
			focusedHour()
			{
				this.hourInt=(this.hourInt).toString;
				this.hourInt="";
			},
			focusedMinute()
			{
				this.minuteInt=(this.minuteInt).toString;
				this.minuteInt="";
			},
			sendHour()
			{
				this.hourProp = this.hourInt;
			},
			sendMinute()
			{
				this.minuteProp = this.minuteInt;
			},
		},
		watch:
		{
			hourInt ()
			{
				this.$emit('change', {'hourProp':this.hourProp, 'minuteProp':this.minuteProp} );

			},
			minuteInt ()
			{
				this.$emit('change', {'hourProp':this.hourProp, 'minuteProp':this.minuteProp} );
			}
		},
	};
</script>

<template>
	<div class="timepicker-wrap">
		<div class="minute-timepicker timepicker">
			<div class="hour">	
				<input type="text" name="hour-input" v-model="hourInt" @focus="focusedHour" @input="sendHour" autocomplete="off" >		
				<div class="timepicker-controls">
					<button class="timepicker-controls-add" @click="addHour">
						<img src="../assets/caret-up.svg" alt="add" >
					</button>
					<button class="timepicker-controls-sub"  @click="subHour">
						<img src="../assets/caret-down.svg" alt="substract" >
					</button>
				</div>
			<span>H</span>
			</div> 
			:
			<div class="minute">	
				<input type="text"  name="minute-input" v-model="minuteInt" @focus="focusedMinute" @input="sendMinute" autocomplete="off" >		
				<div class="timepicker-controls">
					<button class="timepicker-controls-add">
						<img src="../assets/caret-up.svg" alt="add"  @click="addQuarter">
					</button>
					<button class="timepicker-controls-sub" @click="subQuarter">
						<img src="../assets/caret-down.svg" alt="substract">
					</button>
				</div>
				<span>min</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	$picker-height: 2rem;

	$color-blue: #0075BF;
	$color-blue-vivid: #3499d9;
	$color-grey-dark: #8795a1;

	$font-sm: 0.86rem;
	$font-base: 1rem;

	$weight-light: 300;
	$weight-normal: 400;

	.timepicker
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: $picker-height;
		position: relative;
		margin: 1em 0;

		button
		{
			border: none;
			outline: none;
			background-color: transparent;
		};

		input
		{
			outline: none;
			border: none; 
			text-align: center;
			font-size: $font-base;
			width: 50%;
			height: 100%;
		}
	}

	.minute-timepicker
	{

		.hour, .minute
		{
			position: relative;
			height: 100%;
			width: 100%;
		    display: flex;
		    flex-direction: row;
		    justify-content: center;
		    align-items: center;


			.timepicker-controls
			{
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: absolute;
				opacity: 0;
				
				img
				{
					height: 0.75rem;
					cursor: pointer;
				}
			};
			span
			{
				color: $color-grey-dark;
			};
		}

		.minute input
		{
			width: 40%;
		};


		.hour .timepicker-controls, .minute .timepicker-controls
		{
			right: 0.5rem
		}

		input, .hour input
		{
			width: 40%
		}
		
	}

	.hour:hover .timepicker-controls, .minute:hover .timepicker-controls
	{
		opacity:1
	}
</style>