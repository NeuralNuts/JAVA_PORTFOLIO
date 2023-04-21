const sqlite3 = require('sqlite3').verbose();
let slq_create_table
let insert_data
let get_data

const db = new sqlite3.Database("./archive.db", sqlite3.OPEN_READWRITE, (err) => {
  
  if (err) return console.error(err.message);
});

slq_create_table = `CREATE TABLE archive(id INTEGER PRIMARY KEY, title, author, section, x, y, barcode, description, on_loan)`;
insert_data = `INSERT INTO archive(title, author, section, x, y, barcode, description, on_loan) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
update_data = `UPDATE archive SET title = ?, author = ?, section = ?, x = ?, y = ?, barcode = ?, description = ?, on_loan = ? WHERE id = ? `;
get_data = `SELECT * FROM archive`;

db.run(slq_create_table, 
  (err) => {
    if (err) return console.error(err.message) 
  })