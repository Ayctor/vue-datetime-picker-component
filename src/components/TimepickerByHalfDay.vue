<script>
	import moment from 'moment';
	moment.locale('fr');

	export default 
	{
		name: 'TimepickerByHalfDay',
		props: 
		{
		},
		data()
		{
			return{		
	    		activeMorning: true,
	    		activeAfternoon: false,
			}
		},
		methods:
		{
			toggleHalfday()
			{
				this.activeMorning = !this.activeMorning;
				this.activeAfternoon = !this.activeAfternoon;
			},
		},
	};
</script>

<template>
	<div class="timepicker-wrap">
		<div class="halfday-timepicker timepicker" >
			<button :class="{ active: activeMorning }" @click="toggleHalfday()">Matin</button>
			<button :class="{ active: activeAfternoon }" @click="toggleHalfday()">Après-midi</button>
			<div class="halfday-switch" v-bind:class="{ active: activeAfternoon }" @click="toggleHalfday()"></div>
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

	.halfday-timepicker
	{

		button
		{
			width: 100%;
			color: $color-grey-dark;
			position: relative;
			z-index: 5;
			font-size: $font-base;
			font-weight: $weight-light;
			cursor: pointer
		};

		button.active
		{
			color: white;
		};
			
		.halfday-switch
		{
			position: absolute;
			z-index: 4;
			height: 100%;
			width: 50%;
			background-color: $color-blue-vivid;
			transform: translateX(-50%);
			transition: all 300ms cubic-bezier(.17,.67,.54,.91); 
		};

		.halfday-switch.active
		{
			transform: translateX(50%);
		}

	}
</style>
