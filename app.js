import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // 🔥 MUST BE FIRST


// Import Express framework → used to create backend server
import express from "express";

// Import CORS → allows frontend (React) to talk to backend
import cors from "cors";

// Import your upload routes (file upload API)
import uploadRoutes from "./routes/uploadRoutes.js";

import askRoutes from "./routes/askRoutes.js";


console.log("ENV FILE LOADED:", process.cwd());


// Create an Express app instance
const app = express();


// Enable CORS → prevents "blocked by browser" errors
app.use(cors());

// Enable JSON parsing → allows server to read JSON data from requests
app.use(express.json());


// Register routes → all routes will start with /api
// Example: /api/upload
app.use("/api", uploadRoutes);
app.use("/api", askRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});