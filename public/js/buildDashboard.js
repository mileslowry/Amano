$(document).ready(() => {

    // Find the URL with customer/pool ids in it
    const dashURL = window.location.pathname;

    // Request data from API
    $.get(`/api${dashURL}`, (results = {}) => {
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
            console.log(reading);
            // https://www.chartjs.org/docs/latest/developers/updates.html
        })
    })
});