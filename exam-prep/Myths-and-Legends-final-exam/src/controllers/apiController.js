import { Router } from "express";
import { mythService } from "../services/index.js";

const apiController = Router();

apiController.get("/report/myths/latest", async (req, res) => {
  try {
    const myths = await mythService.getLatestForReport();
    res.json(myths);
  } catch (error) {
    console.error("Error fetching latest myths:", error);
    res.status(500).json({ error: "Failed to fetch myths" });
  }
});

export default apiController;
