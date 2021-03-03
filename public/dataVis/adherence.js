const adherenceScore = document.getElementById('ad-scr').getContext('2d')

const adherenceDonut = new Chart(adherenceScore, {
    type: 'doughnut',
    data: {
        datasets: [{
            data: [70, 30],
            backgroundColor: '#23233d'
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Adherence',
            fontSize: 16
        },
        legend: {display: false},
        responsive: true,
        borderWidth: 15,
        
    }
})