document.addEventListener("DOMContentLoaded", function () {
	var calendarEl = document.getElementById("dayGrid");
	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: "prevYear,prev,next,nextYear today",
			center: "title",
			right: "dayGridMonth,dayGridWeek,dayGridDay",
		},
		initialDate: "2023-09-20",
		navLinks: true, // can click day/week names to navigate views
		editable: false,
		dayMaxEvents: true, // allow "more" link when too many events
		events: [
			{
				title: "Massage",
				start: "2023-09-29T13:00:00",
				color: "#067e73"
				// color: "#bedefa",
			},
			{
				groupId: 999,
				title: "Stretch",
				start: "2023-09-10T16:00:00",
				color: "#e4052e",
			},
			{
				groupId: 999,
				title: "Flexiva Conference",
				start: "2023-09-16T16:00:00",
				color: "#bedefa",
			},
			{
				title: "Conference",
				start: "2023-09-11",
				end: "2023-09-13",
				color: "#f6bc02",
			},
			{
				title: "Massage",
				start: "2023-09-07T10:30:00",
				end: "2023-09-07T12:30:00",
			},
			{
				title: "Lunch",
				start: "2023-09-16T12:00:00",
				color: "#d63384",
			},
			{
				title: "Meeting",
				start: "2023-09-18T14:30:00",
				color: "#fd7e14",
			},
			{
				title: "Launch of New Franchise",
				start: "2023-09-21T17:30:00",
				color: "#6f42c1",
			},
			{
				title: "Stretch",
				start: "2023-09-01T20:00:00",
				color: "#bedefa",
			},
			{
				title: "Birthday",
				start: "2023-09-13T07:00:00",
				color: "#1a73e8",
			},
			{
				title: "Click for Discount",
				url: "http://google.com/",
				start: "2023-09-28",
				color: "#fda901",
			},
			{
				title: "Launch of New Franchise",
				start: "2023-09-20",
				color: "#e4052e",
			},
			{
				title: "Product Launch",
				start: "2023-09-29",
				color: "#dd5500",
			},
	
		],
	});

	calendar.render();
});
