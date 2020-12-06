var data = {
    // Labels should be Date objects
    labels: [new Date(2017, 08, 16), new Date(2017, 08, 17), new Date(2017, 08, 18)],
    datasets: [{
        fill: false,
        label: 'ppm',
        data: [110, 103, 98],
        borderColor: '#fe8b36',
        backgroundColor: '#fe8b36',
        lineTension: 0,
    }]
};
var Trend = document.getElementById('alk-T').getContext('2d');
var alkTrend = new Chart(Trend, {
    type: 'line',
    data: data,
    options: {
        title: {
            display: true,
            text: 'Alkalinity Levels',
            fontSize: 18,
            fontStyle: 'bold'
        },
        legend: {display: false},
        fill: false,
        responsive: true,
        scales: {
            xAxes: [{
                type: 'time',
                time: {unit: 'day'},
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: "Date",
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: "Alkalinity Levels",
                }
            }]
        }
    }
});