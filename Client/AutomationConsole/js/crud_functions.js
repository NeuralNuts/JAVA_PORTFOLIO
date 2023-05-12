const sqlite3 = require('sqlite3').verbose();
let get_data;

const db = new sqlite3.Database("./archive.db", sqlite3.OPEN_READWRITE, (err) => {

    if (err) return console.error(err.message);
});

function highlight_row() {
    var section_input = $("#section-input");
    var bar_code_input = $("#bar-code-input");
    var y_input = $("#y-input");
    var x_input = $("#x-input");
    var table = document.getElementById('true-table');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;
            var rowsNotSelected = table.getElementsByTagName('tr');

            for (var row = 0; row < rowsNotSelected.length; row++) {

                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.backgroundColor = "";
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];

            section_input.val(rowSelected.cells[2].innerHTML)
            bar_code_input.val(rowSelected.cells[5].innerHTML)
            x_input.val(rowSelected.cells[3].innerHTML)
            y_input.val(rowSelected.cells[4].innerHTML)
        }
    }
}

function loadData() {
    get_data = `SELECT * FROM archive`;

    db.all(get_data, [], (err, rows) => {
        table = document.getElementById("my-table");
        let tr = table.insertRow();

        if (err) return console.error(err.message);

        for (let row of rows) {
            const tr = document.createElement('tr');
            const content = 
         `<td>${row.title}</td>
          <td>${row.author}</td>
          <td>${row.section}</td>
          <td>${row.x}</td>
          <td>${row.y}</td>
          <td>${row.barcode}</td>
          <td>${row.description}</td>`;

            tr.innerHTML = content;
            table.appendChild(tr)
        }
        highlight_row()
    }
    )
};

function DisplayAddItemButton() { 
    var processSelect = document.getElementById("select-process")

    if (processSelect.options[processSelect.selectedIndex].text === "Add") {
        $("#add-item").show();
    }
    else {
        $("#add-item").hide();
    }
}