<script>
	import moment from 'moment';
	moment.locale('fr');

	export default 
	{
		name: 'TimepickerByHour',
		props: 
		{
			value: { type: String, required: true },
			statut: { type: String },
			hour: { type: String },
		},
		data()
		{
			return{		
	    		hourProp: this.hour,
	    		hourInt: parseInt(this.hour),
			}
		},
		methods:
		{
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
			focusedHour()
			{
				this.hourInt=(this.hourInt).toString;
				this.hourInt="";
			},
			sendHour()
			{
				this.hourProp = this.hourInt;
			},
		},
		watch:
		{
			hourInt ()
			{
				this.$emit('change', {'hourProp':this.hourProp});
			},
		},
	};
</script>

<template>
	<div class="timepicker-wrap">
		<div class="hour-timepicker timepicker" >
			<div class="hour">		
				<input type="text" name="hour-input" v-model="hourInt" @focus="focusedHour" @input="sendHour" autocomplete="off" >	
				<div class="timepicker-controls">
					<button class="timepicker-controls-add" @click="addHour">
						<img src="../assets/caret-up.svg" alt="add" >
					</button>
					<button class="timepicker-controls-sub" @click="subHour">
						<img src="../assets/caret-down.svg" alt="substract" >
					</button>
				</div>
				<span>H</span>
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

	.hour-timepicker
	{

		.hour
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

		.hour input  
		{
			width: 70%;
		};

		.hour .timepicker-controls
		{
			right: 1rem
		}
		
	}

	.hour:hover .timepicker-controls
	{
		opacity:1
	}
</style>
