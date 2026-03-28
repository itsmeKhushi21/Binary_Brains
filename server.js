const express = require("express");
const cors = require("cors");
const { tasks, timeline, reflections } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- HOME ----------------
app.get("/", (req, res) => {
  res.json({ message: "Corpfolio AI Backend Running 🚀" });
});

// ---------------- AI COACH ----------------
app.post("/api/coach", (req, res) => {
  const { input } = req.body;

  let suggestions = [];

  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }

  const text = input.toLowerCase();

  if (text.includes("study")) {
    suggestions = [
      "Break study into 25-minute sessions.",
      "Start with the hardest topic first.",
      "Write one key insight after each chapter."
    ];
  } else if (text.includes("project")) {
    suggestions = [
      "Start with the smallest working feature.",
      "Focus on demo-ready output first.",
      "Track all progress in your timeline."
    ];
  } else if (text.includes("productivity")) {
    suggestions = [
      "Finish one deep task before switching.",
      "Avoid multitasking for 1 hour.",
      "Track your completion rate in dashboard."
    ];
  } else {
    suggestions = [
      "Focus on one important task.",
      "Capture what you learn.",
      "Small progress compounds fast."
    ];
  }

  res.json({ suggestions });
});

// ---------------- TASKS ----------------
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ---------------- TIMELINE ----------------
app.get("/api/timeline", (req, res) => {
  res.json(timeline);
});

app.post("/api/timeline", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Timeline text is required" });
  }

  const newEntry = {
    id: timeline.length + 1,
    text,
    date: new Date().toLocaleString(),
  };

  timeline.push(newEntry);
  res.status(201).json(newEntry);
});

// ---------------- REFLECTION ----------------
app.get("/api/reflections", (req, res) => {
  res.json(reflections);
});

app.post("/api/reflections", (req, res) => {
  const { win, improve } = req.body;

  if (!win || !improve) {
    return res.status(400).json({ error: "Both fields are required" });
  }

  const newReflection = {
    id: reflections.length + 1,
    win,
    improve,
    date: new Date().toLocaleString(),
  };

  reflections.push(newReflection);
  res.status(201).json(newReflection);
});

// ---------------- START SERVER ----------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});