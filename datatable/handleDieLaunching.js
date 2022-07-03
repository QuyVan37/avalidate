'use strict'

$('#btn_addnew').click(function () {
    $('#modal_addnew').modal('show')
})

$('#btn_overall').click(function () {
    $('#showChartOverall').modal('show')
})

var backgroundColor = [
    "#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7",
    "#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6",
    "#1984c5", "#22a7f0", "#63bff0", "#a7d5ed", "#e2e2e2", "#e1a692", "#de6e56", "#e14b31", "#c23728",
    "#54bebe", "#76c8c8", "#98d1d1", "#badbdb", "#dedad2", "#e4bcad", "#df979e", "#d7658b", "#c80064"

]

// ChartJS handel

loadchart()

function loadchart() {
    getDatafromAPI2()
    remove([0,1,2,3,4])
}

function remove(arr){
   var a = arr.splice(1,1)
    console.log(a, arr)
}

function getDatafromAPI2() {
    let search = $('#search').val();
    let following = $('#following').val();
    let category = $('#category').val();
    let FAresult = $('#FAresult').val();
    let model = $('#model').val();
    let supplier = $('#supplier').val();
    let from = $('#from').val();
    let to = $('#to').val();
    let data = {
        search: search,
        following: following,
        category: category,
        FAresult: FAresult,
        model: model,
        supplier: supplier,
        from: from,
        to: to
    }
    console.log(data)
    $.ajax({
        url: "http://localhost:8080/Die_Launching_Control/getRecord",
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (data) {
            renderChart1(data)
            renderChart2(data)
            renderChart3(data)
        }
    })
}


function renderChart1(data) {
    var ctx1 = $('#chartDieMakingBySuppliers').get(0).getContext('2d')
    var dataHandeled = getQtyItemForEachCategoryBySupplier(data)
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: dataHandeled.map(x => x.Supplier),
            datasets: getDatasets(dataHandeled, data)
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
}
function renderChart2(data) {
    var ctx1 = $('#chartPendingStatus').get(0).getContext('2d')
    var dataHandeled = getQtyforEachPendingStatus(data)
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: dataHandeled.map(x => x.Pending),
            datasets: [
                {
                    label: 'Die',
                    data: dataHandeled.map(x => x.Total),
                    backgroundColor: backgroundColor[0],
                    borderColor: '#524c4c',
                    borderWidth: 1
                }
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
}
function renderChart3(data) {
    var ctx1 = $('#chartDeptResponse').get(0).getContext('2d')
    var dataHandeled = getQtyforEachDeptResponsibility(data)
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: dataHandeled.map(x => x.Dept),
            datasets: [
                {
                    label: 'Die',
                    data: dataHandeled.map(x => x.Total),
                    backgroundColor: function () {
                        var outPut = []
                        for (var i = 0; i < dataHandeled.length; i++) {
                            outPut.push(backgroundColor[i])
                        }
                        return outPut
                    },
                    borderColor: '#524c4c',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
               
            }
        }

    })
}



//For Chart 1
function getQtyItemForEachCategoryBySupplier(data) {
    //1. Lấy ra số lượng khuôn từng category cho mỗi supplier
    //2. Sắp sếp theo thứ tự giảm dần theo Total
    var suppliers = getSupplierList(data)
    var categories = getCategories(data)
    let outPut = []

    for (var i = 0; i < suppliers.length; i++) {
        let set = {}
        let thisSupplier = data.filter(x => x.SupplierCode == suppliers[i])
        set.Supplier = suppliers[i]
        set.Total = thisSupplier.length;
        for (var j = 0; j < categories.length; j++) {
            set[categories[j]] = thisSupplier.filter(x => x.Category == categories[j]).length
        }
        outPut.push(set)
    }
    outPut.sort((a, b) => b.Total - a.Total)
    return outPut
}

