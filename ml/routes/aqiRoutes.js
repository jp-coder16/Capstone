const express = require("express");
const { spawn } = require("child_process");

const router = express.Router();

router.post("/predict", (req, res) => {
    const features = req.body.features;

    if (!features) {
        return res.status(400).json({ error: "Features missing" });
    }

    const pythonProcess = spawn("python", [
        "ml/api.py",
        JSON.stringify(features)
    ]);

    let dataString = "";
    let errorString = "";

    pythonProcess.stdout.on("data", (data) => {
        dataString += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        errorString += data.toString();
    });

    pythonProcess.on("close", (code) => {
        if (code !== 0) {
            console.error("Python Error:", errorString);
            return res.status(500).json({ error: "ML execution failed" });
        }

        try {
            const result = JSON.parse(dataString);
            res.json(result);
        } catch (err) {
            console.error("Parse Error:", err, dataString);
            res.status(500).json({ error: "Invalid ML response" });
        }
    });
});

module.exports = router;