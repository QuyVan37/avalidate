'use strict'
/*$('#modalShowDetail').modal('show')*/

'use strict'

var inputFields = [
    { name: 'Step', Process: 'Basic_Info', type: 'text' },
    { name: 'Rank', Process: 'Basic_Info', type: 'text' },
    { name: 'Part_No', Process: 'Basic_Info', type: 'text' },
    { name: 'Part_name', Process: 'Basic_Info', type: 'text' },
    { name: 'Process_Code', Process: 'Basic_Info', type: 'text' },
    { name: 'Die_No', Process: 'Basic_Info', type: 'text' },
    { name: 'Die_ID', Process: 'Basic_Info', type: 'disable' },
    { name: 'Model_Name', Process: 'Basic_Info', type: 'List_Model' },
    { name: 'Supplier_Name', Process: 'Basic_Info', type: 'List_Supplier' },
    { name: 'Supplier_Code', Process: 'Basic_Info', type: 'disable' },
    { name: 'Texture', Process: 'Texture', type: 'bool' },
    { name: 'Decision_Date', Process: 'Decision', type: 'date' },
    { name: 'Select_Supplier_Date', Process: 'Decision', type: 'date' },
    { name: 'QTN_Sub_Date', Process: 'Decision', type: 'date' },
    { name: 'QTN_App_Date', Process: 'Decision', type: 'date' },
    { name: 'Need_Use_Date', Process: 'Decision', type: 'date' },
    { name: 'Target_OK_Date', Process: 'Decision', type: 'date' },
    { name: 'Inv_Idea', Process: 'DSUM', type: 'text' },
    { name: 'Inv_FB_To', Process: 'DSUM', type: 'text' },
    { name: 'Inv_Result', Process: 'DSUM', type: 'text' },
    { name: 'Inv_Cost_Down', Process: 'DSUM', type: 'text' },
    { name: 'DFM_Sub_Date', Process: 'DSUM', type: 'date' },
    { name: 'DFM_PAE_Check_Date', Process: 'DSUM', type: 'date' },
    { name: 'DFM_PE_Check_Date', Process: 'DSUM', type: 'date' },
    { name: 'DFM_PE_App_Date', Process: 'DSUM', type: 'date' },
    { name: 'DFM_PAE_App_Date', Process: 'DSUM', type: 'date' },
    { name: 'Die_Mat', Process: 'DSUM', type: 'text' },
    { name: 'Slider_Mat', Process: 'DSUM', type: 'text' },
    { name: 'Lifter_Mat', Process: 'DSUM', type: 'text' },
    { name: 'Hot_runner', Process: 'DSUM', type: 'text' },
    { name: 'Gate', Process: 'DSUM', type: 'text' },
    { name: 'MC_Size', Process: 'DSUM', type: 'int' },
    { name: 'Cav_Qty', Process: 'DSUM', type: 'int' },
    { name: 'Die_Made_Location', Process: 'DSUM', type: 'text' },
    { name: 'Die_Maker', Process: 'DSUM', type: 'text' },
    { name: 'Family_Die_With', Process: 'DSUM', type: 'text' },
    { name: 'Common_Part_With', Process: 'DSUM', type: 'text' },
    { name: 'Die_Special', Process: 'DSUM', type: 'text' },
    { name: 'DSUM_Idea', Process: 'DSUM', type: 'text' },
    { name: 'MR_Request_Date', Process: 'MR_PO', type: 'date' },
    { name: 'MR_App_Date', Process: 'MR_PO', type: 'date' },
    { name: 'PO_Issue_Date', Process: 'MR_PO', type: 'date' },
    { name: 'PO_App_Date', Process: 'MR_PO', type: 'date' },
    { name: 'Design_Check_Plan', Process: 'Design', type: 'date' },
    { name: 'Design_Check_Actual', Process: 'Design', type: 'text' },
    { name: 'Design_Check_Result', Process: 'Design', type: 'text' },
    { name: 'NoOfPoit_Not_FL_DMF', Process: 'Design', type: 'text' },
    { name: 'NoOfPoint_Not_FL_Spec', Process: 'Design', type: 'text' },
    { name: 'NoOfPoint_Kaizen', Process: 'Design', type: 'text' },
    { name: 'JIG_Using', Process: 'JIG', type: 'bool' },
    { name: 'JIG_No', Process: 'JIG', type: 'text' },
    { name: 'JIG_Check_Plan', Process: 'JIG', type: 'date' },
    { name: 'JIG_Check_Result', Process: 'JIG', type: 'text' },
    { name: 'JIG_ETA_Supplier', Process: 'JIG', type: 'date' },
    { name: 'JIG_Status', Process: 'JIG', type: 'text' },
    { name: 'T0_Plan', Process: 'T0', type: 'date' },
    { name: 'T0_Result', Process: 'T0', type: 'text' },
    { name: 'T0_Solve_Method', Process: 'T0', type: 'text' },
    { name: 'T0_Solve_Result', Process: 'T0', type: 'text' },
    { name: 'Texture_Meeting_Date', Process: 'Texture', type: 'date' },
    { name: 'Texture_Go_Date', Process: 'Texture', type: 'date' },
    { name: 'S0_Plan', Process: 'Texture', type: 'date' },
    { name: 'S0_Result', Process: 'Texture', type: 'text' },
    { name: 'S0_Solve_Method', Process: 'Texture', type: 'text' },
    { name: 'S0_solve_Result', Process: 'Texture', type: 'text' },
    { name: 'Texture_App_Date', Process: 'Texture', type: 'date' },
    { name: 'Texture_Internal_App_Result', Process: 'Texture', type: 'text' },
    { name: 'Texture_JP_HP_App_Result', Process: 'Texture', type: 'text' },
    { name: 'Texture_Note', Process: 'Texture', type: 'text' },
    { name: 'PreKK_Plan', Process: 'PreKK', type: 'date' },
    { name: 'PreKK_Actual', Process: 'PreKK', type: 'date' },
    { name: 'PreKK_Result', Process: 'PreKK', type: 'text' },
    { name: 'FA_Sub_Time', Process: 'FA_Status', type: 'disable' },
    { name: 'FA_Plan', Process: 'FA_Status', type: 'date' },
    { name: 'FA_Result', Process: 'FA_Status', type: 'List_FAResult' },
    { name: 'FA_Result_Date', Process: 'FA_Status', type: 'date' },
    { name: 'FA_Problem', Process: 'FA_Status', type: 'text' },
    { name: 'FA_Action_Improve', Process: 'FA_Status', type: 'text' },
    { name: 'MT1_Date', Process: 'MT', type: 'date' },
    { name: 'MT1_Gather_Date', Process: 'MT', type: 'date' },
    { name: 'MT1_Problem', Process: 'MT', type: 'text' },
    { name: 'MT1_Remark', Process: 'MT', type: 'text' },
    { name: 'MTF_Date', Process: 'MT', type: 'date' },
    { name: 'MTF_Gather_Date', Process: 'MT', type: 'date' },
    { name: 'MTF_Problem', Process: 'MT', type: 'text' },
    { name: 'MTF_Remark', Process: 'MT', type: 'text' },
    { name: 'TVP_No', Process: 'TVP_PCAR', type: 'text' },
    { name: 'ERI_No', Process: 'TVP_PCAR', type: 'text' },
    { name: 'TVP_Result_Date', Process: 'TVP_PCAR', type: 'date' },
    { name: 'TVP_Remark', Process: 'TVP_PCAR', type: 'text' },
    { name: 'PCAR_Date', Process: 'TVP_PCAR', type: 'date' },
    { name: 'PCAR_Result', Process: 'TVP_PCAR', type: 'date' },
    { name: 'First_Lot_Date', Process: 'TVP_PCAR', type: 'date' },
    { name: 'Latest_Update_By', Process: 'History', type: 'disable' },
    { name: 'Latest_Update_Date', Process: 'History', type: 'disable' },


]


