var alk = document.getElementById('alk-G');
alkGauge = echarts.init(alk);
var alkOption = {
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
            axisTick: {
                show: true,
            },
            splitLine: { show: false },
            splitNumber: 5,
            axisLabel: {
                show: true,
                distance: 5
            },
            name: "Alkalinity Levels",
            type: 'gauge',
            min: 75,
            max: 125,
            detail: {
                offsetCenter: [5, 40],
                formatter: `{value}`
            },
            axisLine: {
                lineStyle: {
                    color: [
                        [0.0999, "#D81F31"],
                        [0.3, "#FF8C00"],
                        [0.7, "#5BABFF"],
                        [0.9, "#FF8C00"],
                        [1, "#D81F31"]
                    ]
                }
            },
            data: [{ value: 90, name: 'Alk' }]
        }
    ]
};

setInterval(function () {
    alkOption.series[0].data[0].value = (Math.random() * (125 - 75) + 75).toFixed(1) - 0;
    alkGauge.setOption(alkOption, true);
},2000);