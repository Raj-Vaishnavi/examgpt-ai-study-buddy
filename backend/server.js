require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PDF Routes
app.use("/api/pdf", pdfRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "ExamGPT Backend Running 🚀",
  });
});

// AI Test Route
app.get("/test-ai", async (req, res) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content:
              "Explain Artificial Intelligence in very easy language",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer =
      response.data.choices[0].message.content;

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.log(
      "AI ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.response?.data || error.message,
    });
  }
});

// Server Port
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});