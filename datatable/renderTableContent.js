'use strict'

// Huong dan
// 1. Hay config lai headerConfig neu them cot => sau do config lai "columns" trong table
// 2. Thay doi lai url ajax
var headerConfig = [
    { col_index: 0, title: "RecordID", process: "Basic_Info", editable: false },
    { col_index: 1, title: "Phase", process: "Basic_Info", editable: true },
    { col_index: 2, title: "Step", process: "Basic_Info", editable: true },
    { col_index: 3, title: "Rank", process: "Basic_Info", editable: true },
    { col_index: 4, title: "Part_No", process: "Basic_Info", editable: true },
    { col_index: 5, title: "Part_Name", process: "Basic_Info", editable: true },
    { col_index: 6, title: "Process_Code", process: "Basic_Info", editable: true },
    { col_index: 7, title: "Die_No", process: "Basic_Info", editable: true },
    { col_index: 8, title: "Die_ID", process: "Basic_Info", editable: false },
    { col_index: 9, title: "Model_Name", process: "Basic_Info", editable: true },
    { col_index: 10, title: "Supplier_Code", process: "Basic_Info", editable: true },
    { col_index: 11, title: "Supplier_Name", process: "Basic_Info", editable: false },
    { col_index: 12, title: "Progress", process: "Genaral_Progress", editable: false },
    { col_index: 13, title: "Status", process: "Genaral_Progress", editable: false },
    { col_index: 14, title: "Pending_Status", process: "Genaral_Progress", editable: false },
    { col_index: 15, title: "Dept_Response", process: "Genaral_Progress", editable: false },
    { col_index: 16, title: "Warning", process: "Genaral_Progress", editable: false },
    { col_index: 17, title: "Genaral_Information", process: "Genaral_Progress", editable: true },
    { col_index: 18, title: "Decision_Date", process: "Decision", editable: true },
    { col_index: 19, title: "Select_Supplier_Date", process: "Decision", editable: true },
    { col_index: 20, title: "Target_OK_Date", process: "Decision", editable: true },
    { col_index: 21, title: "Inv_Idea", process: "DE_Inv", editable: true },
    { col_index: 22, title: "Inv_Feedback_To", process: "DE_Inv", editable: true },
    { col_index: 23, title: "Inv_Result", process: "DE_Inv", editable: true },
    { col_index: 24, title: "Inv_Cost_Down", process: "DE_Inv", editable: true },
    { col_index: 25, title: "DSUM_Date", process: "DSUM", editable: true },
    { col_index: 26, title: "DSUM_PE1_Check_Date", process: "DSUM", editable: true },
    { col_index: 27, title: "DSUM_PAE_App_Date", process: "DSUM", editable: true },
    { col_index: 28, title: "Core_Cav_Mat", process: "DSUM", editable: true },
    { col_index: 29, title: "Slider_Mat", process: "DSUM", editable: true },
    { col_index: 30, title: "Lifter_Mat", process: "DSUM", editable: true },
    { col_index: 31, title: "Texture", process: "DSUM", editable: true },
    { col_index: 32, title: "Hot_Runner", process: "DSUM", editable: true },
    { col_index: 33, title: "Gate", process: "DSUM", editable: true },
    { col_index: 34, title: "MC_Size", process: "DSUM", editable: true },
    { col_index: 35, title: "Die_Make_Location", process: "DSUM", editable: true },
    { col_index: 36, title: "Die_Maker", process: "DSUM", editable: true },
    { col_index: 37, title: "Family_Die_With", process: "DSUM", editable: true },
    { col_index: 38, title: "Common_Part_With", process: "DSUM", editable: true },
    { col_index: 39, title: "Special_Die", process: "DSUM", editable: true },
    { col_index: 40, title: "DSUM_Idea", process: "DSUM", editable: true },
    { col_index: 41, title: "DSUM_Idea_Cost_Down", process: "DSUM", editable: true },
    { col_index: 42, title: "MR_Request_Date", process: "MR_PO", editable: false },
    { col_index: 43, title: "MR_App_Date", process: "MR_PO", editable: false },
    { col_index: 44, title: "PO_Issue_Date", process: "MR_PO", editable: false },
    { col_index: 45, title: "PO_App_Date", process: "MR_PO", editable: false },
    { col_index: 46, title: "Die_Price", process: "MR_PO", editable: false },
    { col_index: 47, title: "Curency", process: "MR_PO", editable: false },
    { col_index: 48, title: "Jig_Using", process: "JIG", editable: true },
    { col_index: 49, title: "Jig_No", process: "JIG", editable: true },
    { col_index: 50, title: "Jig_Col_2", process: "JIG", editable: true },
    { col_index: 51, title: "Jig_Col_3", process: "JIG", editable: true },
    { col_index: 52, title: "Jig_Col_4", process: "JIG", editable: true },
    { col_index: 53, title: "Jig_Col_5", process: "JIG", editable: true },
    { col_index: 54, title: "T0_Plan", process: "T0", editable: true },
    { col_index: 55, title: "T0_Actual", process: "T0", editable: true },
    { col_index: 56, title: "T0_Try_Result", process: "T0", editable: true },
    { col_index: 57, title: "T0_Solving_Method", process: "T0", editable: true },
    { col_index: 58, title: "T0_Solving_Result", process: "T0", editable: true },
    { col_index: 59, title: "Tn_Try_Time", process: "T(n)", editable: true },
    { col_index: 60, title: "Tn_Plan", process: "T(n)", editable: true },
    { col_index: 61, title: "Tn_Actual", process: "T(n)", editable: true },
    { col_index: 62, title: "Tn_Try_Result", process: "T(n)", editable: true },
    { col_index: 63, title: "Tn_Solving_Method", process: "T(n)", editable: true },
    { col_index: 64, title: "Tn_Solving_Result", process: "T(n)", editable: true },
    { col_index: 65, title: "Texture_Meeting_Date", process: "Texture_S0", editable: true },
    { col_index: 66, title: "Texture_Go_Date", process: "Texture_S0", editable: true },
    { col_index: 67, title: "S0_Plan", process: "Texture_S0", editable: true },
    { col_index: 68, title: "S0_Actual", process: "Texture_S0", editable: true },
    { col_index: 69, title: "S0_Result", process: "Texture_S0", editable: true },
    { col_index: 70, title: "S0_Solving_Method", process: "Texture_S0", editable: true },
    { col_index: 71, title: "S0_Solving_Result", process: "Texture_S0", editable: true },
    { col_index: 72, title: "Sn_Try_Time", process: "Texture_S(n)", editable: true },
    { col_index: 73, title: "Sn_Plan", process: "Texture_S(n)", editable: true },
    { col_index: 74, title: "Sn_Actual", process: "Texture_S(n)", editable: true },
    { col_index: 75, title: "Sn_Result", process: "Texture_S(n)", editable: true },
    { col_index: 76, title: "Sn_Solving_Method", process: "Texture_S(n)", editable: true },
    { col_index: 77, title: "Sn_Solving_Result", process: "Texture_S(n)", editable: true },
    { col_index: 78, title: "Texture_App_Date", process: "Texture_Approve", editable: true },
    { col_index: 79, title: "Texture_Internal_App_Result", process: "Texture_Approve", editable: true },
    { col_index: 80, title: "Texture_JP_HP_App_Result", process: "Texture_Approve", editable: true },
    { col_index: 81, title: "Texture_App_Remark", process: "Texture_Approve", editable: true },
    { col_index: 82, title: "FA_Sub_Time", process: "FA_Status", editable: true },
    { col_index: 83, title: "FA_Plan", process: "FA_Status", editable: true },
    { col_index: 84, title: "FA_Actual", process: "FA_Status", editable: true },
    { col_index: 85, title: "FA_Result", process: "FA_Status", editable: true },
    { col_index: 86, title: "FA_Genaral_Inform", process: "FA_Status", editable: true },
    { col_index: 87, title: "FA_Problem", process: "FA_Status", editable: true },
    { col_index: 88, title: "Action_Improve", process: "FA_Status", editable: true },
    { col_index: 89, title: "MT1_Date", process: "MT1", editable: true },
    { col_index: 90, title: "MT1_Gather_Date", process: "MT1", editable: true },
    { col_index: 91, title: "MT1_Problem", process: "MT1", editable: true },
    { col_index: 92, title: "MT1_Solve_Method", process: "MT1", editable: true },
    { col_index: 93, title: "MT1_Solve_Result", process: "MT1", editable: true },
    { col_index: 94, title: "MT1_Remark", process: "MT1", editable: true },
    { col_index: 95, title: "MTF_Date", process: "MTF", editable: true },
    { col_index: 96, title: "MTF_Gether_Date", process: "MTF", editable: true },
    { col_index: 97, title: "MTF_Problem", process: "MTF", editable: true },
    { col_index: 98, title: "MTF_Solve_Method", process: "MTF", editable: true },
    { col_index: 99, title: "MTF_Solve_Result", process: "MTF", editable: true },
    { col_index: 100, title: "MTF_Remark", process: "MTF", editable: true },
    { col_index: 101, title: "TVP_Date", process: "TVP", editable: true },
    { col_index: 102, title: "TVP_No", process: "TVP", editable: true },
    { col_index: 103, title: "TVP_Result", process: "TVP", editable: true },
    { col_index: 104, title: "TVP_Remark", process: "TVP", editable: true },
    { col_index: 105, title: "First_Lost_Date", process: "First_Lot", editable: true },
    { col_index: 106, title: "First_Lost_Remark", process: "First_Lot", editable: true },
    { col_index: 107, title: "PAE_PIC", process: "PIC", editable: true },
    { col_index: 108, title: "PE1_PIC", process: "PIC", editable: true },
    { col_index: 109, title: "MQA_PIC", process: "PIC", editable: true },
    { col_index: 110, title: "PUR_PIC", process: "PIC", editable: true },
    { col_index: 111, title: "PDC_PIC", process: "PIC", editable: true },
    { col_index: 112, title: "Latest_Update", process: "History", editable: false },
    { col_index: 113, title: "Latest_Update_By", process: "History", editable: false },
    { col_index: 114, title: "His_Update", process: "History", editable: false },
    { col_index: 115, title: "Issue_Date", process: "History", editable: false },
    { col_index: 116, title: "Issue_By", process: "History", editable: false },

]

