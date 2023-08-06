import { Router } from "express";
import { 
  deleteCartsProd_Ctrl,
  deleteCarts_Ctrl,
  getCartsId_Ctrl,
  getCarts_Ctrl,
  postCartsProd_Ctrl,
  postCarts_Ctrl,
  putCartsProd_Ctrl,
  putCarts_Ctrl } from "../controllers/carts.controller.js";

const cartsRouter = Router();

export default cartsRouter;
//GETS
cartsRouter.get("/", getCarts_Ctrl);
cartsRouter.get("/:cid",getCartsId_Ctrl);

//POST
cartsRouter.post("/",postCarts_Ctrl);
cartsRouter.post("/:cid/product/:pid",postCartsProd_Ctrl);

//DELETE
cartsRouter.delete("/:cid/product/:pid",deleteCartsProd_Ctrl);
cartsRouter.delete("/:cid",deleteCarts_Ctrl);

//UPDATE
cartsRouter.put("/:cid",putCarts_Ctrl);
cartsRouter.put("/:cid/product/:pid", putCartsProd_Ctrl);

