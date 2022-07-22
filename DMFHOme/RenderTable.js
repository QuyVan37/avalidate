﻿'use strict'

var table = $('#myTable').DataTable({
    paging: true,
    pageLength: 50,
    sort: false,
    scrollX: true,
    scrollY: 400,
    keys: true,
    stateSave: true,

    fixedColumns: {
        left: 4
    },

    // Thêm ID cho mỗi row
    createdRow: function (row, data, dataIndex) {
        $(row).attr('id', data.RecordID);
    },

    // Thêm Data vào bảng
    data: [],
    "columns": [
        {
            data: 'RecordID',
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    return '<input name="recordID" type="checkbox" value ="' + data + '"/>'
                }
                return data
            }
        },

        { data: 'Category' },
        { data: 'Part_No' },
        { data: 'Die_No' },
        {
            data: 'Status',
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    var txtcolor = ''
                    var bg_color = ''

                    if (data.includes('On')) {
                        txtcolor = '#006600'
                        bg_color = '#ccffcc'
                    }
                    if (data.includes('Earlier')) {
                        txtcolor = '#006600'
                        bg_color = '#ccffcc'
                    }
                    if (data.includes('Late')) {
                        txtcolor = '#808000'
                        bg_color = '#ffffb3'
                    }
                    if (data.includes('Warning')) {
                        txtcolor = '#994d00'
                        bg_color = '#ffe6cc'
                    }
                    if (data.includes('Pending')) {
                        txtcolor = '#ff0000'
                        bg_color = '#ffcccc'
                    }
                    if (data.includes('Plz')) {
                        var txtcolor = 'red'
                        var bg_color = ''
                    }

                    $(table.cell(meta.row, meta.col).node()).css({
                        'background': bg_color,
                        'color': txtcolor
                    })
                    return data = data
                }
                return data
            }
        },
        {
            data: 'Pending_Status',
            render: function (data, type, row, meta) {
                return `<button class="btn btn-info" style="min-width:150px" onclick="showDetail(${row.RecordID})">${data}</button>`
            }
        },
        { data: 'Dept_Responsibility' },
        {
            data: 'Warning',
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    return data[0]
                }
                return data
            }
        },

        { data: 'Step' },
        { data: 'Rank' },
        { data: 'Die_ID' },
        { data: 'Part_name' },
        { data: 'Process_Code' },
        { data: 'Model_Name' },
        { data: 'Supplier_Name' },
        { data: 'Supplier_Code' },
        { data: 'Texture' },
        { data: 'Decision_Date' },
        { data: 'Select_Supplier_Date' },
        { data: 'QTN_Sub_Date' },
        { data: 'QTN_App_Date' },
        { data: 'Need_Use_Date' },
        { data: 'Target_OK_Date' },
        { data: 'Inv_Idea' },
        { data: 'Inv_FB_To' },
        { data: 'Inv_Result' },
        { data: 'Inv_Cost_Down' },
        { data: 'DFM_Sub_Date' },
        { data: 'DFM_PAE_Check_Date' },
        { data: 'DFM_PE_Check_Date' },
        { data: 'DFM_PE_App_Date' },
        { data: 'DFM_PAE_App_Date' },
        { data: 'Die_Mat' },
        { data: 'Slider_Mat' },
        { data: 'Lifter_Mat' },
        { data: 'Hot_runner' },
        { data: 'Gate' },
        { data: 'MC_Size' },
        { data: 'Cav_Qty' },
        { data: 'Die_Made_Location' },
        { data: 'Die_Maker' },
        { data: 'Family_Die_With' },
        { data: 'Common_Part_With' },
        { data: 'Die_Special' },
        { data: 'DSUM_Idea' },
        { data: 'MR_Request_Date' },
        { data: 'MR_App_Date' },
        { data: 'PO_Issue_Date' },
        { data: 'PO_App_Date' },
        { data: 'Design_Check_Plan' },
        { data: 'Design_Check_Actual' },
        { data: 'Design_Check_Result' },
        { data: 'NoOfPoit_Not_FL_DMF' },
        { data: 'NoOfPoint_Not_FL_Spec' },
        { data: 'NoOfPoint_Kaizen' },
        { data: 'JIG_Using' },
        { data: 'JIG_No' },
        { data: 'JIG_Check_Plan' },
        { data: 'JIG_Check_Result' },
        { data: 'JIG_ETA_Supplier' },
        { data: 'JIG_Status' },
        { data: 'T0_Plan' },
        { data: 'T0_Actual' },
        { data: 'T0_Result' },
        { data: 'T0_Solve_Method' },
        { data: 'T0_Solve_Result' },
        { data: 'Texture_Meeting_Date' },
        { data: 'Texture_Go_Date' },
        { data: 'S0_Plan' },
        { data: 'S0_Result' },
        { data: 'S0_Solve_Method' },
        { data: 'S0_solve_Result' },
        { data: 'Texture_App_Date' },
        { data: 'Texture_Internal_App_Result' },
        { data: 'Texture_JP_HP_App_Result' },
        { data: 'Texture_Note' },
        { data: 'PreKK_Plan' },
        { data: 'PreKK_Actual' },
        { data: 'PreKK_Result' },
        { data: 'FA_Sub_Time' },
        { data: 'FA_Plan' },
        { data: 'FA_Result' },
        { data: 'FA_Result_Date' },
        { data: 'FA_Problem' },
        { data: 'FA_Action_Improve' },
        { data: 'MT1_Date' },
        { data: 'MT1_Gather_Date' },
        { data: 'MT1_Problem' },
        { data: 'MT1_Remark' },
        { data: 'MTF_Date' },
        { data: 'MTF_Gather_Date' },
        { data: 'MTF_Problem' },
        { data: 'MTF_Remark' },
        { data: 'TVP_No' },
        { data: 'ERI_No' },
        { data: 'TVP_Result_Date' },
        { data: 'TVP_Remark' },
        { data: 'PCAR_Date' },
        { data: 'PCAR_Result' },
        { data: 'First_Lot_Date' },
        { data: 'Latest_Update_By' },
        { data: 'Latest_Update_Date' },
        { data: 'His_Update' },
    ]

})
table.columns.adjust();

