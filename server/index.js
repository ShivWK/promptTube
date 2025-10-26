const express = require("express");
const cors = require("cors");
const app = express();

const youtubeRouter = require("./routes/youtubeRouter");

app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://prompttube-ai.shivendra.site",
]

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.get("/", (req, res) => {
    res.status(200).send("PromptTube proxy server is running")
})

app.get("/api/server/wake-up", (req, res) => {
    console.log("Wake up call received");
    res.status(200).json({
        status: "success",
        message: "I'm awake"
    })
})

app.use("/api/v1/youtube", youtubeRouter);

app.use((req, res) => {
    res.status(404).send("Not found");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`PromptTube proxy server is running on port ${PORT}`)
})