import User from "../database/models/user";
import router from "./router";

router.get("*", (req, res) => {
  const user = req.user as User;
  res.send(`Hello ${user ? user.name : " "} !`);
});