function showDetail(recordID) {
    renderModalDetail(recordID)
    $('#modalShowDetail').modal('show')
}

async function renderModalDetail(id) {
    let data = await getDatafromAPI3(parseInt(id))
    let List_Supplier = await getListSupplier()
    let List_Model = await getListModel()
    let List_FAResult = await getFAResultCategory()
    console.log(data)
    const x = data[0]
    $('#s_partNo').text(x.Part_No)
    $('#s_dieNo').text(x.Die_No)
    $('#s_progress').attr("value", x.Progress);
    $('#Status').text(x.Status)
    $('#Pending_Status').text(x.Pending_Status)
    $('#Dept_Responsibility').text(x.Dept_Responsibility)
    var warningContent = ''
    x.Warning.forEach((item, index) => {
        warningContent += (index + 1) + ". " + item + '\n'
    });
    $('#warning').text(warningContent)
    $('#s_GanaralInfor').text(x.Genaral_Information)
    $('#s_Texute').val(x.Texture)
    $('#s_Texute').attr('onchange', `updateTexture(${x.RecordID})`)
    $('#s_JIG').val(x.JIG_Using)
    $('#s_JIG').attr('onchange', `updateJIG(${x.RecordID})`)
    $('#btn_save_GenaralInfor').attr('onclick', `update_GenaralInfo(${x.RecordID})`)
    // Render Attachment
    $('#renderAttachment').empty()
    if (x.Attachment.length) {
        var content = ''
        x.Attachment.forEach(x =>
            content = `<tr>
                <td>${x.Clasify}</td>
                <td>
                <a href="/File/Attachment/${x.FileName}" title="${x.FileName}">${x.FileName.substr(0, 10) + '...'}</a>
                 </td>
                 <td>${moment(x.CreateDate).format('MM-DD-YYYY')}</td>
            </tr>` + content)

        $('#renderAttachment').html(content)
    }


    // Yeu cau nhat cho tung trang thai
    var pending = x.Pending_Status.toUpperCase()
    // reset
    $('#name1').html('').removeClass('bg-secondary')
    $('#input1').html('').removeClass('bg-secondary')
    $('#name2').html('').removeClass('bg-secondary')
    $('#input2').html('').removeClass('bg-secondary')
    $('#name3').html('').removeClass('bg-secondary')
    $('#btn_update').attr('onclick', 'Btn_update(' + id + ')')
    if (pending.includes('SELECTSUPPLIER')) {
        $('#name1').text('Select Date').addClass('text-danger')
        $('#input1').html(`<input type="text" class="form-control form-control-sm datepicker is-invalid" name="Select_Supplier_Date"\>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')


    }

    if (pending.includes('W-QTN_SUB')) {
        $('#name1').text('QTN_Sub_Date').addClass('text-danger')
        $('#input1').html(`<input type="text" class="form-control form-control-sm datepicker is-invalid" name="QTN_Sub_Date"\>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('W-QTN_APP')) {
        $('#name1').text('QTN_App_Date').addClass('text-danger')
        $('#input1').html(`<input type="text" class="form-control form-control-sm datepicker is-invalid" name="QTN_App_Date"\>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }


    if (pending.includes('W-DFM_SUB')) {
        $('#name1').text('Upload DFM').addClass('text-danger')
        $('#input1').html(`<input type="file" class="form-control form-control-sm is-invalid" name="DFMMaker"\>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('W-DFM_PAE_CHECK')) {
        $('#name1').text('DFM_Supplier_Sub')
        $('#input1').html(`<a href="/File/Attachment/${x.DFMMaker}"><i class="fa-solid fa-down-to-bracket"></i> DFM_Maker</a>`)

        $('#name2').text('Upload DFM').addClass('text-danger')
        $('#input2').html(`<input type="file" class="form-control form-control-sm is-invalid" name="DFMPAEChecked"\>`)


    }

    if (pending.includes('W-DFM_PE1_CHECK')) {
        $('#name1').text('DFM_PAE_Checked')
        $('#input1').html(`<a href="/File/Attachment/${x.DFMPAEChecked}"><i class="fa-solid fa-down-to-bracket"></i> DFM_PAE_Checked</a>`)

        $('#name2').text('Upload DFM').addClass('text-danger')
        $('#input2').html(`<input type="file" class="form-control form-control-sm is-invalid" name="DFMPE1Checked"\>`)
    }

    if (pending.includes('W-DFM_PE1_APP')) {
        $('#name1').text('DFM_PE1_Checked')
        $('#input1').html(`<a href="/File/Attachment/${x.DFMPE1Checked}"><i class="fa-solid fa-down-to-bracket"></i> DFM_PE1_Checked</a>`)

        $('#name2').text('Upload DFM').addClass('text-danger')
        $('#input2').html(`<input type="file" class="form-control form-control-sm is-invalid" name="DFMPE1App"\>`)
    }

    if (pending.includes('W-DFM_PAE_APP')) {
        $('#name1').text('DFM_PE1_App')
        $('#input1').html(`<a href="/File/Attachment/${x.DFMPE1App}"><i class="fa-solid fa-down-to-bracket"></i> DFM PE1 App</a>`)

        $('#name2').text('Upload DFM').addClass('text-danger')
        $('#input2').html(`<input type="file" class="form-control form-control-sm is-invalid" name="DFMPAEApp"\>`)
    }

    if (pending.includes('W-MR_ISSUE')) {
        $('#name1').text('Issue MR')
        $('#input1').html(`<a href="/MRs/IssueMR"></i> Go to issue MR</a>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('W-MR_APP')) {
        $('#name1').text('APP MR')
        $('#input1').html(`<a href="/MRs"></i> Go to App MR</a>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('W-PO_ISSUE')) {
        $('#name1').text('Issue PO')
        $('#input1').html(`<a href="/PO_Dies"></i> Go to issue PO</a>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('W-PO_APP')) {
        $('#name1').text('APP PO')
        $('#input1').html(`<a href="/PO_Dies"></i> Go to App PO</a>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('W-T0_PLAN')) {
        $('#name1').text('T0 PLan')
        $('#input1').html(`<input type="text" class="form-control form-control-sm datepicker is-invalid" name="T0_Plan"\>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('W-T0_TRIAL')) {
        $('#name1').text(' /').addClass('bg-secondary')
        $('#input1').html(``).addClass('bg-secondary')

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('CONFIRM T0 RESULT')) {
        $('#name1').text('T0 Result')
        $('#input1').html(`<input type="text" class="form-control form-control-sm is-invalid" placeholder="Burr,Cav stuck, OK,..." name="T0_Result"\>`)

        $('#name2').text('Action Improve')
        $('#input2').html(`<input type="text" class="form-control form-control-sm is-invalid" placeholder="Cut insert, welding, Add draft,..." name="T0_Solve_Method"\>`)
        $('#name3').html('')
        $('#name3').append('Attach <input type="file" class="form-control form-control-sm inline-block" name="ToAttachment" id="ToAttachment"/>')
    }

    if (pending.includes('W-FA_PLAN')) {
        $('#name1').text('FA Plan')
        $('#input1').html(`<input type="text" class="form-control form-control-sm is-invalid datepicker" name="FA_Plan"\>`)

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('W-FA_SUB') || pending.includes('W-FA_RESUB')) {
        $('#name1').text(' /').addClass('bg-secondary')
        $('#input1').html(``).addClass('bg-secondary')

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    if (pending.includes('CONFIRM FA SUB') || pending.includes('W-FA_RESULT')) {
        $('#name1').text('FA Result/Position')
        // Lấy FA result Category để render
        let data = await getFAResultCategory()
        let content = '<option value=""> --- </option>'
        data.forEach(function (e) {
            let selected = ''
            if (e == x.FA_Result) {
                selected = `selected = "selected"`
            }
            content += `<option ${selected} value ="${e}"> ${e} </option>`
        })
        $('#input1').html(`<select class="form-control form-control-sm is-invalid" name="FA_Result">${content}</select>`)

        $('#name2').text('Result Date')
        $('#input2').html(`<input type="text" class="form-control form-control-sm is-invalid datepicker" name="FA_Result_Date"/>`)

        $('select[name=FA_Result]').change(function () {
            if ($(this).val().trim() != '') {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                $('input[name=FA_Result_Date]').val(today)
            } else {
                $('input[name=FA_Result_Date]').val('')
            }
        })
    }

    if (pending.includes('W-REPAIR')) {
        $('#name1').text('FA_Problem')
        $('#input1').html(`<input type="text" class="form-control form-control-sm is-invalid" placeholder="NG #, Burr,..." name="FA_Problem"\>`)

        $('#name2').text('Action Improve')
        $('#input2').html(`<input type="text" class="form-control form-control-sm is-invalid" placeholder="Cut insert, welding, Add draft,..." name="FA_Action_Improve"\>`)
        $('#name3').html('')
        $('#name3').append('Attach <input type="file" class="form-control form-control-sm inline-block" name="FAAttachment" id="FAAttachment"/>')
    }

    if (pending.includes('W-TVP_ISSUE')) {
        $('#name1').text('TVP No')
        $('#input1').html(`<input type="text" class="form-control form-control-sm is-invalid" name="TVP_No"\>`)

        $('#name2').text('ERI No')
        $('#input2').html(`<input type="text" class="form-control form-control-sm is-invalid" name="ERI_No"\>`)
    }
    if (pending.includes('W-TVP_RESULT') || pending.includes('W-RETVP')) {
        $('#name1').text('TVP Result')
        $('#input1').html(`<input type="text" class="form-control form-control-sm is-invalid" placeholeder="OK,NG" value="${x.TVP_Result != null ? x.TVP_Result : ''}" name="TVP_Result"\>`)

        $('#name2').text('Result Date')
        $('#input2').html(`<input type="text" class="form-control form-control-sm is-invalid datepicker" name="TVP_Result_Date"\>`)

        $('input[name=TVP_Result]').on('input', function () {
            if ($(this).val().trim() != '') {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                $('input[name=TVP_Result_Date]').val(today)
            } else {
                $('input[name=TVP_Result_Date]').val('')
            }
        })
    }

    if (pending.includes('W-PCAR_RESULT')) {
        $('#name1').text('PCAR Result')
        $('#input1').html(`<input type="text" class="form-control form-control-sm is-invalid" placeholeder="OK,NG" value="${x.PCAR_Result != null ? x.PCAR_Result : ''}" name="PCAR_Result"\>`)

        $('#name2').text('Result Date')
        $('#input2').html(`<input type="text" class="form-control form-control-sm is-invalid datepicker" name="PCAR_Date"\>`)

        $('input[name=PCAR_Result]').on('input', function () {
            if ($(this).val().trim() != '') {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                $('input[name=PCAR_Date]').val(today)
            } else {
                $('input[name=PCAR_Date]').val('')
            }
        })
    }

    if (pending.includes('DONE') || pending.includes('W-FA_RESUB')) {
        $('#name1').text(' /').addClass('bg-secondary')
        $('#input1').html(``).addClass('bg-secondary')

        $('#name2').text(' /').addClass('bg-secondary')
        $('#input2').html(``).addClass('bg-secondary')
    }

    //*************************************** */
    //***********Render theo process********** */
    //*****Genaral Information */
    let inputFeildBasic = inputFields.filter(x => x.Process == "Basic_Info")
    let inputFeildDecision = inputFields.filter(x => x.Process == "Decision")
    let inputFeildDSUM = inputFields.filter(x => x.Process == "DSUM")
    let inputFeildMR_PO = inputFields.filter(x => x.Process == "MR_PO")
    let inputFeildDesign = inputFields.filter(x => x.Process == "Design")
    let inputFeildJIG = inputFields.filter(x => x.Process == "JIG")
    let inputFeildT0 = inputFields.filter(x => x.Process == "T0")
    let inputFeildTexture = inputFields.filter(x => x.Process == "Texture")
    let inputFeildPreKK = inputFields.filter(x => x.Process == "PreKK")
    let inputFeildFA_Status = inputFields.filter(x => x.Process == "FA_Status")
    let inputFeildMT = inputFields.filter(x => x.Process == "MT")
    let inputFeildTVP_PCAR = inputFields.filter(x => x.Process == "TVP_PCAR")
    let inputFeildHistory = inputFields.filter(x => x.Process == "History")

    // add btn Savechange()
    $('#btn_saveChange').attr('onclick', `saveChange(${id})`)


    /********************************************* */
    // Tab Basic
    $('#tabs-BasicInfo').empty();
    let contentTab_Basic = ''
    inputFeildBasic.forEach(function (y) {

        contentTab_Basic += `
        <div class="form-group col-md-3">
            <label for="${y.name}">${y.name}</label>
            ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
        </div>
    `
    })
    $('#tabs-BasicInfo').html(`<div class="form-row">${contentTab_Basic}</div>`)
    //**************************************** */

    /********************************************* */
    // Tab Decision
    $('#tabs-Decision').empty();
    let contentTab_Decision = ''
    inputFeildDecision.forEach(function (y) {
        contentTab_Decision += `
        <div class="form-group col-md-3">
            <label for="${y.name}">${y.name}</label>
            ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
        </div>
    `
    })
    $('#tabs-Decision').html(`<div class="form-row">${contentTab_Decision}</div>`)
    //**************************************** */

    // Tab DUSM
    $('#tabs-DSUM').empty();
    let contentTab_DSUM = ''
    inputFeildDSUM.forEach(function (y) {
        contentTab_DSUM += `
         <div class="form-group col-md-3">
             <label for="${y.name}">${y.name}</label>
             ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
         </div>
     `
    })
    $('#tabs-DSUM').html(`<div class="form-row">${contentTab_DSUM}</div>`)
    //**************************************** */

    // Tab MR
    $('#tabs-MR').empty();
    let contentTab_MR = ''
    inputFeildMR_PO.forEach(function (y) {
        contentTab_MR += `
         <div class="form-group col-md-3">
             <label for="${y.name}">${y.name}</label>
             ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
         </div>
     `
    })
    $('#tabs-MR').html(`<div class="form-row">${contentTab_MR}</div>`)
    //**************************************** */


    // Tab Design
    $('#tabs-Design').empty();
    let contentTab_Design = ''
    inputFeildDesign.forEach(function (y) {
        contentTab_Design += `
         <div class="form-group col-md-3">
             <label for="${y.name}">${y.name}</label>
             ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
         </div>
     `
    })
    $('#tabs-Design').html(`<div class="form-row">${contentTab_Design}</div>`)
    //**************************************** */

    // Tab JIG
    $('#tabs-JIG').empty();
    let contentTab_JIG = ''
    inputFeildJIG.forEach(function (y) {
        contentTab_JIG += `
         <div class="form-group col-md-3">
             <label for="${y.name}">${y.name}</label>
             ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
         </div>
     `
    })
    $('#tabs-JIG').html(`<div class="form-row">${contentTab_JIG}</div>`)
    //**************************************** */

    // Tab T0
    $('#tabs-T0').empty();
    let contentTab_T0 = ''
    inputFeildT0.forEach(function (y) {
        contentTab_T0 += `
          <div class="form-group col-md-3">
              <label for="${y.name}">${y.name}</label>
              ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
          </div>
      `
    })
    $('#tabs-T0').html(`<div class="form-row">${contentTab_T0}</div>`)
    //**************************************** */


    // Tab Prekk
    $('#tabs-Prekk').empty();
    let contentTab_Prekk = ''
    inputFeildPreKK.forEach(function (y) {
        contentTab_Prekk += `
           <div class="form-group col-md-3">
               <label for="${y.name}">${y.name}</label>
               ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
           </div>
       `
    })
    $('#tabs-Prekk').html(`<div class="form-row">${contentTab_Prekk}</div>`)
    //**************************************** */

    // Tab Prekk
    $('#tabs-Texture').empty();
    let contentTab_Texture = ''
    inputFeildTexture.forEach(function (y) {
        contentTab_Texture += `
            <div class="form-group col-md-3">
                <label for="${y.name}">${y.name}</label>
                ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
            </div>
        `
    })
    $('#tabs-Texture').html(`<div class="form-row">${contentTab_Texture}</div>`)
    //**************************************** */


    // Tab FA
    $('#tabs-FA').empty();
    let contentTab_FA = ''
    inputFeildFA_Status.forEach(function (y) {
        contentTab_FA += `
            <div class="form-group col-md-3">
                <label for="${y.name}">${y.name}</label>
                ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
            </div>
        `
    })
    $('#tabs-FA').html(`<div class="form-row">${contentTab_FA}</div>`)
    //**************************************** */

    // Tab MT
    $('#tabs-MT').empty();
    let contentTab_MT = ''
    inputFeildMT.forEach(function (y) {
        contentTab_MT += `
            <div class="form-group col-md-3">
                <label for="${y.name}">${y.name}</label>
                ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
            </div>
        `
    })
    $('#tabs-MT').html(`<div class="form-row">${contentTab_MT}</div>`)
    //**************************************** */

    // Tab TVP
    $('#tabs-TVP').empty();
    let contentTab_TVP = ''
    inputFeildTVP_PCAR.forEach(function (y) {
        contentTab_TVP += `
            <div class="form-group col-md-3">
                <label for="${y.name}">${y.name}</label>
                ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
            </div>
        `
    })
    $('#tabs-TVP').html(`<div class="form-row">${contentTab_TVP}</div>`)
    //**************************************** */

    // Tab His
    $('#tabs-His').empty();
    let contentTab_His = ''
    inputFeildHistory.forEach(function (y) {
        contentTab_His += `
             <div class="form-group col-md-3">
                 <label for="${y.name}">${y.name}</label>
                 ${getInputElement(y, x, List_Supplier, List_Model, List_FAResult)}
             </div>
         `
    })
    $('#tabs-His').html(`<div class="form-row">${contentTab_His}</div>`)
    //**************************************** */

    $(function () {
        $("body").delegate(".datepicker", "focusin", function () {
            $(this).datepicker();
        });
    });
}


function getFAResultCategory() {
    return new Promise(resolve => {
        $.ajax({
            url: "http://localhost:8080/Die_Launch_Management/getListFAResultCategory",
            type: 'Get',
            dataType: 'json',
            success: function (data) {
                resolve(data);
            }
        })
    });
}

function getListSupplier() {
    return new Promise(resolve => {
        $.ajax({
            url: "http://localhost:8080/Die_Launch_Management/getListSupplier",
            type: 'Get',
            dataType: 'json',
            success: function (data) {
                resolve(data);
            }
        })
    });
}

function getListModel() {
    return new Promise(resolve => {
        $.ajax({
            url: "http://localhost:8080/Die_Launch_Management/getListModel",
            type: 'Get',
            dataType: 'json',
            success: function (data) {
                resolve(data);
            }
        })
    });
}

function getDatafromAPI3(id) {
    return new Promise(resolve => {
        $.ajax({
            url: "http://localhost:8080/Die_Launch_Management/getRecords",
            type: 'POST',
            data: { recordID: id },
            dataType: 'json',
            success: function (data) {
                resolve(data);
            }
        })
    });
}

function getInputElement(config, data, List_Supplier, List_Model, List_FAResult) {
    let input = ''
    if (config.type == "text" || config.type == "int") {
        input = `<input type="text" class="form-control" id="${config.name}" name="${config.name}" value="${data[config.name]}"></input>`
    }
    if (config.type == "disable") {
        input = `<input type="text" disabled class="form-control" id="${config.name}" name="${config.name}" value="${data[config.name]}"></input>`
    }
    if (config.type == "date") {
        input = `<input type="text" class="form-control datepicker" id="${config.name}" name="${config.name}" value="${data[config.name]}"></input>`
    }

    if (config.type == "bool") {
        let selected = data[config.name] == true ? "selected" : ""

        input = `
        <select class="form-control" name="${config.name}" id="${config.name}">
            <option value ="">?</option>
            <option ${data[config.name] == "Yes" ? "selected" : ""} value ="Yes">Yes</option>
            <option ${data[config.name] == 'No' ? "selected" : ""} value ="No">No</option>
        </select>
        `
    }

    if (config.type == "List_Supplier") {
        let options = ''
        List_Supplier.forEach(function (supplier) {
            options += `<option ${data.SupplierID == supplier.SupplierID ? "selected" : ''} value="${supplier.SupplierID}">${supplier.SupplierName} </option>`
        })

        input = `
        <select class="form-control" name="SupplierID" id="SupplierID">
            <option value ="">?</option>
            ${options}
        </select>
        `
    }
    if (config.type == "List_Model") {
        let options = ''
        List_Model.forEach(function (model) {
            options += `<option ${data.ModelID == model.ModelID ? "selected" : ''} value="${model.ModelID}">${model.ModelName} </option>`
        })

        input = `
        <select class="form-control" name="ModelID" id="ModelID">
            <option value ="">?</option>
            ${options}
        </select>
        `
    }

    if (config.type == "List_FAResult") {
        let options = ''
        List_FAResult.forEach(function (FAResult) {
            options += `<option ${data.FA_Result == FAResult ? "selected" : ''} value="${FAResult}">${FAResult} </option>`
        })

        input = `
        <select class="form-control" name="${config.name}" id="${config.name}">
            <option value ="">?</option>
            ${options}
        </select>
        `
    }
    return input
}





// Luu Data API
function saveChange(id) {
    let formData = new FormData()
    formData.append('RecordID', id)
    $("#formInput :input:enabled").each(function () {
        let input = $(this);
        let name = input.attr('name')
        let value = input.val()
        if (name == "Texture" || name == "JIG_Using") {
            value = value == "" ? null : value == "Yes" ? true : false
        }
        formData.append([name], value)
    });


    updateDataAPIPost(formData)
}

$('#formInput').on('keypress', function (e) {
    if (e.which == 13) {
        $('#btn_saveChange').click()
    }
})

$('input[name=Genaral_Information]').on('keypress', function (e) {
    if (e.which == 13) {
        $('#btn_save_GenaralInfor').click()
    }
})

function Btn_update(id) {
    let formData = new FormData();
    formData.append('RecordID', id)
    // var data = {
    //     recordID: id
    // }

    var inputs = []

    inputs.push($('#input1 input:not(input[type=file]').get())
    inputs.push($('#input1 select').get())
    inputs.push($('#input2 input:not(input[type=file]').get())
    inputs.push($('#input2 select').get())
    inputs.push($('#name3 input:not(input[type=file]').get())
    inputs.push($('#name3 select').get())
    var files = []

    files.push($('#input1 input[type="file"]').get())
    files.push($('#input2 input[type="file"]').get())
    files.push($('#name3 input[type="file"]').get())
    files = files.flat()
    if (files.length) {
        files.forEach(function (x) {
            if ($(x).val()) {
                console.log({ x })
                let name = $(x).attr('name')
                let value = x.files[0]
                // data[name] = value
                formData.append([name], value);
            }
        })
    }

    inputs = inputs.flat()
    inputs.forEach(function (x) {
        let name = $(x).attr('name')
        let value = $(x).val()
        formData.append([name], value)
        // data[name] = value
    })

    updateDataAPIPost(formData)
}

function updateTexture(id) {
    let formData = new FormData();
    formData.append('RecordID', id)
    var value = $('#s_Texute').val();
    var resultValue = value == "Yes" ? true : value == "No" ? false : null;
    formData.append('Texture', resultValue)
    updateDataAPIPost(formData)
}

function updateJIG(id) {
    let formData = new FormData();
    formData.append('RecordID', id)
    var value = $('#s_JIG').val();
    var resultValue = value == "Yes" ? true : value == "No" ? false : null;
    formData.append('JIG_Using', resultValue)
    updateDataAPIPost(formData)
}

function update_GenaralInfo(id) {
    let formData = new FormData();
    formData.append('RecordID', id)
    var value = $('input[name=Genaral_Information]').val();
    formData.append('Genaral_Information', value)
    updateDataAPIPost(formData)
    var value = $('input[name=Genaral_Information]').val('');
}

function updateDataAPIPost(formData) {
    for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
    }
    $.ajax({
        url: "http://localhost:8080/Die_Launch_Management/SaveData",
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {

            renderModalDetail(data.record[0].RecordID)
            $('#' + data.record[0].RecordID).hide('highlight', 3000);
            table.row.add(data.record[0]).draw();
            renderChartView()
           
        }
    })
}


