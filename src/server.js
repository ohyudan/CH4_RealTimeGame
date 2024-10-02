import express from "express";

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log("test");
});
app.get("/", (req, res) => {
  res.status(200).json({ test: "test" });
});
