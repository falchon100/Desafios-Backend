import express from "express";
import cartsRouter from "./routes/carts.js";
import productsRouter from "./routes/products.js";
import handlebars from "express-handlebars";
import views from "./routes/views.js";
import { Server } from "socket.io";
import ProductManager from "./DAO/ProductManager.js";
import mongoose from "mongoose";
import MessageDao from "./DAO/MessageDao.js";

const app = express();
const port = 8080;

const server = app.listen(port, () => console.log("creando servidor"));
// io sera el servidor para trabajar con socket
const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//establezco los endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//configuro handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use("/", views);
app.use(express.static("public"));

mongoose
  .connect(
    "mongodb+srv://Coder:Peperoni1@coder.dpq8rj5.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("database connect "))
  .catch((error) => console.log(error));

// el on significa que esta escuchando que pase algo en este caso escucha connection y trasmite el mensaje nuevo cliente conectado
io.on("connection", async (socket) => {
  console.log("nuevo cliente conectado");

  // Envio la lista productos a traves de listProduct
  const product = await productos.getProducts();
  socket.emit("listProduct", product);

  socket.on("historial", async () => {
    io.emit("messageLogs", await Messages.getMessages());
  });

  socket.on("message", async (data) => {
    await Messages.addMessages(data.user, data.message);
    io.emit("messageLogs", await Messages.getMessages());
  });

  // escucho el eliminarProducto que trae el Id cliqueado para poder borrarlo
  socket.on("eliminarProducto", async (id) => {
    await productos.deleteProduct(id);
  });

  //escucho los datos del socket que me trae todos los values para poder agregar un nuevo producto
  socket.on("addproduct", async (data) => {
    await productos.addProduct(
      data.title,
      data.description,
      data.code,
      data.price,
      data.stock,
      data.category,
      data.thumbnails
    );
  });
});

//inicializo la clase
const productos = new ProductManager();
const Messages = new MessageDao();
