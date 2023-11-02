// const sqlite3 = require("sqlite3").verbose();
// const fs = require("fs");
// const dbName = "project_DB";
// let db;

// /**
//  * 1. Create a DB file if there doesn't exist already
//  * 2. Connect to the Database
//  * 3. Create users table
//  * 4. Create prompt_history table
//  */

// try {
//   createDatabase((err) => {
//     if (err != null) {
//       console.log("Error While Creating db file inside ./database/ folder");
//       throw err;
//     }

//     db = new sqlite3.Database(
//       "./database/" + dbName + ".db",
//       sqlite3.OPEN_READWRITE,
//       (err) => {
//         if (err) {
//           return console.error(err.message);
//         }
//         console.log(`Connected to the database ${dbName}.db`);
//       },
//     );
//   });
// } catch (e) {
//   console.log(e);
// }

// // Create a file named project_DB.db if not present
// function createDatabase(callback) {
//   // open function with filename, file opening mode and callback function
//   fd = fs.open("./database/" + dbName + ".db", "w+", function (err, file) {
//     if (err) throw callback(err);
//     console.log("Created DB");
//     return callback(null);
//   });

//   // fs.close(fd, (err)=>{
//   //     if (err) {
//   //         console.log("Problems with closing the file");
//   //         throw callback(err);
//   //     }

//   //     return callback(null)
//   // })
// }
