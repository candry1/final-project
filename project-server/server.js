const express = require("express");
const app = express();
const router = require("./router");
const port = process.env.PORT || 6000;

app.use(express.json());

// Define your routes and API endpoints here
// Apply router
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
