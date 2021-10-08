import router from "./router";
import {
  getBreeds,
  getCategories,
  getCats,
  getLocalBreeds,
  getLocalCategories,
  getLocalCats,
} from "../controllers/cat";

router.get("/api/cat", getCats);
router.get("/api/cat/breeds", getBreeds);
router.get("/api/cat/categories", getCategories);

router.get("/api/cat/local", getLocalCats);
router.get("/api/cat/local/breeds", getLocalBreeds);
router.get("/api/cat/local/categories", getLocalCategories);
