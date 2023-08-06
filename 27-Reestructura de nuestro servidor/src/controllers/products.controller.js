import ProductDao from "../DAO/ProductDao.js";

const productDao = new ProductDao();


//GET
export const getProduct_Ctrl =  async (req, res) => {
    const { limit } = req.query;
    const productos = await productDao.getProducts();
    console.log(productos);
    limit ? res.send(productos.slice(0, limit)) : res.send(productos);
  }

export const getProductId_Ctrl =  async (req, res) => {
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
  }  

//POST
export const postProduct_Ctrl = async (req, res) => {
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
  }
//UPDATE
export const PutProduct_Ctrl =  async (req, res) => {
    let producto = req.body;
    let id = req.params.id;
    const response = await productDao.updateProduct(id, producto);
    /*  const response = await producto.updateProduct(id, productoo); */
    if (response.status !== "producto actualizado") {
      res.status(404).send(response);
    } else {
      res.status(200).send(response);
    }
  }

//DELETE
export const DeleteProduct_Ctrl =  async (req, res) => {
    const id = req.params.pid;
    const response = await productDao.deleteProduct(id);
    if (response.status !== "Exitoso") {
      res.status(404).send(response);
    } else {
      res.status(200).send(response);
    }
  }