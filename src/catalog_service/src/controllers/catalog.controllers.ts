import { Request,Response,NextFunction } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/error";
import { CreateProductRequest,UpdateProductRequest } from "../dto/product.dto";

export const catalogService = new CatalogService(new CatalogRepository());

export const getProducts = async (req: Request, res: Response) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
        const data = await catalogService.getProducts(limit, offset);
        res.status(200).json(data);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { errors, input } = await RequestValidator(UpdateProductRequest, req.body);
        const id = parseInt(req.params.id) || 0;

        if (errors) res.status(400).json(errors);

        const data = await catalogService.updateProduct({ id, ...input });
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
        const data = await catalogService.getProduct(id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id) || 0;
    try {
        const data = await catalogService.deleteProduct(id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

export const createProducts = async (req: Request, res: Response) => {
    try {
        const { errors, input } = await RequestValidator(CreateProductRequest, req.body);

        if (errors) res.status(400).json(errors);
        const data = await catalogService.createProduct(input);
        res.status(201).json(data);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
  }