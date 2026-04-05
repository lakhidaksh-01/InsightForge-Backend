import dotenv from "dotenv";

dotenv.config();

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getAIInsights = async (analysis) => {
  try {
    await delay(800);

    const { stats, insights } = analysis;

    return `
📊 Sales Overview:
- Total Records: ${stats.totalRows}
- Features: ${stats.totalColumns}
- Missing Values: ${stats.missingCount}
- Duplicate Rows: ${stats.duplicateRows}
- Trend: ${insights.trend}
- Top Product: ${insights.topProduct || "N/A"}

⚠️ Data Quality:
${
  stats.missingCount > 0
    ? `- ${stats.missingCount} missing values detected (may impact accuracy).`
    : "- Data is clean with no missing values."
}
${
  stats.duplicateRows > 0
    ? `- ${stats.duplicateRows} duplicate rows found.`
    : "- No duplicate records detected."
}

💡 Key Recommendations:
${insights.suggestions.map((s) => `- ${s}`).join("\n")}

📈 Business Insight:
- Sales trend is ${insights.trend}.
- Focus on top-performing products to maximize revenue.
- Use this data to improve sales strategy and decision making.

🚀 Conclusion:
This dataset is suitable for business analysis and can help in identifying growth opportunities.
    `;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate insights");
  }
};

export const askAI = async (question, analysis) => {
  try {
    await delay(500);

    const q = question.toLowerCase();
    const { stats, insights } = analysis;

    // 🔥 Sales-specific responses

    if (q.includes("top product")) {
      return `🤖 Top selling product is ${insights.topProduct || "not available"} 📦`;
    }

    if (q.includes("missing")) {
      return `🤖 There are ${stats.missingCount} missing values in the dataset.`;
    }

    if (q.includes("duplicate")) {
      return `🤖 There are ${stats.duplicateRows} duplicate rows detected.`;
    }

    if (q.includes("trend") || q.includes("performance")) {
      return `🤖 The sales trend is ${insights.trend}.`;
    }

    if (q.includes("improve") || q.includes("suggest")) {
      return insights.suggestions.length
        ? `🤖 Suggestions:\n${insights.suggestions
            .map((s) => `- ${s}`)
            .join("\n")}`
        : "🤖 Your data is clean and well-structured.";
    }

    if (q.includes("sales")) {
      return `🤖 The system is analyzing sales data. Current trend: ${insights.trend}.`;
    }

    // 🔥 Default smart response (feels like AI)
    return `🤖 Based on your sales data, the system shows a ${insights.trend} trend with ${stats.missingCount} missing values. Ask about top products, trends, or improvements for deeper insights.`;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get AI answer");
  }
};