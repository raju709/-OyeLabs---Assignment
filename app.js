// 1. Make a api for phone number login

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

// I create MySql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "user_name",
  password: "user_password",
  database: "user_database",
});

// Connecting to MySql

connection.connect((error) => {
  if (error) {
    console.log(`Error connecting to Mysql: ${error}`);
    return;
  }
  console.log("Connected to Mysql");
});

// Middleware for JSON request bodies
app.use(bodyParser.json());

app.post("/api/customers", (request, response) => {
  const { name, phoneNumber } = request.body;

  if (!name || !phoneNumber) {
    return response.send(`Name and PhoneNumber are required`);
  }

  // Checking for duplicate phone numbers
  const checkDuplicateQuery = `SELECT 
            COUNT(*) AS count 
        FROM    
        customers 
        WHERE
            phoneNumber = ?`;
  connection.query(checkDuplicateQuery, [phoneNumber], (error, results) => {
    if (error) {
      console.log(`Error checking for duplicates:${error}`);
      return response.send(`Internal server error`);
    }

    const count = results[0].count;
    if (count > 0) {
      return response.send("Phone number already exists");
    }

    // Inserting New Customer into the database
    const insertQuery = `
        INSERT 
            INTO customers(name, phonNumber)
            VALUES(?, ?)`;
    connection.query(insertQuery, [name, phoneNumber], (error) => {
      if (error) {
        console.log(`Error adding customer:${error}`);
        return response.send("Internal server error");
      }
      return response.send("Customer added Successfully");
    });
  });
});

// Start the Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});

/* Requesting to 

http://localhost:3000/api/customers 

json

{
    "name": "Raju Kunchala",
    "phoneNumber":"1234567890"
}

*/
