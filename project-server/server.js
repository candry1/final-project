const express = require("express");
const app = express();
const router = require("./router");
const port = process.env.PORT || 6000;

app.use(express.json());

// Define your routes and API endpoints here
// Apply router
app.use("/", router);

// Define a route for making the Amadeus API call
// app.post("/amadeus-api", async (req, res) => {
//   try {
//     const { client_id, client_secret } = req.body; // Your Amadeus API credentials

//     // Make a POST request to the Amadeus API
//     const response = await axios.post(
//       "https://test.api.amadeus.com/v1/security/oauth2/token",
//       {
//         grant_type: "client_credentials",
//         client_id,
//         client_secret,
//       }
//     );

//     // Handle the API response here
//     res.json(response.data);
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
