require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/tts", async (req, res) => {

  try {
    const { text } = req.body;
    const response = await axios.post(
      "https://api.play.ht/api/v2/tts/stream",
      {
        voice: "s3://voice-cloning-zero-shot/9f1ee23a-9108-4538-90be-8e62efc195b6/charlessaad/manifest.json",
        output_format: "mp3",
        voice_engine: "PlayDialog",
        text: text,
        language: 'greek'
      },
      {
        headers: {
          accept: "audio/mpeg",
          "content-type": "application/json",
          AUTHORIZATION: process.env.VITE_TTS_KEY,
          "X-USER-ID": process.env.VITE_TTS_ID,
        },
        responseType: "arraybuffer", // Important for audio
      }
    );

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching TTS:", error.response ? error.response.data : error);
    res.status(500).json({ error: "Failed to fetch audio" });
  }
});

app.post("/api/analyse", async (req, res) => {
  try {
    // const clientApiKey = req.headers["authorization"];
    // if (!clientApiKey) {
    //   return res.status(401).json({ error: "API key missing in header" });
    // }
    const response = await axios.post(
      "https://logos-ai.koyeb.app/analyse",
      req.body,
      {
        headers:
        {
          "content-type": "application/json",
          Authorization: process.env.GEMINI_API_KEY,
        },
        responseType: "json"
      }
    );

    res.setHeader("Content-Type", "application/json");
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching TTS:", error);
    res.status(500).json({ error: "Failed to fetch audio" });
  }
})
app.listen(8080, () => console.log("Server running on port 8080"));
