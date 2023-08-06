import { Router } from "express";
import { 
  DeleteProduct_Ctrl,
  PutProduct_Ctrl,
  getProductId_Ctrl,
  getProduct_Ctrl,
  postProduct_Ctrl } from "../controllers/products.controller.js";

const productsRouter = Router();

//GETS
productsRouter.get("/",getProduct_Ctrl);
productsRouter.get("/:pid",getProductId_Ctrl);

//POST
productsRouter.post("/", postProduct_Ctrl);

//DELETE
productsRouter.delete("/:pid",DeleteProduct_Ctrl);

//PUTT
productsRouter.put("/:id",PutProduct_Ctrl);

export default productsRouter;
