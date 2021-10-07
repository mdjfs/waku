import axios from "axios";
import { Request, Response } from "express";
import { Fn } from "sequelize/types/lib/utils";
import config from "../config";
import sequelize from "../database";
import Breed from "../database/models/breed";
import Cat from "../database/models/cat";
import CatBreed from "../database/models/catBreed";
import CatCategory from "../database/models/catCategory";
import Category from "../database/models/category";
import User from "../database/models/user";

interface CatParams {
  limit?: string;
  page?: string;
  order?: "Asc" | "Desc" | "Rand";
  category_ids?: string;
  breed_ids?: string;
}

function catParamsToURL(params: CatParams): string {
  const url = [];
  for (const [key, value] of Object.entries(params)) {
    url.push(`${key}=${value}`);
  }
  return "?" + url.join("&");
}

async function getApiCats(params: CatParams) {
  const url = config.catApi.url + "/images/search" + catParamsToURL(params);
  const response = await axios.get(url, {
    headers: { "x-api-key": config.catApi.key },
  });
  const cats: Cat[] = response.data;
  return cats;
}

async function getDatabaseCats(params: CatParams) {
  const page = parseInt(params.page || "1") - 1;
  const limit = parseInt(params.limit || "1");
  const offset = page * limit;
  const include = [];
  let order: Array<[string, string]> | Fn = [["id", "DESC"]];
  if (params.order === "Rand") order = sequelize.random();
  if (params.order === "Asc") order = [["id", "ASC"]];
  if (params.breed_ids) {
    include.push({
      model: Breed,
      through: { where: { breedId: params.breed_ids } },
    });
  }
  if (params.category_ids) {
    include.push({
      model: Category,
      through: { where: { categoryId: params.category_ids } },
    });
  }
  include.push({ model: User });
  const cats: Cat[] = await Cat.findAll({
    offset,
    limit,
    include,
    order,
  });
  return cats;
}

function get(cats: Cat[], key: string, left: string, right: string) {
  const base = [];
  const relations = [];
  for (const cat of cats) {
    for (const obj of cat[key] || []) {
      base.push(obj);
      const relation = {};
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

export async function getCats(req: Request, res: Response) {
  try {
    const cats: Cat[] = await getApiCats(req.query);
    const user = req.user as User;
    if (user) for (const cat of cats) cat.requestedById = user.id;
    const [categories, categoryRel] = get(
      cats,
      "categories",
      "catId",
      "categoryId"
    );
    const [breeds, breedsRel] = get(cats, "breeds", "catId", "breedId");
    await Cat.bulkCreate(cats, { ignoreDuplicates: true });
    await Category.bulkCreate(categories, { ignoreDuplicates: true });
    await Breed.bulkCreate(breeds, { ignoreDuplicates: true });
    await CatBreed.bulkCreate(breedsRel, { ignoreDuplicates: true });
    await CatCategory.bulkCreate(categoryRel, { ignoreDuplicates: true });
    res.send(cats);
  } catch (err) {
    res.send(err).status(500);
  }
}

export async function getBreeds(req: Request, res: Response) {
  try {
    const url = config.catApi.url + "/breeds";
    const response = await axios.get(url, {
      headers: { "x-api-key": config.catApi.key },
    });
    const breeds: Breed[] = response.data;
    res.send(breeds);
  } catch (err) {
    res.send(err).status(500);
  }
}

export async function getCategories(req: Request, res: Response) {
  try {
    const url = config.catApi.url + "/categories";
    const response = await axios.get(url, {
      headers: { "x-api-key": config.catApi.key },
    });
    const categories: Category[] = response.data;
    res.send(categories);
  } catch (err) {
    res.send(err).status(500);
  }
}

export async function getLocalCats(req: Request, res: Response) {
  try {
    const cats: Cat[] = await getDatabaseCats(req.query);
    res.send(cats);
  } catch (err) {
    res.send(err).status(500);
  }
}

export async function getLocalCategories(req: Request, res: Response) {
  try {
    const categories: Category[] = await Category.findAll();
    res.send(categories);
  } catch (err) {
    res.send(err).status(500);
  }
}

export async function getLocalBreeds(req: Request, res: Response) {
  try {
    const breeds: Breed[] = await Breed.findAll();
    res.send(breeds);
  } catch (err) {
    res.send(err).status(500);
  }
}
