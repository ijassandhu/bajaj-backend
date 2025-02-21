const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "https://bajaj-frontend-gamma-lilac.vercel.app", // Replace with your allowed domain
  })
);

const USER_ID = "jaskeerat_singh_2236829"; // Hardcoded for now
const EMAIL = "2236829.cse.cec@cgc.edu.in";
const ROLL_NUMBER = "2236829";

// POST /bfhl - Process input data
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ is_success: false, message: "Invalid input format" });
    }

    console.log("Raw Input Data:", data);

    // Ensure all elements are properly formatted
    const cleanedData = data.map((item) =>
      typeof item === "string" ? item.trim() : String(item).trim()
    );
    console.log("Cleaned Data:", cleanedData);

    const numbers = cleanedData.filter((item) => !isNaN(item));

    // Debugging alphabet filtering
    console.log("Before filtering alphabets:", cleanedData);
    const alphabets = cleanedData.filter((item) => /^[a-zA-Z]$/.test(item));
    console.log("Filtered Alphabets:", alphabets);

    const highestAlphabet = alphabets.length
      ? [
          alphabets.reduce((max, char) =>
            char.toLowerCase() > max.toLowerCase() ? char : max
          ),
        ]
      : [];

    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server error" });
  }
});

// GET /bfhl - Return hardcoded operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
