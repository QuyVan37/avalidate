'use strict'

$('#btn_addnew').click(function () {
    $('#modal_addnew').modal('show')
})

$('#btn_overall').click(function () {
    $('#showChartOverall').modal('show')
})



// ChartJS handel

//- BAR CHART -
//-------------
var barChartCanvas = $('#chartDieMakingBySuppliers').get(0).getContext('2d')

new Chart(barChartCanvas, {
    type: 'bar',
    data: {
        labels: ['TABT', 'V008', 'N287', 'N547'],
        datasets: [
            {
                label: 'Renewal',
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                pointRadius: false,
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: [28, 48, 40,50]
            },
            {
                label: 'Additional',
                backgroundColor: 'rgba(210, 214, 222, 1)',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: false,
                pointColor: 'rgba(210, 214, 222, 1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80,50]
            },
            {
                label: 'MT',
                backgroundColor: 'rgba(210, 214, 111, 1)',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: false,
                pointColor: 'rgba(210, 214, 222, 1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [100, 150, 60,10]
            },
        ]
    },
    
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }
    }
})