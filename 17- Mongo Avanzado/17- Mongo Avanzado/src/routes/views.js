import { Router } from "express";
import ProductManager from "../DAO/ProductManager.js";
import ProductDao from "../DAO/ProductDao.js";
import CartsDao from "../DAO/CartDao.js";
import { productModel } from "../DAO/model/products.model.js";

const views = Router();


const productos = new ProductManager();
const producDao = new ProductDao();
const cartDao = new CartsDao();

views.get("/", async (req, res) => {
  const allProducts = await producDao.getProducts();
  res.render("home", {
    title: "express avanzado | Handlebars",
    products: JSON.parse(JSON.stringify(allProducts)),
  });
});

views.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

views.get("/chat", async (req, res) => {
  res.render("chat");
});

views.get("/products", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit =parseInt(req.query.limit) || 10 ;
  const category  = req.query.category;
  const sort = req.query.sort;

  const options = {
    page: page, 
    limit: limit, 
      sort: sort === 'asc' ? 'price' : sort === 'desc' ? '-price' : null, 
    lean: true,
}; 

const filter = {};
if (category) {
  filter.category = category;
}


  let result = await productModel.paginate(filter, options);
  console.log(result);
  result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}&limit=${limit}`:'';
  result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}&limit=${limit}`:'';
  res.render("products",result);
});

views.get(`/carts/:cid`, async(req, res) => {
  try {
      let id = req.params.cid;
      const cart = await cartDao.getCartsById(id);
      res.render("carts", { cart: JSON.parse(JSON.stringify(cart[0]))});
  } catch (error) {
      console.log(error);
  }
})


export default views;
