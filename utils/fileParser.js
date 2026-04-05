import fs from "fs";
import csv from "csv-parser";
import xlsx from "xlsx";

export const parseFile = (filePath) => {
  return new Promise((resolve, reject) => {

    // 👉 If file is CSV
    if (filePath.endsWith(".csv")) {
      let data = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => data.push(row))   // store each row
        .on("end", () => resolve(data))        // return all data
        .on("error", (err) => reject(err));   // handle error

    } else {
      // 👉 If file is Excel

      const file = xlsx.readFile(filePath);           // read file
      const sheet = file.Sheets[file.SheetNames[0]];  // first sheet
      const data = xlsx.utils.sheet_to_json(sheet);   // convert to JSON

      resolve(data); // return data
    }
  });
};