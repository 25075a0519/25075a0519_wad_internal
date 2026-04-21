const express = require("express");
const app = express();

app.use(express.json()); // to read JSON body

// In-memory "database"
let students = [
  { id: 1, name: "John", age: 20 },
  { id: 2, name: "Sara", age: 22 }
];

// -------------------- CREATE --------------------
app.post("/students", (req, res) => {
  const student = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  students.push(student);
  res.status(201).json(student);
});

// -------------------- READ ALL --------------------
app.get("/students", (req, res) => {
  res.json(students);
});

// -------------------- READ BY ID --------------------
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// -------------------- UPDATE --------------------
app.put("/students/:id", (req, res) => {
  const student = students.find(s => s.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name || student.name;
  student.age = req.body.age || student.age;

  res.json(student);
});

// -------------------- DELETE --------------------
app.delete("/students/:id", (req, res) => {
  students = students.filter(s => s.id != req.params.id);

  res.json({ message: "Student deleted successfully" });
});

// -------------------- START SERVER --------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});