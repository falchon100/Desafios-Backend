import { Router } from "express";
import CartManager from "../DAO/CartManager.js";
import CartsDao from "../DAO/CartDao.js";

const cartsRouter = Router();

export default cartsRouter;

//GETS
cartsRouter.get("/", async (req, res) => {
  res.send(await cartDao.readCarts());
  /*   res.send(await cart.readCarts()); */
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    const response = await cartDao.getCartsById(id);
    /*  const response = await cart.getCartById(id); */
    if (response.status !== "Exitoso") {
      return res.status(404).send(response);
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    console.log(error);
  }
});

//POST
cartsRouter.post("/", async (req, res) => {
  res.send(await cartDao.addCarts());
  /*  res.send(await cart.addCarts()); */
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await cartDao.addProductToCart(cartId, productId));
});

//DELETE
cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  res.send(await cartDao.deleteProductToCart(cartId, productId));
});

cartsRouter.delete("/:cid", async (req, res) => {
  let cartId = req.params.cid;
  res.send(await cartDao.deleteCart(cartId));
});

//UPDATE

cartsRouter.put("/:cid", async (req, res) => {
  let cartId = req.params.cid;
  let product = req.body;
  res.send(await cartDao.updateCart(cartId, product));
});

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
  let cartId = req.params.cid;
  let productId = req.params.pid;
  let quantity = req.body.quantity;
  res.send(await cartDao.updateproductToCart(cartId, productId, quantity));
});

const cartDao = new CartsDao();