start()

function start() {

    renderDataRows()

}

function renderDataRows(isExport) {
    onLoading()
    getDatafromAPI2(function (data) {
        table.clear().draw()
        table.rows.add(data).draw()
        onLoaded()
        $($.fn.dataTable.tables(true)).DataTable()
            .columns.adjust();
    }, isExport)
}

function onLoading() {
    $('.main-content').LoadingOverlay("show")
}
function onLoaded() {
    $('.main-content').LoadingOverlay("hide")
}

function getDatafromAPI2(callback) {
    let search = $('#search').val();
    let following = $('#following').val();
    let category = $('#category').val();
    let FAresult = $('#FAresult').val();
    let modelID = $('#ModelID').val();
    let supplierID = $('#SupplierID').val();
    let POFrom = $('#from').val();
    let POTo = $('#to').val();
    let formData = new FormData()
    let data = {
        search: search,
        following: following,
        category: category,
        FAresult: FAresult,
        modelID: modelID,
        supplierID: supplierID,
        POFrom: POFrom,
        POTo: POTo,

    }
    //formData.append('search', search)
    //formData.append('following', following)
    //formData.append('category', category)
    //formData.append('FAresult', FAresult)
    //formData.append('modelID', modelID)
    //formData.append('supplierID', supplierID)
    //formData.append('POFrom', POFrom)
    //formData.append('POTo', POTo)
    
    //console.log(data)
    $.ajax({
        url: "http://localhost:8080/Die_Launch_Management/getRecords",
        type: 'POST',
        data: data,
        dataType : 'json',
        //processData: false,
        //contentType: false,
        success: function (data) {
            callback(data)
        }
    })
}

$('#btn_search').click(function () {
    renderDataRows("NoExport")
})

$('#btn_Export').click(function () {
    renderDataRows("Export")
})
