const sqlite3 = require('sqlite3').verbose();
let insert_data;
let get_data;

const db = new sqlite3.Database("./archive.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

/**
 * Deletes items within the html table
 * @function
 */
function deleteItemInTable() {
    var id_input = document.getElementById("id-input").value;

    delete_data = `DELETE FROM archive WHERE id=?`;

    db.run(delete_data, [id_input],
        (err) => {
            if (err) return console.error(err.message)
            window.location.reload()
        })
}

/**
 * Loads data from the SQLite database and displays it within the html data
 * @function
 */
function loadData() {
    get_data = `SELECT * FROM archive`;

    db.all(get_data, [], (err, rows) => {
        table = document.getElementById("my-table");

        if (err) return console.error(err.message);

        for (let row of rows) {
            const tr = document.createElement('tr');
            const content = `<td>${row.id}</td>
          <td>${row.title}</td>
          <td>${row.author}</td>
          <td>${row.section}</td>
          <td>${row.x}</td>
          <td>${row.y}</td>
          <td>${row.barcode}</td>
          <td>${row.description}</td>
          <td>${row.on_loan}</td>`;

            tr.innerHTML = content;
            table.appendChild(tr)
        }
        highlight_row()
    }
    )
};

/**
 * When a row within the html tabel is clicked the data from that row will be sent to the input fields below for modifications
 * @function
*/
function highlight_row() {
    var id_input = $("#id-input");
    var title_input = $("#title-input");
    var author_input = $("#author-input");
    var section_input = $("#section-input");
    var x_input = $("#x-input");
    var y_input = $("#y-input");
    var bar_code_input = $("#bar-code-input");
    var description_input = $("#description-input");
    var on_loan_input = $("#on-loan-input");
    var table = document.getElementById('true-table');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;
            var rowsNotSelected = table.getElementsByTagName('tr');

            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }

            var rowSelected = table.getElementsByTagName('tr')[rowId];

            id_input.val(rowSelected.cells[0].innerHTML)
            title_input.val(rowSelected.cells[1].innerHTML)
            author_input.val(rowSelected.cells[2].innerHTML)
            section_input.val(rowSelected.cells[3].innerHTML)
            x_input.val(rowSelected.cells[4].innerHTML)
            y_input.val(rowSelected.cells[5].innerHTML)
            bar_code_input.val(rowSelected.cells[6].innerHTML)
            description_input.text(rowSelected.cells[7].innerHTML)
            on_loan_input.val(rowSelected.cells[8].innerHTML)
        }
    }
}

/**
 * Adds a new entry to the database
 * @function
 */
function addItemToTable() {
    var title_input = document.getElementById("title-input").value;
    var author_input = document.getElementById("author-input").value;
    var section_input = document.getElementById("section-input").value;
    var x_input = document.getElementById("x-input").value;
    var y_input = document.getElementById("y-input").value;
    var bar_code_input = document.getElementById("bar-code-input").value;
    var description_input = document.getElementById("description-input").value;
    
    insert_data = `INSERT INTO archive(title, author, section, x, y, barcode, description, on_loan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(insert_data, [title_input, author_input, section_input, x_input, y_input, bar_code_input, description_input, "No"],
        (err) => {
            if (err) return console.error(err.message)
            window.location.reload();
        })
}

/**
 * Updates entry that is displayed in the input fields
 * @function
 */
function updateItemInTable() {
    var id_input = document.getElementById("id-input").value;
    var title_input = document.getElementById("title-input").value;
    var author_input = document.getElementById("author-input").value;
    var section_input = document.getElementById("section-input").value;
    var x_input = document.getElementById("x-input").value;
    var y_input = document.getElementById("y-input").value;
    var bar_code_input = document.getElementById("bar-code-input").value;
    var description_input = document.getElementById("description-input").value;
    var on_loan_input = document.getElementById("on-loan-input").value;

    update_data = `UPDATE archive SET title = ?, author = ?, section = ?, x = ?, y = ?, barcode = ?, description = ?, on_loan = ? WHERE id = ? `;

    db.run(update_data, [title_input, author_input, section_input, x_input, y_input, bar_code_input, description_input, on_loan_input, id_input],
        (err) => {
            if (err) return console.error(err.message)
            window.location.reload()
        })
}

/**
 * Searches through table based on the input field and then only displays the result in the table
 * @function
 */
function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search-input");
    filter = input.value.toUpperCase();
    table = document.getElementById("my-table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txt_value = td.textContent || td.innerText;
            if (txt_value.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}