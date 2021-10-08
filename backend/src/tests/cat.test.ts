import { catParamsToURL, getSub } from "../helpers/cat";

describe("Cat Helper", () => {
  it("should return ?limit=5&page=5 for { limit: '5', page: '5' }", () => {
    expect(catParamsToURL({ limit: "5", page: "5" })).toBe("?limit=5&page=5");
  });

  it("should return [[{id: 1, name:'hats'}], [{catId: 'c', categoryId: 1}, {catId: 'd', categoryId: 1}]]", () => {
    expect(
      getSub(
        [
          {
            breeds: [],
            categories: [{ id: "1", name: "hats" }],
            id: "c",
            url: "https://24.media.tumblr.com/tumblr_krxn0o9cPS1qa9hjso1_1280.jpg",
            width: 1500,
            height: 1000,
          },
          {
            breeds: [],
            categories: [{ id: "1", name: "hats" }],
            id: "d",
            url: "https://25.media.tumblr.com/tumblr_krww7pEgmK1qa9hjso1_1280.jpg",
            width: 800,
            height: 600,
          },
        ],
        "categories"
      )
    ).toMatchObject([
      [{ id: "1", name: "hats" }],
      [
        { catId: "c", categoryId: "1" },
        { catId: "d", categoryId: "1" },
      ],
    ]);
  });
});
