$(window).on('load', () => {

    // Request data from API
    $.get(`/api/dashboard/alerts`, (results = {}) => {
        console.log(results);
        let data = results.data.alerts;
        data.forEach(result => {
            let currentID = `ph-G-${result.poolId}`
            let Gauge = document.getElementById("ph-G-5fd9a62e4934bd0017a245a7");
            console.log(currentID);
            console.log(Gauge);
            let pHGauge = echarts.init(Gauge);
            var phOption = {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                series: [{
                    title: {
                        show: true,
                        offsetCenter: [0, -90],
                        color: '#888',
                        fontWeight: 'bold',
                        fontSize: 18
                    },
                    clockwise: true,
                    startAngle: 180,
                    endAngle: 0,
                    pointer: {
                        show: true,
                        length: "70%",
                        width: 5
                    },
                    axisTick: {
                        show: true
                    },
                    splitLine: {
                        show: false
                    },
                    splitNumber: 5,
                    axisLabel: {
                        show: true,
                        distance: 5
                    },
                    name: "pH Levels",
                    type: 'gauge',
                    min: 7,
                    max: 8,
                    detail: {
                        offsetCenter: [5, 40],
                        formatter: `{value}`
                    },
                    axisLine: {
                        lineStyle: {
                            color: [
                                [0.2, "#D81F31"],
                                [0.4, "#FF8C00"],
                                [0.6, "#5BABFF"],
                                [0.8, "#FF8C00"],
                                [1, "#D81F31"]
                            ]
                        }
                    },
                    data: [{
                        value: 8,
                        name: 'pH'
                    }]
                }]
            };
        // Get the current readings
        phOption.series[0].data[0].value = result.pHRead;
        // clOption.series[0].data[0].value = clRead;
        // alkOption.series[0].data[0].value = alkRead;
        // // Set the current readings in the charts
        pHGauge.setOption(phOption, true);
        // // clGauge.setOption(clOption, true);
        // // alkGauge.setOption(alkOption, true);

        });     
    });
});