const express = require("express");
const { exec } = require("child_process");

const router = express.Router();

router.post("/predict", (req, res) => {

    const features = req.body.features;

    if (!features) {
        return res.status(400).json({ error: "Features missing" });
    }

    const input = JSON.stringify(features);

    const command = `python ml/api.py "${input.replace(/"/g, '\\"')}"`;

    exec(command, (error, stdout, stderr) => {

        console.log("RAW OUTPUT:", stdout);

        if (error) {
            console.error("Execution error:", error);
            return res.status(500).json({ error: "ML execution failed" });
        }

        if (stderr) {
            console.error("Python error:", stderr);
        }

        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (err) {
            console.error("Parsing error:", err);
            res.status(500).json({ error: "Invalid ML response" });
        }
    });
});

module.exports = router;