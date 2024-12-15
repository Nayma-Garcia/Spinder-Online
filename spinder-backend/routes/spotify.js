const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();

// Get Spotify Access Token
router.get("/token", async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenUrl = process.env.SPOTIFY_API_TOKEN_URL;

  const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      tokenUrl,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    res.status(500).json({ error: "Failed to get access token" });
  }
});

// Example: Search Spotify API
router.get("/search", async (req, res) => {
  const { query } = req.query;
  const accessToken = req.headers.authorization;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search`,
      {
        params: { q: query, type: "track", limit: 10 },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error searching Spotify API:", error.message);
    res.status(500).json({ error: "Failed to search Spotify API" });
  }
});

module.exports = router;
