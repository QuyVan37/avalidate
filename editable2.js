'use strict'
// main


showAndHideColumn()


var table = $('#myTableEditable').DataTable({
    'searching': false,
    paging: true,
    scrollX: true,
    scrollY: 300,
    "bLengthChange": false,
    "sort": false,
    keys: true,
    "columnDefs": [
        {
            "targets": getShowColFromLocalStorage(),
            "visible": false,
            "searchable": false
        }
    ]
})
var oldValue;
var newValue;
var isSelect;
var isInput;
var isEditableCell;
table
    .on('key', function (e, datatable, key, cell, originalEvent) {
        //1. neu key = 13 (enter) => Move down
        if (key == 13) {
            table.keys.move('down');
        }

    })
    .on('key-focus', function (e, datatable, cell) {
        //1. Kiem tra co the select ko? & co thuoc tinh editable = true ko?
        var cellElement = cell.node();
        isSelect = $(cell.node()).find('select').length
        isInput = $(cell.node()).find('input[name]').length
        isEditableCell = $(cellElement).attr('isEditable').trim().toLowerCase() == "true"


        //1.1 Neu co the select va isEditable= true
        if (isSelect && isEditableCell) {
            oldValue = $(cellElement).find('select option:selected').val().trim();
            $(cell.node()).find('select').prop('disabled', false);
        }

        //1.2 Neu co the input
        if (isInput && isEditableCell) {
            var inputElement = $(cellElement).find('input[name]').prop('disabled', false);
            oldValue = inputElement.val().trim();
            //select va focus vao the input
            inputElement.select().focus()
        }

    })
    .on('key-blur', function (e, datatable, cell) {
        //1. Kien tra Value co bi thay doi ko?
        // Neu co => Update lai du lieu
        //1.1 Neu co the select va isEditable= true
        var cellElement = $(cell.node())
        var recordID = $(cell.node()).parent().attr('id') // <td name = ...>

        if (isSelect && isEditableCell) {
            newValue = $(cellElement).find('select option:selected').val().trim();
            var name = $(cellElement).find('select').attr('name')
            if (newValue != oldValue) {
                updateData(
                    {
                        recordID: recordID,
                        name: name,
                        value: newValue
                    }
                )
            }
        }

        //1.2 Neu co the input
        if (isInput && isEditableCell) {
            var inputElement = $(cell.node()).find('input[name]')
            var name = $(inputElement).attr('name')
            $(inputElement).blur()
            $(inputElement).prop('disabled', true);


            newValue = $(cellElement).find('input[name]').val().trim();
            if (newValue != oldValue) {
                updateData(
                    {
                        recordID: recordID,
                        name: name,
                        value: newValue
                    }
                )
            }
        }
    })
table.columns.adjust();




function getAllColIndexNeedShowAndHandelView() {
    var showColsIndex = []
    $("input:checkbox[name=checkboxHideCol]").each(function () {
        var data
        if (this.checked) {
            data = {
                col_index: $(this).val(),
                isShow: true
            }
        } else {
            data = {
                col_index: $(this).val(),
                isShow: false
            }
        }
        showColsIndex.push(data);

    })
    // tAM THOI
    for (var i = 0; i < 21; i++) {
        var column = table.column(parseInt(showColsIndex[i].col_index))
        column.visible(showColsIndex[i].isShow)
    }
    // dOAN CODE CHINH
    // showColsIndex.forEach(col => {
    //     var column = table.column(parseInt(col.col_index))
    //     column.visible(col.isShow)
    // })

    // luu vao local storage
    localStorage.setItem('showColumn', JSON.stringify(showColsIndex))
    return showColsIndex
}

function getShowColFromLocalStorage() {
    var cols = JSON.parse(localStorage.getItem('showColumn'))
    // TAM THOI
    cols = cols.slice(0,21)
    //*

    // Checked vao checkbox need isShow= true
    
    // Dang lam gio





    var colsNeedShow = cols.filter(function (x) {
        return x.isShow == false
    })
    var result = []
    colsNeedShow.map(function (x) {
        result.push(parseInt(x.col_index))
    })
    console.log(result)
    return result;
}



function updateData(data) {

    console.log('Update data', data)
}

function getTableHeaderColumn(callback) {
    var url = 'http://localhost:8080/Die_Launching_Control/DieLaunchColumnManage'
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function showAndHideColumn() {
    getTableHeaderColumn(function (cols) {
        renderColCategory(cols)
    })
}

function renderColCategory(cols) {

    // Phan loai theo category
    var category = cols.map(function (x) {
        return x.Belong_Progress
    })

    var colCategories = category.filter(function (item, index) {
        return category.indexOf(item) === index
    })
    var content = '';
    for (var i = 0; i < colCategories.length; i++) {
        var colsBelongProgress = cols.filter(function (x) {
            return x.Belong_Progress == colCategories[i]
        })

        var list_Col = ''
        for (var j = 0; j < colsBelongProgress.length; j++) {
            list_Col = list_Col +
                `<label for="col_${colsBelongProgress[j].ColumnID}" class="list-group-item">
                <input name = "checkboxHideCol" type="checkbox" onclick ="getAllColIndexNeedShowAndHandelView()" col-index = "${colsBelongProgress[j].ColumnID}" id="col_${colsBelongProgress[j].ColumnID}" value = "${colsBelongProgress[j].ColumnID}" class = "jsCheckBoxHideCol"/>
                ${colsBelongProgress[j].Col_Name}
                </label>
            `
        }

        content = content +
            `
        <div class="card">
            <div class="card-header" id="heading_${i}">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse_${i}" aria-expanded="true" aria-controls="collapse_${i}">
                    ${colCategories[i]}
                    </button>
                </h5>
            </div>
    
            <div id="collapse_${i}" class="collapse" aria-labelledby="heading_${i}" data-parent="#accordion">
                <div class="card-body">
                ${list_Col}
                </div>
            </div>
        </div>
        
        `
    }





    var renderTheadAreas = $('#renderAreasShowColumn').html(`
    <div id="accordion">
        ${content}
    </div>
    
    `)



}


