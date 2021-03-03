const adherenceScore = document.getElementById('ad-scr').getContext('2d')

const adherenceDonut = new Chart(adherenceScore, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [70, 30],
            backgroundColor: ['#23233d', '#d3d3d3']
        }]
    },
    options: {
        responsive: false,
        cutoutPercentage: 80
    }
})