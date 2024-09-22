$(function() {
    'use strict';

    // The Default colorPalette for this dashboard
    let colorPalette = [themeColors.primary, '#008FFB', '#FEB019', '#FF4560', '#775DD0'];

    let options = {
        chart: {
            type: 'line',
            height: 300,
            toolbar: {
                show: false,
            }
        },
        legend:{
            itemMargin: {
                vertical: 20
            },
        },
        colors: colorPalette,
        series: [{
            name: 'Services',
            data: [15, 60, 40, 91, 10, 0]
        }],
        xaxis: {
            title: {
                text: 'Year',
            },
            categories: [2015, 2016, 2017, 2018, 2019, 2020]
        },
        yaxis: {
            title: {
                text: 'Services Count',
            },
        }

    };

    let chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();

    /* Line, Column & Area */
    let option4 = {
        series: [{
            name: 'Profit',
            data: [31, 40, 28, 51, 42, 109, 100]
        }, {
            name: 'Services',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        chart: {
            height: 290,
            type: 'area',
            toolbar: {
                show: false,
            }
        },
        legend:{
            itemMargin: {
                vertical: 20
            },
        },
        colors: [themeColors.primary,themeColors.pink],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ['2018-09-11', '2018-09-12', '2018-09-13', '2018-09-14', '2018-09-15', '2018-09-16', '2018-09-19']
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
    };


    let chart4 = new ApexCharts(document.querySelector('#line-column-area-chart'), option4);
    chart4.render();

    // Bar Chart
    let optionsBar = {
        chart: {
            type: 'bar',
            height: 295,
            width: '100%',
            stacked: true,
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        plotOptions: {
            bar: {
                columnWidth: '10%',
            }
        },
        colors: colorPalette,
        series: [{
            name: 'Clothing',
            data: [42, 52, 16, 55, 51, 45, 20, 10],
        }, {
            name: 'Food Products',
            data: [10, 14, 25, 16, 9, 20, 80, 40],
        }],
        labels: [10, 11, 12, 13, 15, 16],
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: '#78909c'
                }
            }
        },
        legend:{
            itemMargin: {
                vertical: 20
            },
        }

    };

    let chartBar = new ApexCharts(document.querySelector('#bar-chart'), optionsBar);
    chartBar.render();


    let randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

    let config = {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),

                ],
                backgroundColor: colorPalette,
                label: 'eCommerce Services'
            }],
            labels: [
                'Natural Massage',
                'Stretching',
                'Fitness',
                'Swedish Massage',

            ]
        },
        options: {
            responsive: false,
            legend: {
                boxWidth: 10,
                position: 'bottom',
                offsetX: 100,
                offsetY: 30,
                itemMargin: {
                    vertical: 20
                },
            },
            animation: {
                animateScale: true,
                animateRotate: true
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            },
            cutoutPercentage: 70
        }
    };

    window.onload = function() {
        let ctx = document.getElementById('chart-area').getContext('2d');
        window.myDoughnut = new Chart(ctx, config);
        ctx.canvas.parentNode.style.height = '330px';
    };

});