const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const spotifyRoutes = require("./routes/spotify");

require("dotenv").config();

const app = express();
const PORT = 5001; // Use any port you like

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/spotify", spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
