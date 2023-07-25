import { Router } from "express";
import ProductManager from "../DAO/ProductManager.js";
import ProductDao from "../DAO/ProductDao.js";


const productsRouter = Router();

// GETS
productsRouter.get("/", async (req, res) => {
  const { limit } = req.query;
  const productos = await productDao.getProducts();
  console.log(productos);
  limit ? res.send(productos.slice(0, limit)) : res.send(productos);
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const response = await productDao.getProductById(id);

    if (response.status !== "Exitoso") {
      return res.status(404).send(response);
    } else {
      res.status(200).send(response);
    }
  } catch (error) {
    console.log(error);
  }
});

// POST
productsRouter.post("/", async (req, res) => {
  let { title, description, code, price, stock, category, thumbnails } =
    req.body;
  res.send(
    await productDao.addProduct(
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails
    )
  );
});

// DELETE
productsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const response = await productDao.deleteProduct(id);
  if (response.status !== "Exitoso") {
    res.status(404).send(response);
  } else {
    res.status(200).send(response);
  }
});

// PUTT
productsRouter.put("/:id", async (req, res) => {
  let producto = req.body;
  let id = req.params.id;
  const response = await productDao.updateProduct(id, producto);
  /*  const response = await producto.updateProduct(id, productoo); */
  if (response.status !== "producto actualizado") {
    res.status(404).send(response);
  } else {
    res.status(200).send(response);
  }
});

//inicializo la instancia producto
let producto = new ProductManager();
let productDao = new ProductDao();
export default productsRouter;
