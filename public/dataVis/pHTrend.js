var data = {
    // Labels should be Date objects
    labels: [new Date(2017, 08, 16), new Date(2017, 08, 17), new Date(2017, 08, 18)],
    datasets: [{
        fill: false,
        label: 'pH',
        data: [7.1, 7.4, 7.3],
        borderColor: '#33A94B',
        backgroundColor: '#33A94B',
        lineTension: 0,
    }]
};
var Trend = document.getElementById('ph-T').getContext('2d');
var pHTrend = new Chart(Trend, {
    type: 'line',
    data: data,
    options: {
        title: {
            display: true,
            text: 'pH Levels',
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
                    labelString: "pH Levels",
                }
            }]
        }
    }
});