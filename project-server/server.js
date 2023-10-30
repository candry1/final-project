const express = require("express");
const app = express();
const router = require("./router");
const port = 8000;
const cors = require("cors"); // Import the cors package

app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173" })); // Specify the allowed origin
app.use(cors({ origin: "https://getawayguide123.onrender.com/" }));

// Define your routes and API endpoints here
// Apply router
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
