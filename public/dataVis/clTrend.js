var data = {
    // Labels should be Date objects
    labels: [new Date(2017, 08, 16), new Date(2017, 08, 17), new Date(2017, 08, 18)],
    datasets: [{
        fill: false,
        label: 'ppm',
        data: [1.2, 3.0, 2.8],
        borderColor: '#336ca9',
        backgroundColor: '#336ca99',
        lineTension: 0,
    }]
};
var Trend = document.getElementById('cl-T').getContext('2d');
var clTrend = new Chart(Trend, {
    type: 'line',
    data: data,
    options: {
        title: {
            display: true,
            text: 'Chlorine Levels',
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
                    labelString: "Chlorine Levels",
                }
            }]
        }
    }
});