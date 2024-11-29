import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../serviceController.ts/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/error/validator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { getProducts, updateProduct, getProduct, deleteProduct, createProducts } from "../controllers/catalog.controllers";

const router = express.Router();
export const catalogService = new CatalogService(new CatalogRepository());

router.post("/products", createProducts);

router.patch("/products/:id", updateProduct);

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.delete("/products/:id", deleteProduct);

export default router;
