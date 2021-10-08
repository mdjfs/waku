import axios from "axios";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { Fn } from "sequelize/types/lib/utils";
import config from "../config";
import sequelize from "../database";
import Breed from "../database/models/breed";
import Cat from "../database/models/cat";
import CatBreed from "../database/models/catBreed";
import CatCategory from "../database/models/catCategory";
import Category from "../database/models/category";
import User from "../database/models/user";
import { catParamsToURL, getSub } from "../helpers/cat";

export interface CatParams {
  limit?: string;
  page?: string;
  order?: "Asc" | "Desc" | "Rand";
  category_ids?: string;
  breed_ids?: string;
}

/**
 * Extract cats from CatApi
 */
export async function getApiCats(params: CatParams) {
  const url = config.catApi.url + "/images/search" + catParamsToURL(params);
  const response = await axios.get(url, {
    headers: { "x-api-key": config.catApi.key },
  });
  const cats: Cat[] = response.data;
  return cats;
}

/**
 * Extract cats from database with similar CatApi pagination
 */
export async function getDatabaseCats(params: CatParams) {
  const page = parseInt(params.page || "1") - 1;
  const limit = parseInt(params.limit || "1");
  const offset = page * limit;
  let order: Array<[string, string]> | Fn = sequelize.random();
  const where = {};
  if (params.order === "Desc") order = [["id", "DESC"]];
  if (params.order === "Asc") order = [["id", "ASC"]];
  if (params.breed_ids) {
    const breeds: CatBreed[] = await CatBreed.findAll({
      offset,
      limit,
      order,
      where: { breedId: params.breed_ids },
    });
    where["id"] = {
      [Op.in]: breeds.map((b) => b.catId),
    };
  }
  if (params.category_ids) {
    const categories: CatCategory[] = await CatCategory.findAll({
      offset,
      limit,
      order,
      where: { categoryId: params.category_ids },
    });
    where["id"] = {
      [Op.in]: categories.map((c) => c.catId),
    };
  }
  const cats: Cat[] = await Cat.findAll({
    offset,
    limit,
    include: { all: true },
    order,
    where,
  });
  return cats;
}

/**
 * Get cats from CatApi (Loads every cat fetched in the database)
 */
export async function getCats(req: Request, res: Response) {
  try {
    const cats: Cat[] = await getApiCats(req.query);
    const user = req.user as User;
    if (user) for (const cat of cats) cat.requestedById = user.id;
    const [categories, categoryRel] = getSub(cats, "categories");
    const [breeds, breedsRel] = getSub(cats, "breeds");
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

/**
 * Get breeds from CatApi
 */
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

/**
 * Get categories from CatApi
 */
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

/**
 * Get cats from database
 */
export async function getLocalCats(req: Request, res: Response) {
  try {
    const cats: Cat[] = await getDatabaseCats(req.query);
    res.send(cats);
  } catch (err) {
    res.send(err).status(500);
  }
}

/**
 * get Categories from database
 */
export async function getLocalCategories(req: Request, res: Response) {
  try {
    const categories: Category[] = await Category.findAll();
    res.send(categories);
  } catch (err) {
    res.send(err).status(500);
  }
}

/**
 * Get breeds from database
 */
export async function getLocalBreeds(req: Request, res: Response) {
  try {
    const breeds: Breed[] = await Breed.findAll();
    res.send(breeds);
  } catch (err) {
    res.send(err).status(500);
  }
}
