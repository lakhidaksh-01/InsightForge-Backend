export const analyzeData = (data) => {
  if (!data || data.length === 0) {
    return {
      stats: {},
      insights: {},
      chartData: [],
      rawSummary: "Empty dataset",
    };
  }

  const totalRows = data.length;

  const columns = Object.keys(data[0] || {});
  const totalColumns = columns.length;

  // Missing values
  let missingCount = 0;

  data.forEach((row) => {
    columns.forEach((col) => {
      if (
        row[col] === null ||
        row[col] === undefined ||
        row[col] === ""
      ) {
        missingCount++;
      }
    });
  });

  // Duplicate rows
  const uniqueRows = new Set(data.map((row) => JSON.stringify(row)));
  const duplicateRows = totalRows - uniqueRows.size;

  // 🔥 FORCE SALES COLUMN (IMPORTANT)
  const numericColumn = "sales";

  // 🔥 CHART DATA (clean + meaningful)
  let chartData = data.map((row) => ({
    label: row.date || row.product || `Item ${row.id || ""}`,
    y: row[numericColumn] || 0,
  }));

  // 🔥 TREND ANALYSIS
  let trend = "stable";

  if (chartData.length > 1) {
    const first = chartData[0].y;
    const last = chartData[chartData.length - 1].y;

    if (last > first) trend = "increasing";
    else if (last < first) trend = "decreasing";
  }

  // 🔥 TOP PRODUCT ANALYSIS
  const productSales = {};

  data.forEach((row) => {
    if (row.product) {
      productSales[row.product] =
        (productSales[row.product] || 0) + (row.sales || 0);
    }
  });

  const topProduct = Object.entries(productSales).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // 🔥 SUGGESTIONS (SMART + SALES-BASED)
  const suggestions = [];

  if (missingCount > 0) {
    suggestions.push("Clean missing data to improve accuracy.");
  }

  if (duplicateRows > 0) {
    suggestions.push("Remove duplicate rows for better analysis.");
  }

  if (trend === "increasing") {
    suggestions.push("Sales are growing. Consider scaling successful products.");
  } else if (trend === "decreasing") {
    suggestions.push("Sales are dropping. Analyze weak products or regions.");
  }

  if (topProduct) {
    suggestions.push(
      `Top selling product: ${topProduct[0]} with total sales ${topProduct[1]}`
    );
  }

  // 🔥 RAW SUMMARY (for chat)
  const rawSummary = `
Dataset Summary:
- Total Rows: ${totalRows}
- Total Columns: ${totalColumns}
- Missing Values: ${missingCount}
- Duplicate Rows: ${duplicateRows}
- Trend: ${trend}
- Top Product: ${topProduct ? topProduct[0] : "N/A"}
  `.trim();

  return {
    stats: {
      totalRows,
      totalColumns,
      missingCount,
      duplicateRows,
      columns,
    },

    insights: {
      trend,
      topProduct: topProduct ? topProduct[0] : null,
      suggestions,
    },

    chartData,

    rawSummary,
  };
};