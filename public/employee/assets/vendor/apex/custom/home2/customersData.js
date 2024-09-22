var options = {
	chart: {
		height: 153,
		type: "bar",
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: "50px",
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 2,
		colors: ["transparent"],
	},
	series: [
		{
			name: "New Client",
			data: [10, 8, 25, 35, 4, 20, 2],
		},
		{
			name: "Services",
			data: [2, 12, 15, 45, 8, 35, 4],
		},
	],
	legend: {
		show: false,
	},
	xaxis: {
		categories: ["01-10-2023", "5-10-2023", "10-10-2023", "15-10-2023", "18-10-2023", "19-10-2023", "20-10-2023"],
	},
	yaxis: {
		show: false,
	},
	fill: {
		opacity: 1,
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return  val;
			},
		},
	},
	grid: {
		borderColor: "#b7c6d8",
		strokeDashArray: 5,
		xaxis: {
			lines: {
				show: true,
			},
		},
		yaxis: {
			lines: {
				show: false,
			},
		},
		padding: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
	},
	colors: ["#A780F4", "#a5acc3", "#dfe2ed"],
};
var chart = new ApexCharts(document.querySelector("#customersData"), options);
chart.render();
