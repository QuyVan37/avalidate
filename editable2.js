'use strict'
// main

start()
function start() {
    //renderTableHeader()
    listenTableEvent()
}

function listenTableEvent() {
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
                "targets": [],
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
                            recordID : recordID,
                            name : name,
                            value : newValue
                        }
                    )
                }
            }

            //1.2 Neu co the input
            if (isInput && isEditableCell) {
                var inputElement = $(cell.node()).find('input[name]')
                var name =$(inputElement).attr('name')
                $(inputElement).blur()
                $(inputElement).prop('disabled', true);
               

                newValue = $(cellElement).find('input[name]').val().trim();
                if (newValue != oldValue) {
                    updateData(
                        {
                            recordID : recordID,
                            name : name,
                            value : newValue
                        }
                    )
                }
            }
        })
    table.columns.adjust()
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




function renderTableHeader() {
    getTableHeaderColumn(function (header) {
        var renderTheadAreas = $('#myTableEditable thead').html('')
        var content = ''
        for (var i = 0; i < header.length; i++) {
            content += '<th>' + header[i].Col_Name + '</th>'
        }
        renderTheadAreas.html('<tr>' + content + '</tr>')
    })

}



