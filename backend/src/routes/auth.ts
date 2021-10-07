import passport from "passport";
import router from "./router";

// Facebook OAUTH Callback
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
// Facebook OAUTH Request
router.get("/auth/facebook", passport.authenticate("facebook"));

// Google OAUTH Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
// Google OAUTH Request
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

// login status
router.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user).status(200);
  } else res.send("Not logged-in").status(403);
});
