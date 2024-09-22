
$(function () {
	// var gdpData = {
	// 	"AF": 16.63,
	// 	"AL": 11.58,
	// 	"DZ": 158.97,
		
	//   };
	$("#world-map-markers2").vectorMap({
		
		map: "in_merc",
		hoverColor: false,
		zoomOnScroll: true,
		series: {
			regions: [
				{
					values: gdpData,
					scale: ["#3659cd", "#e65729"],
				},
			],
		},
		markerStyle: {
			initial: {
				fill: "#ffffff",
				stroke: "#3659cd",
				"fill-opacity": 1,
				"stroke-width": 10,
				"stroke-opacity": 0.4,
				r: 15,
			},
			hover: {
				fill: "#ffffff",
				stroke: "#e13d4b",
				"fill-opacity": 0.8,
				"stroke-width": 10,
				"stroke-opacity": 0.4,
				r: 15,
				cursor: "pointer",
			},
		},
		regionStyle: {
			initial: {
				fill: "#e65729",
			},
			hover: {
				"fill-opacity": 0.8,
			},
			selected: {
				fill: "#333333",
			},
		},
		backgroundColor: "transparent",
		markers: [
			{ latLng: [26, 85], name: "Muzafarpur" },
			{ latLng: [25, 84], name: "Bihar" },
			{ latLng: [24, 85], name: "Sheohar" },
		
		],
	});
});
