import { Router } from "express";
import { requireLogin,requireLogout } from "../middleware/auth.js";
import UserDao from "../DAO/UserDao.js";
import passport from "passport";

const sessionRouter = Router();

//utilizo el middleware requierelogout para que no pueda renderizar el registro ya que ya hay una session activa
sessionRouter.get('/register',requireLogout, (req, res) => {
    res.render('register', {style:"base.css"})
})

//guardo los datos en user , y busco en la db si ya existe ese email, si ya existe envio error , y sino lo creo al usuario
sessionRouter.post('/register',passport.authenticate('register',{failureRedirect:"register-error"}), async (req, res) => {
res.render('login')
})

sessionRouter.get('/register-error',async(req,res)=>{
    res.render('register-error',{})
})
//utilizo el middleware requierelogout para que no pueda renderizar el login ya que ya hay una session activa
sessionRouter.get('/login',requireLogout,async (req, res) => {
    res.render('login', {})
})

// Leo los datos del cliente y los de la db ,si no existe el mail renderizo error , y si los datos corresponden con la db lo traslado a product
//sino renderizo error
sessionRouter.post('/login',passport.authenticate('login',{failureRedirect:'/api/sessions/login-error'}), async (req, res) => {
if (!req.user) res.render('login-error',);
if (req.user.email=='adminCoder@coder.com'){
    req.session.admin=true;
    req.session.user=req.user.email;
    res.redirect('/products')
}else{
    req.session.user = req.user.email;
  res.redirect('/products')
}
})

sessionRouter.get('/login-error', async (req, res) => {
    res.render('login-error',{});
});

sessionRouter.get('/profile', requireLogin, async (req, res) => {
    let user = await userDao.getByEmail(req.session.user);
    user = JSON.parse(JSON.stringify(user));
    res.render('profile', { user: user });
  });

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.render('login',{message:'¡Deslogeado correctamente!'})
    })
});

sessionRouter.get('/github',passport.authenticate('github',{scope :['user:email']}),async (req,res)=>{})

sessionRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/api/sessions/login-error'}),async (req,res)=>{
    req.session.user = req.user.email;
    res.redirect('/products');
});

// utilizo el middleware para que tenga session, 
sessionRouter.get('/current',requireLogin,async(req,res)=>{
    const userEmail = req.session.user; //guardo la session en userEmail
    const user = await userDao.getByEmail(userEmail); //busco en la db si existe ese usuario
    if (!user) {
        // Si no se encuentra el usuario, devolver un mensaje de error
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);//si lo encuentra envio el json del usuario
})


// INICIALIZO LA INSTANCIA USERDAO
const userDao = new UserDao();


export default sessionRouter;