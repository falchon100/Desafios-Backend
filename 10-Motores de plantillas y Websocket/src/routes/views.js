import { Router } from "express";
import ProductManager from "../ProductManager.js";

const views = Router();

const productos = new ProductManager();

views.get("/", async (req, res) => {
  const allProducts = await productos.getProducts();
  res.render("home", {
    title: "express avanzado | Handlebars",
    products: allProducts,
  });
});

views.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

export default views;
