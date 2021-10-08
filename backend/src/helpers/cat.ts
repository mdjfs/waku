import { CatParams } from "../controllers/cat";

/**
 * Utility to extract categories or breeds, and their relations from a cat array.
 * Return example (for categories):
 * [
 * [{id: 5, name:"hats"}],
 * [{catId: 3, categoryId: 5}, {catId: 6, categoryId: 5}, {catId: 2, categoryId: 5}]
 * ]
 */
export function getSub(cats, to: "breeds" | "categories") {
  const base = [];
  const relations = [];
  for (const cat of cats) {
    for (const obj of cat[to] || []) {
      base.push(obj);
      const relation = {};
      const left = "catId";
      const right = to === "breeds" ? "breedId" : "categoryId";
      relation[left] = cat.id;
      relation[right] = obj.id;
      relations.push(relation);
    }
  }
  return [
    base.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i),
    relations,
  ];
}

/**
 * Transform CatParams object to URI GET string params
 */
export function catParamsToURL(params: CatParams): string {
  const url = [];
  for (const [key, value] of Object.entries(params)) {
    url.push(`${key}=${value}`);
  }
  return "?" + url.join("&");
}
