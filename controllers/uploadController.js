import { parseFile } from "../utils/fileParser.js";
import { analyzeData } from "../services/analysisService.js";
import { getAIInsights } from "../services/aiService.js";
import { checkUploadLimit } from "../utils/limitStore.js";

export const handleUpload = async (req, res) => {
  try {
    const ip = req.ip;

    // Check upload limit
    if (!checkUploadLimit(ip)) {
      return res.status(429).json({
        message: "Daily upload limit reached (5 files). Try tomorrow 😌",
      });
    }

    // Validate file
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { path: filePath } = req.file;

    // Parse file
    const data = await parseFile(filePath);

    // Analyze data
    const analysis = analyzeData(data);

    // AI insights (fallback if fails)
    let insights = "Basic analysis completed.";
    try {
      insights = await getAIInsights(analysis);
    } catch (err) {
      insights = "AI insights temporarily unavailable.";
    }

    return res.json({ analysis, insights });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      message: "Processing failed",
      error: error.message,
    });
  }
};