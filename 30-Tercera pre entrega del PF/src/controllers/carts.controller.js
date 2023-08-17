import CartsDao from "../DAO/CartDao.js";
import TicketDao from "../DAO/TicketDao.js";
import crypto from 'node:crypto'


const cartDao = new CartsDao;
const ticketDao = new TicketDao;
//GETS
export const getCarts_Ctrl = async (req, res) => {
    res.send(await cartDao.readCarts());
 }

 export const getCartsId_Ctrl = async (req, res) => {
    try {
      const id = req.params.cid;
      const response = await cartDao.getCartsById(id);
      res.send( response );
    } catch (error) {
      res.status(404).send({ error: 'El carrito no existe' });
    }
  }

//POST

export const generateOrder = async(req,res)=>{
  const {cid} = req.params;  //envio el cartId 

  console.log(req.session.user);
  const carrito = await cartDao.getCartsById(cid)
  const totalSum = carrito[0].carts.reduce((accumulator, currentValue) => { //sumo las cantidades del array de carrito y multiplico por cantidad
    return accumulator + currentValue.products.price * currentValue.quantity;
  }, 0);



  let products = {
    code: crypto.randomUUID(),
    purchase_datetime: new Date(),
    amount: totalSum,
    purchaser: "pepe"//email del usuario
}
  await ticketDao.createTicket(products)
  res.status(200).send({status:'se creo correctamente'})
}



  export const postCarts_Ctrl =  async (req, res) => {
    await cartDao.addCarts()
    res.status(200).send({status:'Se agrego correctamente un carrito'} )};

  export const postCartsProd_Ctrl =  async (req, res) => {
        try {
          let cartId = req.params.cid;
          let productId = req.params.pid;
          const response = await cartDao.addProductToCart(cartId, productId)
          res.send(response)
        } catch (error) {
          res.status(404).send({ error: 'El carrito no existe' });
        }
        }
//DELETE
export const deleteCarts_Ctrl =  async (req, res) => {
    let cartId = req.params.cid;
   if (await cartDao.deleteCart(cartId)){
       res.json({status:'Success', msg:'Carrito eliminado'});
   }else
   res.json({status:'Failure', msg:'No existe el carrito a eliminar'})
  }

export const deleteCartsProd_Ctrl =  async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    const response = await cartDao.deleteProductToCart(cartId, productId)
    if (response!== "no existe ese producto"){
      res.status(200).send({status:`Se borro correctamente una cantidad del producto ${productId}`}  )
    }
    res.send(await cartDao.deleteProductToCart(cartId, productId));
  }

//UPDATE
export const putCarts_Ctrl =  async (req, res) => {
    let cartId = req.params.cid;
    let product = req.body;
    res.send(await cartDao.updateCart(cartId, product));
  }

export const putCartsProd_Ctrl =  async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let quantity = req.body.quantity;
    res.send(await cartDao.updateproductToCart(cartId, productId, quantity));
  }