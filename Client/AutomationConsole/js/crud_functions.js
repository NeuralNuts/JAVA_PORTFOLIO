function highlight_row() {

    var section_input = $("#section-input");
    var bar_code_input = $("#bar-code-input");
    var y_input = $("#y-input");
    var x_input = $("#x-input");

    var table = document.getElementById('true-table');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
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

function DisplayAddItemButton() {

    var processSelect = document.getElementById("select-process")

    if (processSelect.options[processSelect.selectedIndex].text === "Add") {

        console.log("Yes")
        $("#add-item").show();
    }
    else {
        $("#add-item").hide();
    }
}
