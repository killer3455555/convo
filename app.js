
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("NIHAL PAGE SERVER is running!");
});

app.post("/run", upload.single("file"), (req, res) => {
  const { token, uid, name, time } = req.body;
  const file = req.file;

  if (!token || !uid || !name || !time || !file) {
    return res.status(400).json({ error: "Missing fields" });
  }

  console.log("Received Task:");
  console.log({ token, uid, name, time, fileName: file.originalname });

  res.status(200).json({ message: "Task received successfully!" });
});

app.post("/stop", (req, res) => {
  const { taskId } = req.body;

  if (!taskId) {
    return res.status(400).json({ error: "Missing Task ID" });
  }

  console.log("Stopping Task ID:", taskId);
  res.status(200).json({ message: `Task ${taskId} stopped.` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
