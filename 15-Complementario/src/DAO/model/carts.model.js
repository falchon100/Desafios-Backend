import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  carts: Array,
});

export const cartModel = mongoose.model(cartsCollection, cartsSchema);
