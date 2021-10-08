import path from "path";
import router from "./router";

console.log(__dirname);

router.get("/bundle", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../frontend/main.bundle.js"));
});

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../frontend/main.html"));
});