var table = $('#myTableEditable').DataTable({
    paging: true,
    "pageLength": 50,
    searchDelay: 1500,
    sort: false,
    scrollX: true,
    scrollY: 300,
    keys: true,
    stateSave: true,

    fixedColumns: true,
    fixedColumns: {
        left: 2
    },
    buttons: [
        {
            extend: 'colvisGroup',
            text: 'RN&AD',
            hide: [8, 22, 23, 24, 28, 29, 30, 32, 33, 39, 40, 41, 42, 43, 44, 45, 46, 47, 59, 60, 61, 62, 63, 64, 70, 71, 72, 73, 74, 75, 76, 77, 104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116],
            show: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 25, 26, 27, 31, 34, 35, 36, 37, 38, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 65, 66, 67, 68, 69, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 101, 102, 103, 105]
        },
        {
            extend: 'colvisGroup',
            text: 'MT',
            show: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 25, 26, 27, 31, 34, 35, 36, 37, 38, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 65, 66, 67, 68, 69, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
            hide: [8, 22, 23, 24, 28, 29, 30, 32, 33, 39, 40, 41, 42, 43, 44, 45, 46, 47, 59, 60, 61, 62, 63, 64, 70, 71, 72, 73, 74, 75, 76, 77, 104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116]
        },
        {
            extend: 'colvisGroup',
            text: 'Show all',
            show: ':hidden'
        },
        {
            extend: 'searchBuilder',
            text: 'Multi Search',
        },
        {
            extend: 'excel',
            title: 'Data export'
        },
        {
            extend: 'colvis',
            text: 'Hide Column',
            collectionLayout: 'fixed columns',
            collectionTitle: 'Column visibility control'
        }
    ],


    dom: 'Bfrtip',
    'createdRow': function (row, data, dataIndex) {
        $(row).attr('id', data.RecordID);
    },
    "columnDefs": [
        {
            "targets": [8, 21, 22, 23, 24, 28, 29, 30, 32, 33, 39, 40, 41, 42, 43, 44, 45, 46, 47, 59, 60, 61, 62, 63, 64, 70, 71, 72, 73, 74, 75, 76, 77, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116],
            "visible": false,
            "searchable": true
        },
        {
            "targets": headerConfig.map(x => x.col_index),
            "searchable": true,
            'type': 'filter',
        },
        {
            'targets': [1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111],
            'className': 'editable input'
        },
        {
            'targets': [9],
            'className': 'editable selectModel'
        },
        {
            'targets': [10, 11],
            'className': 'editable selectMaker'
        },
        {
            'targets': [31, 48],
            'className': 'editable selectYN'
        },
        {
            'targets': [16],
            'className': 'editable inputGenaralInfor'
        },

    ],
    data: [],
    // hay config lai khi co su thay doi
    "columns": [
        {
            data: "RecordID", title: "RecordID",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {

                    return '<input name="recordID" type="checkbox" value ="' + data + '"/>'
                }
                return data
            }
        },
        { data: "Phase", title: "Phase" },
        { data: "Step", title: "Step" },
        { data: "Rank", title: "Rank" },
        { data: "Part_No", title: "Part_No" },
        { data: "Part_Name", title: "Part_Name" },
        { data: "Process_Code", title: "Process_Code" },
        { data: "Die_No", title: "Die_No" },
        { data: "Die_ID", title: "Die_ID" },
        { data: "Model_Name", title: "Model_Name" },
        { data: "Supplier_Code", title: "Supplier_Code" },
        { data: "Supplier_Name", title: "Supplier_Name" },
        {
            data: "Progress", title: "Progress",
            render: function (data, type, row, meta) {
                if (type === 'display') {
                    var progress = getProgress(row)
                    return '<progress value="' + progress + '" max="100"></progress>'
                }
                return data
            }
        },
        {
            data: "Status", title: "Status",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    content = ''
                    var txtcolor = ''
                    var bg_color = ''
                    var target_OK_Date = new Date(Date.parse(moment(row.Target_OK_Date).format()))


                    var resultFA = row.FA_Result
                    var resultFADate = new Date(Date.parse(moment(row.FA_Actual).format()))
                    if (resultFA == "OK" || resultFA == "RS" || resultFA == "WMT") {
                        if (row.Target_OK_Date && row.FA_Actual) {
                            if (target_OK_Date.getTime() === resultFADate.getTime()) {
                                content = "On Time";
                                txtcolor = '#006600'
                                bg_color = '#ccffcc'
                            }
                            if (target_OK_Date > resultFADate) {
                                content = "Earlier";
                                txtcolor = '#006600'
                                bg_color = '#ccffcc'
                            }
                            if (target_OK_Date < resultFADate) {
                                content = "Late";
                                txtcolor = '#808000'
                                bg_color = '#ffffb3'
                            }
                        } else {
                            if (!row.Target_OK_Date) {
                                var content = "Let's Input Target OK Date"
                                var txtcolor = '#fff'
                                var bg_color = '#ff0000'
                            }
                            if (!row.FA_Actual) {
                                var content = "Let's Input FA Actual Date"
                                var txtcolor = '#fff'
                                var bg_color = '#ff0000'
                            }
                        }
                    } else { // FA NG hoac chua co ket qua, chua co FA
                        var date = new Date()
                        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
                        var _10dayslater = new Date(new Date(today).setDate(today.getDate() + 10))

                        if (row.Target_OK_Date) {

                            if (target_OK_Date >= today && target_OK_Date <= _10dayslater) {
                                content = "Warning(" + Math.floor((target_OK_Date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + " days left)";
                                txtcolor = '#994d00'
                                bg_color = '#ffe6cc'
                            }
                            if (target_OK_Date < today) {
                                content = "Pending(" + Math.floor((today.getTime() - target_OK_Date.getTime()) / (1000 * 60 * 60 * 24)) + " days)";
                                txtcolor = '#ff0000'
                                bg_color = '#ffcccc'
                            }
                            if (target_OK_Date > _10dayslater) {
                                content = "On Progress";
                                txtcolor = '#006600'
                                bg_color = '#ccffcc'
                            }
                        } else {
                            var content = "Let's Input Target OK Date"
                            var txtcolor = 'red'
                            var bg_color = ''
                        }

                    }

                    $(table.cell(meta.row, meta.col).node()).css({
                        'background': bg_color,
                        'color': txtcolor
                    })
                    return data = content
                }
                return data
            }
        },
        {
            data: "Pending_Status", title: "Pending_Status",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    var pending = showPending(row)

                    $(table.cell(meta.row, meta.col).node()).css({
                        'color': '#000080',
                        'font-weight': '500'
                    })
                    return data = pending.status
                }
                return data
            }
        },
        {
            data: "Dept_Response", title: "Dept_Response",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    var pending = showPending(row)
                    $(table.cell(meta.row, meta.col).node()).css({
                        'color': '#000080',
                        'font-weight': '500'
                    })
                    return data = pending.dept
                }
                return data
            }
        },

        {
            data: "Warning", title: "Warning",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    var pending = showPending(row)
                    $(table.cell(meta.row, meta.col).node()).css({
                        'color': '#ff4d4d',
                        'font-weight': '400'
                    })
                    return data = pending.warning
                }
                return data
            }
        },
        {
            data: "Genaral_Information", title: "Genaral_Information",
            render: function (data, type, row, meta) {
                if (type) {
                    $(table.cell(meta.row, meta.col).node()).css({
                        'max-width': '250px',
                        'overflow': 'hidden'
                    })
                }
                return data
            }

        },
        { data: "Decision_Date", title: "Decision_Date" },
        {
            data: "Select_Supplier_Date", title: "Select_Supplier_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },

        {
            data: "Target_OK_Date", title: "Target_OK_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "Inv_Idea", title: "Inv_Idea" },
        { data: "Inv_Feedback_To", title: "Inv_Feedback_To" },
        { data: "Inv_Result", title: "Inv_Result" },
        { data: "Inv_Cost_Down", title: "Inv_Cost_Down" },
        {
            data: "DSUM_Date", title: "DSUM_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "DSUM_PE1_Check_Date", title: "DSUM_PE1_Check_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "DSUM_PAE_App_Date", title: "DSUM_PAE_App_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "Core_Cav_Mat", title: "Core_Cav_Mat" },
        { data: "Slider_Mat", title: "Slider_Mat" },
        { data: "Lifter_Mat", title: "Lifter_Mat" },
        { data: "Texture", title: "Texture" },
        { data: "Hot_Runner", title: "Hot_Runner" },
        { data: "Gate", title: "Gate" },
        { data: "MC_Size", title: "MC_Size" },
        { data: "Die_Make_Location", title: "Die_Make_Location" },
        { data: "Die_Maker", title: "Die_Maker" },
        { data: "Family_Die_With", title: "Family_Die_With" },
        { data: "Common_Part_With", title: "Common_Part_With" },
        { data: "Special_Die", title: "Special_Die" },
        { data: "DSUM_Idea", title: "DSUM_Idea" },
        { data: "DSUM_Idea_Cost_Down", title: "DSUM_Idea_Cost_Down" },
        {
            data: "MR_Request_Date", title: "MR_Request_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "MR_App_Date", title: "MR_App_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "PO_Issue_Date", title: "PO_Issue_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "PO_App_Date", title: "PO_App_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "Die_Price", title: "Die_Price" },
        { data: "Curency", title: "Curency" },
        { data: "Jig_Using", title: "Jig_Using" },
        { data: "Jig_No", title: "Jig_No" },
        { data: "Jig_Col_2", title: "Jig_Col_2" },
        { data: "Jig_Col_3", title: "Jig_Col_3" },
        { data: "Jig_Col_4", title: "Jig_Col_4" },
        { data: "Jig_Col_5", title: "Jig_Col_5" },
        {
            data: "T0_Plan", title: "T0_Plan",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "T0_Actual", title: "T0_Actual",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "T0_Try_Result", title: "T0_Try_Result" },
        { data: "T0_Solving_Method", title: "T0_Solving_Method" },
        { data: "T0_Solving_Result", title: "T0_Solving_Result" },
        { data: "Tn_Try_Time", title: "Tn_Try_Time" },
        {
            data: "Tn_Plan", title: "Tn_Plan",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "Tn_Actual", title: "Tn_Actual",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "Tn_Try_Result", title: "Tn_Try_Result" },
        { data: "Tn_Solving_Method", title: "Tn_Solving_Method" },
        { data: "Tn_Solving_Result", title: "Tn_Solving_Result" },
        {
            data: "Texture_Meeting_Date", title: "Texture_Meeting_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "Texture_Go_Date", title: "Texture_Go_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "S0_Plan", title: "S0_Plan",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "S0_Actual", title: "S0_Actual",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "S0_Result", title: "S0_Result" },
        { data: "S0_Solving_Method", title: "S0_Solving_Method" },
        { data: "S0_Solving_Result", title: "S0_Solving_Result" },
        { data: "Sn_Try_Time", title: "Sn_Try_Time" },
        {
            data: "Sn_Plan", title: "Sn_Plan",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "Sn_Actual", title: "Sn_Actual",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "Sn_Result", title: "Sn_Result" },
        { data: "Sn_Solving_Method", title: "Sn_Solving_Method" },
        { data: "Sn_Solving_Result", title: "Sn_Solving_Result" },
        {
            data: "Texture_App_Date", title: "Texture_App_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "Texture_Internal_App_Result", title: "Texture_Internal_App_Result" },
        { data: "Texture_JP_HP_App_Result", title: "Texture_JP_HP_App_Result" },
        { data: "Texture_App_Remark", title: "Texture_App_Remark" },
        { data: "FA_Sub_Time", title: "FA_Sub_Time" },
        {
            data: "FA_Plan", title: "FA_Plan",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "FA_Actual", title: "FA_Actual",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "FA_Result", title: "FA_Result" },
        { data: "FA_Genaral_Inform", title: "FA_Genaral_Inform" },
        { data: "FA_Problem", title: "FA_Problem" },
        { data: "Action_Improve", title: "Action_Improve" },
        {
            data: "MT1_Date", title: "MT1_Date", render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "MT1_Gather_Date", title: "MT1_Gather_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "MT1_Problem", title: "MT1_Problem" },
        { data: "MT1_Solve_Method", title: "MT1_Solve_Method" },
        { data: "MT1_Solve_Result", title: "MT1_Solve_Result" },
        { data: "MT1_Remark", title: "MT1_Remark" },
        {
            data: "MTF_Date", title: "MTF_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        {
            data: "MTF_Gether_Date", title: "MTF_Gether_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "MTF_Problem", title: "MTF_Problem" },
        { data: "MTF_Solve_Method", title: "MTF_Solve_Method" },
        { data: "MTF_Solve_Result", title: "MTF_Solve_Result" },
        { data: "MTF_Remark", title: "MTF_Remark" },
        {
            data: "TVP_Date", title: "TVP_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "TVP_No", title: "TVP_No" },
        { data: "TVP_Result", title: "TVP_Result" },
        { data: "TVP_Remark", title: "TVP_Remark" },
        {
            data: "First_Lost_Date", title: "First_Lost_Date",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "First_Lost_Remark", title: "First_Lost_Remark" },
        { data: "PAE_PIC", title: "PAE_PIC" },
        { data: "PE1_PIC", title: "PE1_PIC" },
        { data: "MQA_PIC", title: "MQA_PIC" },
        { data: "PUR_PIC", title: "PUR_PIC" },
        { data: "PDC_PIC", title: "PDC_PIC" },
        {
            data: "Latest_Update", title: "Latest_Update",
            render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "Latest_Update_By", title: "Latest_Update_By" },
        { data: "His_Update", title: "His_Update" },
        {
            data: "Issue_Date", title: "Issue_Date", render: function (data, type, row, meta) {
                if (type === 'display' || type === 'filter') {
                    if (data) {
                        data = moment(data).format('YYYY-MM-DD')
                    }

                    return data
                }
                return data
            }
        },
        { data: "Issue_By", title: "Issue_By" },
    ]
})
table.columns.adjust();


start()
// Khi close modal thi chay doan ma
$('#showColumn').on('hidden.bs.modal', function (e) {
    getAllColIndexNeedShowAndHandelView()
})

function start() {

    renderDataRows()

}


function getHideColFromLocalStorage() {
    var result = []
    try {
        var cols = JSON.parse(localStorage.getItem('showColumn'))
        // TAM THOI
        cols = cols.slice(0, 21)
        //*
        var colsNeedShow = cols.filter(function (x) {
            return x.isShow == false
        })
        colsNeedShow.map(function (x) {
            result.push(parseInt(x.col_index))
        })
    } catch (e) {
        //
    }

    return result;
}

// function getDataFromAPI(callback) {
//     var url = 'http://localhost:8080/Die_Launching_Control/getRecord'
//     fetch(url)
//         .then(function (response) {
//             console.log(response.status)
//             return response.json()
//         })
//         .then(callback)
// }
function getDatafromAPI2(callback) {
    $.ajax({
        url: "http://localhost:8080/Die_Launching_Control/getRecord",
        type: 'get',
        dataType: 'json',
        success: function (data) {
            callback(data)
        }
    })
}

function renderDataRows() {
    onLoading()
    getDatafromAPI2(function (data) {

        table.rows.add(data).draw()
        onLoaded()
        $($.fn.dataTable.tables(true)).DataTable()
            .columns.adjust();
    })

}

function onLoading() {

    $('#myTableEditable thead').after('<div class="loading"> <div class="loader"></div></div>')

    $('.loading').css({
        'background-color': 'grey',
        'display': 'flex',
        'width': '100vw',
        'height': '50vh',
        'padding-top': '50px',
        'position': 'absolute',
        'justify-content': 'center',
        'opacity': '0.7'
    })
    $('#myTableEditable tbody').hide()
}
function onLoaded() {
    $('.loading').hide()
    $('#myTableEditable tbody').show();
}

function showPending(rowData) {
    var date = new Date()
    var today = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    var dataShow = {
        status: '',
        dept: '',
        warning: '',
    }
    if (!rowData.Decision_Date) {
        dataShow.status = 'W-Desicion'
        dataShow.dept = 'PAE'
        dataShow.warning = 'Lets confirm date decided make RN&AD'
        return dataShow
    }
    if (!rowData.Select_Supplier_Date) {
        dataShow.status = 'W-Select_Supplier'
        dataShow.dept = 'PUS'
        dataShow.warning = 'Lets confirm final select supplier'
        return dataShow
    }
    if (!rowData.Inv_Idea) {
        dataShow.status = 'W-DE/Inv'
        dataShow.dept = 'PAE'
        dataShow.warning = 'Lets input idea for QCD, if no input (-)'
        return dataShow
    }
    if (!rowData.DSUM_Date) {
        dataShow.status = 'W-PAE-Check-DFM'
        dataShow.dept = 'PAE'
        dataShow.warning = 'Lets get DFM from supplier and Check'
        return dataShow
    }
    if (!rowData.DSUM_PE1_Check_Date) {
        dataShow.status = 'W-PE1-Check-DFM'
        dataShow.dept = 'PE1'
        dataShow.warning = 'PE is keeping DFM ' + Math.floor((today.getTime() - new Date(Date.parse(moment(rowData.DSUM_Date).format())).getTime()) / (24 * 60 * 60 * 1000)) + ' days'
        return dataShow
    }
    if (!rowData.DSUM_PAE_App_Date) {
        dataShow.status = 'W-PAE-App-DFM'
        dataShow.dept = 'PAE'
        dataShow.warning = 'PAE is keeping DFM ' + Math.floor((today.getTime() - new Date(Date.parse(moment(rowData.DSUM_PE1_Check_Date).format())).getTime()) / (24 * 60 * 60 * 1000)) + ' days'
        return dataShow
    }
    if (!rowData.MR_Request_Date) {
        dataShow.status = 'W-MR-Issue'
        dataShow.dept = 'PUR'
        dataShow.warning = 'Lets cf buyer issue MR'
        return dataShow
    }
    if (!rowData.MR_App_Date) {
        dataShow.status = 'W-MR-App'
        dataShow.dept = 'PAE'
        dataShow.warning = 'Lets cf PAE App MR'
        return dataShow
    }
    if (!rowData.PO_Issue_Date) {
        dataShow.status = 'W-PO-Issue'
        dataShow.dept = 'PUR'
        dataShow.warning = 'Lets cf PUR Issue PO'
        return dataShow
    }
    if (!rowData.PO_App_Date) {
        dataShow.status = 'W-PO-App'
        dataShow.dept = 'PUR'
        dataShow.warning = 'Lets cf PUR App PO'
        return dataShow
    }
    if (!rowData.T0_Plan) { // Chưa có T0 Plan.
        dataShow.status = 'W-T0_Plan'
        dataShow.dept = 'PUR'
        dataShow.warning = 'Lets cf supplier T0'
        return dataShow
    }
    if (rowData.T0_Plan) { // đã có T0 Plan.
        var plan = new Date(Date.parse(moment(rowData.T0_Plan).format()))
        if (plan > today) { // Chừa đến Plan
            dataShow.status = 'W-T0-Trial'
            dataShow.dept = 'Supplier'
            dataShow.warning = ''
            return dataShow
        } else { // đã qua kế hoặc T0 rồi mà chưa có check TO
            if (rowData.T0_Actual || rowData.T0_Try_Result) { // đã nhập thông tin To actual || Result
                if (!rowData.FA_Plan) { // Chưa có FA Plan
                    dataShow.status = 'W-FA-Plan'
                    dataShow.dept = 'PUR'
                    dataShow.warning = 'Lets cf supplier FA plan'
                    return dataShow
                } else { // Đã có FA PLAN
                    var FA_Plan = new Date(Date.parse(moment(rowData.FA_Plan).format()))
                    if (FA_Plan > today) { // Chưa đến ngày Plan
                        if (!rowData.FA_Actual) { // chưa có actual FA 
                            if (!rowData.FA_Result) { // Chua co Result
                                dataShow.status = 'W-FA-Submit'
                                dataShow.dept = 'Supplier'
                                dataShow.warning = ''
                                return dataShow
                            } else {// đã có Result
                                if (rowData.FA_Result === 'OK' || rowData.FA_Result === 'RS' || rowData.FA_Result === 'WMT') { // FA OK
                                    dataShow.status = 'Done FA'
                                    dataShow.dept = '-'
                                    dataShow.warning = '-'
                                    return dataShow
                                } else {
                                    if (rowData.FA_Result === 'NG' || rowData.FA_Result === 'NGA' || rowData.FA_Result === 'NGB') { // FA NG
                                        if (!rowData.Action_Improve) { // PAE chua cf repair
                                            dataShow.status = 'W-PAE-CF-Repair'
                                            dataShow.dept = 'PAE'
                                            dataShow.warning = 'Lets check FA and Instruct repair'
                                            return dataShow
                                        } else { //PAE đã cf repair
                                            dataShow.status = 'W-FA-ReSubmit'
                                            dataShow.dept = 'Supplier'
                                            dataShow.warning = '-'
                                            return dataShow
                                        }
                                    } else { // Dang danh gia FA
                                        dataShow.status = 'W-FA-Result'
                                        dataShow.dept = '-'
                                        dataShow.warning = '-'
                                        return dataShow
                                    }
                                }
                            }
                        } else { // ĐÃ có actual FA 
                            if (!rowData.FA_Result) { // chưa có FA result
                                dataShow.status = 'W-FA-Result'
                                dataShow.dept = 'PUR'
                                dataShow.warning = 'Lets cf who keeping FA'
                                return dataShow
                            } else { // Đã có FA Result
                                if (rowData.FA_Result === 'OK' || rowData.FA_Result === 'RS' || rowData.FA_Result === 'WMT') { // FA OK
                                    dataShow.status = 'Done FA'
                                    dataShow.dept = '-'
                                    dataShow.warning = '-'
                                    return dataShow
                                } else {
                                    if (rowData.FA_Result === 'NG' || rowData.FA_Result === 'NGA' || rowData.FA_Result === 'NGB') { // FA NG
                                        if (!rowData.Action_Improve) { // PAE chua cf repair
                                            dataShow.status = 'W-PAE-CF-Repair'
                                            dataShow.dept = 'PAE'
                                            dataShow.warning = 'Lets check FA and Instruct repair'
                                            return dataShow
                                        } else { //PAE đã cf repair
                                            dataShow.status = 'W-FA-ReSubmit'
                                            dataShow.dept = 'Supplier'
                                            dataShow.warning = '-'
                                            return dataShow
                                        }
                                    } else { // Dang danh gia FA
                                        dataShow.status = 'W-FA-Result'
                                        dataShow.dept = '-'
                                        dataShow.warning = '-'
                                        return dataShow
                                    }
                                }
                            }
                        }
                    } else { // đã đến|| Qua Plan FA 
                        if (!rowData.FA_Actual) { // chưa có FA Actual 
                            if (!rowData.FA_Result) { // chua có FA result 
                                dataShow.status = 'W-CF-FA-Submit'
                                dataShow.dept = 'PUR'
                                dataShow.warning = 'Reach Plan FA already'
                                return dataShow
                            } else { // đã có FA result
                                if (rowData.FA_Result === 'OK' || rowData.FA_Result === 'RS' || rowData.FA_Result === 'WMT') { // FA OK
                                    dataShow.status = 'Done FA'
                                    dataShow.dept = '-'
                                    dataShow.warning = '-'
                                    return dataShow

                                } else {
                                    if (rowData.FA_Result === 'NG' || rowData.FA_Result === 'NGA' || rowData.FA_Result === 'NGB') { // FA NG
                                        if (!rowData.Action_Improve) { // PAE chua cf repair
                                            dataShow.status = 'W-PAE-CF-Repair'
                                            dataShow.dept = 'PAE'
                                            dataShow.warning = 'Lets check FA and Instruct repair'
                                            return dataShow
                                        } else { //PAE đã cf repair
                                            dataShow.status = 'W-CF-FA-Submit'
                                            dataShow.dept = 'PUR'
                                            dataShow.warning = 'Lets cf & input FA Actual Date'
                                            return dataShow
                                        }
                                    } else { // Dang danh gia FA
                                        dataShow.status = 'W-FA-Result'
                                        dataShow.dept = '-'
                                        dataShow.warning = '-'
                                        return dataShow
                                    }
                                }
                            }

                        } else { // đã có FA Actual 
                            if (!rowData.FA_Result) { // chưa có FA result
                                dataShow.status = 'W-FA-Result'
                                dataShow.dept = 'PUR'
                                dataShow.warning = 'Lets cf who keeping FA'
                                return dataShow
                            } else { // Đã có FA Result
                                if (rowData.FA_Result === 'OK' || rowData.FA_Result === 'RS' || rowData.FA_Result === 'WMT') { // FA OK
                                    dataShow.status = 'Done FA'
                                    dataShow.dept = '-'
                                    dataShow.warning = '-'
                                    return dataShow
                                } else {
                                    if (rowData.FA_Result === 'NG' || rowData.FA_Result === 'NGA' || rowData.FA_Result === 'NGB') { // FA NG
                                        if (!rowData.Action_Improve) { // PAE chua cf repair
                                            dataShow.status = 'W-PAE-CF-Repair'
                                            dataShow.dept = 'PAE'
                                            dataShow.warning = 'Lets check FA and Instruct repair'
                                            return dataShow
                                        } else { //PAE đã cf repair
                                            dataShow.status = 'W-FA-Plan'
                                            dataShow.dept = 'PUR'
                                            dataShow.warning = 'Lets cf next FA plan'
                                            return dataShow
                                        }
                                    } else { // Dang danh gia FA
                                        dataShow.status = 'W-FA-Result'
                                        dataShow.dept = '-'
                                        dataShow.warning = 'Lets cf who keeping FA'
                                        return dataShow
                                    }
                                }
                            }
                        }
                    }

                }
            } else {  // Chưa  nhập thông tin To actual || Result
                dataShow.status = 'W-CF-T0-Trial-Result'
                dataShow.dept = 'PAE'
                dataShow.warning = 'Reach TO plan already'
                return dataShow
            }
        }
    }
}

function getProgress(rowData) {
    var totalScore = 15
    var progressCcore = 0
    if (rowData.Texture) {
        totalScore = totalScore - 2
    }
    if (rowData.Phase == 'MT') {
        totalScore = totalScore - 2
    }
    if (rowData.Decision_Date) {
        progressCcore += 1
    }
    if (rowData.Inv_Idea) {
        progressCcore += 1
    }
    if (rowData.DSUM_Date) {
        progressCcore += 1
    }
    if (rowData.DSUM_PE1_Check_Date) {
        progressCcore += 1
    }
    if (rowData.DSUM_PAE_App_Date) {
        progressCcore += 1
    }
    if (rowData.MR_App_Date) {
        progressCcore += 1
    }
    if (rowData.MR_App_Date) {
        progressCcore += 1
    }
    if (rowData.Jig_Using) {
        progressCcore += 1
    }
    if (rowData.T0_Actual || rowData.T0_Try_Result) {
        progressCcore += 1
    }
    if (rowData.Texture && (rowData.S0_Actual || rowData.S0_Result)) {
        progressCcore += 1
    }
    if (rowData.Texture && (rowData.Texture_App_Date || rowData.Texture_JP_HP_App_Result)) {
        progressCcore += 1
    }
    if (rowData.FA_Actual) {
        progressCcore += 1
    }
    if (rowData.FA_Result == 'OK' || rowData.FA_Result == 'RS') {
        progressCcore += 1
    }
    if (rowData.Phase != "MT" && (rowData.TVP_No || rowData.TVP_Date || rowData.TVP_Result)) {
        progressCcore += 1
    }
    if (rowData.Phase != "MT" && (rowData.First_Lost_Date || rowData.First_Lost_Remark)) {
        progressCcore += 1
    }
    return Math.round(progressCcore / totalScore * 100)
}

//*************************************************** */
//*************************************************** */
//*************************************************** */
//********* */ For Edit table************************ */
// plug in lay column tile
$.fn.dataTable.Api.register('column().title()', function () {
    var colheader = this.header();
    return $(colheader).text().trim();
});
//************************************************** */
// Nguyên lí: 
// 1. Nếu focus cell có hasClass = '.editable'
// => thì lặp qua các editor
// 2. Nếu cell nào có hasSelector là editor.selector thì chạy editor đớ


function TableEditor(options) {
    let AllEditorConfig = options.editor // trả về mảng các editor config
    let oldValue
    let newValue
    // Gọi hàm editor khi table focus
    table
        .on('key-focus', function (e, datatable, cell) {
            var cellElement = cell.node();
            oldValue = $(cellElement).text().trim()

            if ($(cellElement).hasClass('editable')) {
                AllEditorConfig.forEach(editor => {
                    if ($(cellElement).hasClass(editor.config.selectorClass)) {
                        editor.addEditorElement(editor.config, cell)
                    }
                });
            }
        })

        .on('key-blur', function (e, datatable, cell) {
            //1. Kiểm tra có cell có class 'editable' hay ko?
            //2. Nếu có Editable và có thẻ input thì đóng thẻ input => lấy new data ở thẻ input vào cell
            //3. nếu new data khác old data thì gửi lên server để luu lại
            var cellElement = cell.node()
            var isEditable = $(cellElement).hasClass('editable')
            var isInputElement = $(cellElement).has('input[id=jsCellFocus]').length
            var isSelectElement = $(cellElement).has('select[id=jsCellFocus]').length
            var isTextareaElement = $(cellElement).has('textarea[id=jsCellFocus]').length
            if (isEditable && isInputElement) {
                var data = getNewData(cellElement)
                newValue = data.newValue
                if (newValue != oldValue) {
                    updateData(data)
                }
            }
            if (isEditable && isSelectElement) {
                var data = getNewData(cellElement)
                newValue = data.newValueShow
                if (newValue != oldValue) {
                    updateData(data)
                }
            }
            if (isEditable && isTextareaElement) {
                var data = getNewData(cellElement)
                newValue = data.newValueShow
                if (newValue != oldValue) {
                    updateData(data)
                }
            }
        })
}


function getNewData(tdElement) {
    //1. Kiem tra co input ko?
    var isInput = $(tdElement).find('input').length;
    var isSelect = $(tdElement).find('select').length;
    var isTextarea = $(tdElement).find('textarea').length;
    var trparent = $(tdElement).parent();
    var name = $(tdElement).find('#jsCellFocus').attr('name')
    var recordID = $(trparent).attr('id')
    var newValueShow
    var newValue
    if (isInput) {
        newValue = $(tdElement).find('input').val().trim()
        newValueShow = newValue
    }
    if (isSelect) {
        newValue = $(tdElement).find('select option:selected').val().trim()
        newValueShow = $(tdElement).find('select option:selected').text().trim()
    }
    console.log('isTextarea', isTextarea)
    if (isTextarea) {
        var currentValue = $(tdElement).find('textarea[disabled]').val().trim()
        newValue = $(tdElement).find('textarea[id=jsCellFocus]').val().trim()
        newValueShow = newValue.trim().length > 0 ? newValue + '\n' + currentValue : currentValue
    }
    $(tdElement).html(newValueShow).css({
        'background': 'transparent',
        'outline': 'none'
    })
    var data = {
        recordID: recordID,
        name: name,
        newValue: newValue,
        newValueShow: newValueShow
    }
    return data;
}

function updateData(data) {

    console.log('Update data', data)
}


TableEditor.isInput = function (config) {
    return {
        config: config,
        addEditorElement: function (config, cell) {
            var cellElement = cell.node()
            var name = table.column(cell.index().column).title()
            var value = cellElement.textContent.trim()
            var className = config.className ? config.className : "";
            $(cellElement).html("<input name ='" + name + "' value = '" + value + "' style ='width: " + cellElement.offsetWidth + "px; height :" + (cellElement.offsetHeight) + "px' id='jsCellFocus' class='" + className + "'/>")
                .css({
                    'padding': 0,
                    'outline': '1px solid #ac1212',
                    'outline-offset': '-3px',
                    'background-color': '#f8e6e6 !important',
                    'box-shadow': 'none'
                })
            $('#jsCellFocus').css({
                'background': 'transparent',
                'border': '0px solid transparent',
                'outline': 'none'
            }).select()

        }
    }
}

TableEditor.isSelection = function (config) {
    return {
        config: config,
        addEditorElement: function (config, cell) {
            var cellElement = cell.node()
            var name = table.column(cell.index().column).title()
            var value = cellElement.textContent.trim()
            var className = config.className ? config.className : "";
            var contentSelect = ''
            config.selectOptions.forEach(option => {
                var isSelected = option.show == value ? "selected" : ""
                contentSelect += `<option value="${option.value}" ${isSelected}>${option.show}</option>`
            })
            $(cellElement).html(`
                <select name ="${name}" class="${className}" id="jsCellFocus">
                    <option>...</option>
                    ${contentSelect}
                </select>
            `)
                .css({
                    'padding': 0,
                    'outline': '1px solid #ac1212',
                    'outline-offset': '-3px',
                    'background-color': '#f8e6e6 !important',
                    'box-shadow': 'none'
                })
        }
    }
}
TableEditor.isArea = function (config) {
    return {
        config: config,
        addEditorElement: function (config, cell) {
            var cellElement = cell.node()
            var name = table.column(cell.index().column).title()
            var value = cellElement.textContent
            var className = config.className ? config.className : "";

            $(cellElement).html(
                `
                <div>
                    <textarea name="${name}" class="form-control ${className}" id="jsCellFocus" placeholder="New Information" rows="1"></textarea>
                    <hr>
                    <textarea disabled class="form-control ${className}" rows="3">${value}</textarea>
                </div>
                
                `
            )
            $('#jsCellFocus').select()
        }
    }
}





TableEditor({
    table: '#myTableEditable',

    editor: [
        TableEditor.isInput({
            selectorClass: 'input',
            className: 'datepicker',
        }),

        TableEditor.isSelection({
            selectorClass: 'selectMaker',
            className: 'jsSelect2',
            selectOptions: [
                {
                    value: 1,
                    show: 'V008FFFFFFFFFFFFFFFFF'
                },
                {
                    value: 2,
                    show: 'TABT'
                },
                {
                    value: 3,
                    show: 'N278FFFFFFFFFFFFFFFFF'
                },
                {
                    value: 4,
                    show: 'SACQFFFFFFFFFFFFFFFFF'
                },
            ]
        }),
        TableEditor.isSelection({
            selectorClass: 'selectYN',
            className: 'jsSelect2',
            selectOptions: [
                {
                    value: 0,
                    show: 'No'
                },
                {
                    value: 1,
                    show: 'Yes'
                },
            ]
        }),
        TableEditor.isSelection({
            selectorClass: 'selectModel',
            className: 'jsSelect2',
            selectOptions: [
                {
                    value: 1,
                    show: 'L1197'
                },
                {
                    value: 2,
                    show: 'L1235'
                },
            ]
        }),
        TableEditor.isArea({
            selectorClass: 'inputGenaralInfor',
            className: '',
        }),
    ]
})


















// table
//     .on('key', function (e, datatable, key, cell, originalEvent) {
//         //1. neu key = 13 (enter) => Move down
//         if (key == 13) {
//             table.keys.move('down');
//         }

//     })
//     .on('key-focus', function (e, datatable, cell) {
//         //1. Kiem tra co the select ko? & co thuoc tinh editable = true ko?
//         var cellElement = cell.node();
//         isSelect = $(cell.node()).find('select').length
//         isInput = $(cell.node()).find('input[name]').length
//         isEditableCell = $(cellElement).attr('isEditable').trim().toLowerCase() == "true"


//         //1.1 Neu co the select va isEditable= true
//         if (isSelect && isEditableCell) {
//             oldValue = $(cellElement).find('select option:selected').val().trim();
//             $(cell.node()).find('select').prop('disabled', false);
//         }

//         //1.2 Neu co the input
//         if (isInput && isEditableCell) {
//             var inputElement = $(cellElement).find('input[name]').prop('disabled', false);
//             oldValue = inputElement.val().trim();
//             //select va focus vao the input
//             inputElement.select().focus()
//         }

//     })
//     .on('key-blur', function (e, datatable, cell) {
//         //1. Kien tra Value co bi thay doi ko?
//         // Neu co => Update lai du lieu
//         //1.1 Neu co the select va isEditable= true
//         var cellElement = $(cell.node())
//         var recordID = $(cell.node()).parent().attr('id') // <td name = ...>

//         if (isSelect && isEditableCell) {
//             newValue = $(cellElement).find('select option:selected').val().trim();
//             var name = $(cellElement).find('select').attr('name')
//             if (newValue != oldValue) {
//                 updateData(
//                     {
//                         recordID: recordID,
//                         name: name,
//                         value: newValue
//                     }
//                 )
//             }
//         }

//         //1.2 Neu co the input
//         if (isInput && isEditableCell) {
//             var inputElement = $(cell.node()).find('input[name]')
//             var name = $(inputElement).attr('name')
//             $(inputElement).blur()
//             $(inputElement).prop('disabled', true);


//             newValue = $(cellElement).find('input[name]').val().trim();
//             if (newValue != oldValue) {
//                 updateData(
//                     {
//                         recordID: recordID,
//                         name: name,
//                         value: newValue
//                     }
//                 )
//             }
//         }
//     })

