
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Trang chủ
app.get("/", (req, res) => {
    res.send(`
        <h1>DevOps Lab 8 - Continuous Delivery</h1>
        <p>Docker and Jenkins CD Pipeline</p>
        <p>Application is running successfully!</p>
    `);
});

// API kiểm tra trạng thái
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Application is healthy"
    });
});

// Khởi động server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
