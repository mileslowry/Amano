var Gauge = document.getElementById('ph-G');
pHGauge = echarts.init(Gauge);
var phOption = {
    tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
        {
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
            axisTick: { show: true },
            splitLine: { show: false },
            splitNumber: 2,
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
                        // [0.4, "#FF8C00"],
                        [0.8, "#48D81F"],
                        // [0.8, "#FF8C00"],
                        [1, "#D81F31"]
                    ]
                }
            },
            data: [{ value: 8, name: 'pH' }] 
        }
    ]
};

// setInterval(function () {
//     phOption.series[0].data[0].value = (Math.random() * (8 - 7) + 7).toFixed(1) - 0;
//     pHGauge.setOption(phOption, true);
// }, 2000);