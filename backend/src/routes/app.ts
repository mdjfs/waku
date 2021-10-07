import User from "../database/models/user";
import { auth } from "../middleware/auth";
import router from "./router";

router.get("/", auth, (req, res) => {
  const user = req.user as User;
  res.send(`Hello ${user.name} !`);
});
