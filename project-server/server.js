const express = require("express");
const app = express();
const router = require("./router");
const port = 8000;
const cors = require("cors"); // Import the cors package

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://getawayguide1234.onrender.com"],
  })
);

// Define your routes and API endpoints herevscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html
// Apply router
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
