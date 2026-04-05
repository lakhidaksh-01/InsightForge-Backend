import { askAI } from "../services/aiService.js";
import { checkAskLimit } from "../utils/limitStore.js";

export const askController = async (req, res) => {
  try {
    const ip = req.ip;
    const { question, analysis } = req.body;

    // 🔴 Check limit
    if (!checkAskLimit(ip)) {
      return res.status(429).json({
        message: "Daily limit reached (3 questions). Try tomorrow 😌"
      });
    }

    const answer = await askAI(question, analysis);

    res.json({ answer });

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
};