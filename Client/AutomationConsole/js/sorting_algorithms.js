function bubbleSort() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("my-table");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];
            // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
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
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }