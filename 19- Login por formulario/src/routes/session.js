import { Router } from "express";
import { requireLogin,requireLogout } from "../middleware/auth.js";
import UserDao from "../DAO/UserDao.js";

const sessionRouter = Router();

//utilizo el middleware requierelogout para que no pueda renderizar el registro ya que ya hay una session activa
sessionRouter.get('/register',requireLogout, (req, res) => {
    res.render('register', {style:"base.css"})
})

//guardo los datos en user , y busco en la db si ya existe ese email, si ya existe envio error , y sino lo creo al usuario
sessionRouter.post('/register',async (req, res) => {
    let user = req.body;
    let userFound = await userDao.getByEmail(user.email);
    if(userFound){
        res.render('login-error',{message:'Ya hay un usuario registrado con ese Email'})
    }
    let result = await userDao.createUser(user)
    res.render('login', {status:'registrado correctamente'})
})
//utilizo el middleware requierelogout para que no pueda renderizar el login ya que ya hay una session activa
sessionRouter.get('/login',requireLogout,async (req, res) => {
    res.render('login', {})
})

// Leo los datos del cliente y los de la db ,si no existe el mail renderizo error , y si los datos corresponden con la db lo traslado a product
//sino renderizo error
sessionRouter.post('/login', async (req, res) => {
    let user = req.body;
    let result = await userDao.getByEmail(user.email)
    //si 
    if (user.email === 'adminCoder@coder.com' && user.password === 'adminCod3r123'){
        req.session.admin=true,
        req.session.user = user.email;
     return   res.redirect('/products')
    }
        if (!result){
        return res.render('login-error',{message:'No existe el email ingresado'})
        }
         if(user.password == result.password && user.email == result.email){
            req.session.user = user.email;
            res.redirect('/products')
            }else{
            res.render('login-error',{message:'la contraseña no es correcta'})
        }
})

sessionRouter.get('/profile', requireLogin, async (req, res) => {
    let user = await userDao.getByEmail(req.session.user);
    user = JSON.parse(JSON.stringify(user));
    res.render('profile', { user: user });
  });

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.render('login',{message:'Deslogeado correctamente'})
    })
})

// INICIALIZO LA INSTANCIA USERDAO
const userDao = new UserDao();


export default sessionRouter;