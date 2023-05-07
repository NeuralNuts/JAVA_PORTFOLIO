function bubbleSort() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("my-table");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];
            
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function selectionSort() {
    var table, rows, i, j, minIndex, shouldSwitch;
    table = document.getElementById("my-table");
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
        minIndex = i;
        for (j = i + 1; j < rows.length; j++) {
            if (rows[minIndex].getElementsByTagName("td")[0].textContent.toLowerCase() > rows[j].getElementsByTagName("td")[0].textContent.toLowerCase()) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            rows[i].parentNode.insertBefore(rows[minIndex], rows[i]);
        }
    }
}

function insertionSort() {

    var table, rows, i, j, minIndex, shouldSwitch;
    table = document.getElementById("my-table");
    rows = table.rows;

    for (var i = 1; i < rows.length; i++) {
        var currentRow = rows[i];
        var currentValue = currentRow.getElementsByTagName('td')[0].textContent.toLowerCase();
        var j = i - 1;

        while (j >= 0 && rows[j].getElementsByTagName('td')[0] > currentValue) {
            table.rows[j + 1].replaceWith(table.rows[j]);
            j--;
        }
        table.rows[j + 1].replaceWith(currentRow);
    }
}

function sortTableBy(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("my-table");
    switching = true;
    dir = "asc";

    while (switching) {
      switching = false;
      rows = table.rows;
      
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {

        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }