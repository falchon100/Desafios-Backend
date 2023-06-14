import { productModel } from "./model/products.model.js";

class ProductDao {
  constructor() {
    this.model = productModel;
  }

  async getProducts() {
    let productos = await productModel.find();
    return productos;
  }

  async addProduct(
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails
  ) {
    let producto;
    try {
      producto = await productModel.create({
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails,
      });
    } catch (error) {
      console.log(error);
    }
    return producto;
  }

  async getProductById(id) {
    try {
      let productos = await productModel.find({ _id: id });
      return { status: "Exitoso", productos };
    } catch (error) {
      return { status: "No se encontro el producto" };
    }
  }

  async deleteProduct(id) {
    await productModel.deleteOne({ _id: id });
    return {
      status: "Exitoso",
      payload: `el producto '${id}' se borro correctamente`,
    };
  }

  async updateProduct(id, properties) {
    let producto;
    try {
      producto = await productModel.updateOne({ _id: id }, properties);
    } catch (error) {
      console.log(error);
    }
    return producto;
  }
}

export default ProductDao;
