import { Router } from "express";
import { requireLogin } from "../middleware/auth.js";
import {  
  base_Ctrl,
  cardId_Ctrl,
  chat_Ctrl,
  product_Ctrl,
  realTimeProducts_Ctrl } from "../controllers/views.controller.js";

const views = Router();

// VISTAS GET
views.get('/',base_Ctrl)
views.get("/realtimeproducts",realTimeProducts_Ctrl);
views.get("/chat",chat_Ctrl);
views.get("/products",requireLogin,product_Ctrl);
views.get(`/carts/:cid`,cardId_Ctrl)


export default views;
