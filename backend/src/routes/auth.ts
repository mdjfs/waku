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

//login template
router.get("/auth", (req, res) => {
  res.send(
    `<a href="/auth/google">Login with google</a> <a href="/auth/facebook">Login with facebook</a>`
  );
});
