$(document).ready(() => {

    // Find the URL with customer/pool ids in it
    const dashURL = window.location.pathname;

    // Request data from API
    $.get(`/api${dashURL}`, (results = {}) => {
        let timeLabels = [];
        let timeSeriesDataPH = [];
        let timeSeriesDataCl = [];
        let timeSeriesDataAlk = [];
        let data = results.data;
        if (!data || !data.pool.chemReading) return;

        // See how many chem readings there are total
        let chemReadLength = Object.keys(data.pool.chemReading).length;

        // Get the current readings
        phOption.series[0].data[0].value = data.pool.chemReading[chemReadLength - 1].pH;
        clOption.series[0].data[0].value = data.pool.chemReading[chemReadLength - 1].cl;
        alkOption.series[0].data[0].value = data.pool.chemReading[chemReadLength - 1].alk;

        // Set the current readings in the charts
        pHGauge.setOption(phOption, true);
        clGauge.setOption(clOption, true);
        alkGauge.setOption(alkOption, true);

        // Get data ready for trend charts
        data.pool.chemReading.forEach(reading => {
            timeLabels.push(new Date(reading.readTime));
            timeSeriesDataPH.push(reading.pH);
            timeSeriesDataCl.push(reading.cl);
            timeSeriesDataAlk.push(reading.alk);
        });

        var newPHTrend = document.getElementById('ph-T').getContext('2d');
        var pHTrend = new Chart(newPHTrend, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    fill: false,
                    label: 'pH',
                    data: timeSeriesDataPH,
                    borderColor: '#33A94B',
                    backgroundColor: '#33A94B',
                    lineTension: 0,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'pH Levels',
                    fontSize: 18,
                    fontStyle: 'bold'
                },
                legend: {
                    display: false
                },
                fill: false,
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
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

        var newClTrend = document.getElementById('cl-T').getContext('2d');
        var clTrend = new Chart(newClTrend, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    fill: false,
                    label: 'pH',
                    data: timeSeriesDataCl,
                    borderColor: '#336ca9',
                    backgroundColor: '#336ca9',
                    lineTension: 0,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Chlorine Levels',
                    fontSize: 18,
                    fontStyle: 'bold'
                },
                legend: {
                    display: false
                },
                fill: false,
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
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

        var newAlkTrend = document.getElementById('alk-T').getContext('2d');
        var alkTrend = new Chart(newAlkTrend, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [{
                    fill: false,
                    label: 'pH',
                    data: timeSeriesDataAlk,
                    borderColor: '#fe8b36',
                    backgroundColor: '#fe8b36',
                    lineTension: 0,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Alkalinity Levels',
                    fontSize: 18,
                    fontStyle: 'bold'
                },
                legend: {
                    display: false
                },
                fill: false,
                responsive: true,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
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

    });
});