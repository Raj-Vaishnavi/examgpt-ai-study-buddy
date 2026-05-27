import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pdf/upload",
        formData
      );

      setExtractedText(response.data.extractedText);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Error uploading PDF");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>ExamGPT 📘</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={handleUpload}>
        Upload PDF
      </button>

      <div style={{ marginTop: "30px" }}>
        <h2>Extracted Text</h2>
        <p style={{ whiteSpace: "pre-wrap" }}>
          {extractedText}
        </p>
      </div>
    </div>
  );
}

export default App;