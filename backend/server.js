const express = require("express");
const cors = require("cors");

const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// PDF Routes
app.use("/api/pdf", pdfRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "ExamGPT Backend Running 🚀",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});