//For Chart 2
function getQtyforEachPendingStatus(data) {
    //1. Lấy ra số lượng follow pending status
    //2. Sắp xếp giảm dần
    var pending = getPendingStatus(data)
    var outPut = []
    for (var i = 0; i < pending.length; i++) {
        var thisPending = data.filter(x => x.Pending_Status == pending[i])
        outPut.push({
            Pending: pending[i],
            Total: thisPending.length
        })
    }
    return outPut.sort((a, b) => b.Total - a.Total)
}
//For Chart 3
function getQtyforEachDeptResponsibility(data) {
    //1. Lấy ra số lượng khuôn dept respone
    //2. Sắp xếp giảm dần
    var depts = getDeptResponse(data)
    var outPut = []
    for (var i = 0; i < depts.length; i++) {
        var thisDept = data.filter(x => x.Dept_Response == depts[i])
        outPut.push({
            Dept: depts[i],
            Total: thisDept.length
        })
    }
    outPut.sort((a, b) => b.Total - a.Total)
    outPut.forEach ((x,index) => {
        if(x.Dept == '-') {
            outPut.splice(index,1)
        }
    })
    outPut.forEach ((x,index) => {
        if(x.Dept == '') {
            x.Dept = 'Bank'
        }
    })
    return outPut
}



function getPendingStatus(data){
    var pendingStatus = []
    data.forEach (x => pendingStatus.push(x.Pending_Status))
    pendingStatus = pendingStatus.filter ((element, index) => {
        return pendingStatus.indexOf(element) === index
    })
    return pendingStatus
}


function getDeptResponse(data) {
    var depts = []
    data.forEach(x => depts.push(x.Dept_Response))
    depts = depts.filter((element, index) => {
        return depts.indexOf(element) === index
    })
    return depts
}

function getCategories(data) {
    var categories = []
    data.forEach(x => categories.push(x.Category))
    categories = categories.filter((element, index) => {
        return categories.indexOf(element) === index;
    });
    return categories
}

function getSupplierList(data) {
    var suppliers = [];
    data.forEach(x => suppliers.push(x.SupplierCode))
    suppliers = suppliers.filter((element, index) => {
        return suppliers.indexOf(element) === index;
    });
    return suppliers
}

function getDatasets(dataHandeled, data) {
    var categories = getCategories(data)
    var datasets = []

    for (var i = 0; i < categories.length; i++) {
        var data = dataHandeled.map(x => x[categories[i]])
        datasets.push({
            label: categories[i],
            data: data,
            backgroundColor: backgroundColor[i],
            borderColor: '#524c4c',
            borderWidth: 1
        })
    }
    return datasets
}




// //- BAR CHART -
// //-------------
// var barChartCanvas = $('#chartDieMakingBySuppliers').get(0).getContext('2d')

// new Chart(barChartCanvas, {
//     type: 'bar',
//     data: {
//         labels: ['TABT', 'V008', 'N287', 'N547'],
//         datasets: [
//             {
//                 label: 'Renewal',
//                 backgroundColor: 'rgba(60,141,188,0.9)',
//                 borderColor: 'rgba(60,141,188,0.8)',
//                 pointRadius: false,
//                 pointColor: '#3b8bba',
//                 pointStrokeColor: 'rgba(60,141,188,1)',
//                 pointHighlightFill: '#fff',
//                 pointHighlightStroke: 'rgba(60,141,188,1)',
//                 data: [28, 48, 40, 50]
//             },
//             {
//                 label: 'Additional',
//                 backgroundColor: 'rgba(210, 214, 222, 1)',
//                 borderColor: 'rgba(210, 214, 222, 1)',
//                 pointRadius: false,
//                 pointColor: 'rgba(210, 214, 222, 1)',
//                 pointStrokeColor: '#c1c7d1',
//                 pointHighlightFill: '#fff',
//                 pointHighlightStroke: 'rgba(220,220,220,1)',
//                 data: [65, 59, 80, 50]
//             },
//             {
//                 label: 'MT',
//                 backgroundColor: 'rgba(210, 214, 111, 1)',
//                 borderColor: 'rgba(210, 214, 222, 1)',
//                 pointRadius: false,
//                 pointColor: 'rgba(210, 214, 222, 1)',
//                 pointStrokeColor: '#c1c7d1',
//                 pointHighlightFill: '#fff',
//                 pointHighlightStroke: 'rgba(220,220,220,1)',
//                 data: [100, 150, 60, 10]
//             },
//         ]
//     },

//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             xAxes: [{
//                 stacked: true,
//             }],
//             yAxes: [{
//                 stacked: true
//             }]
//         }
//     }
// })


