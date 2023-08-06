import UserDao from "../DAO/UserDao.js";

const userDao = new UserDao();


// GETS
export const getRegister_Ctrl =  (req, res) => {
    res.render('register', {style:"base.css"})
}

export const getRegisterError_Ctrl =async(req,res)=>{
    res.render('register-error',{})
}

export const getLogin_Ctrl = async (req, res) => {
    res.render('login', {})
}

export const getLoginError_Ctrl =  async (req, res) => {
    res.render('login-error',{});
}

export const getProfile_Ctrl =  async (req, res) => {
    let user = await userDao.getByEmail(req.session.user);
    user = JSON.parse(JSON.stringify(user));
    res.render('profile', { user: user });
  }

export const getLogout_Ctrl = (req, res) => {
    req.session.destroy(error => {
        res.render('login',{message:'¡Deslogeado correctamente!'})
    })
}

export const getGithub_Ctrl = async (req,res)=>{}

export const getGithubCallback_Ctrl = async (req,res)=>{
    req.session.user = req.user.email;
    res.redirect('/products');
}

export const getCurrent_Ctrl = async(req,res)=>{
    const userEmail = req.session.user; //guardo la session en userEmail
    const user = await userDao.getByEmail(userEmail); //busco en la db si existe ese usuario
    if (!user) {
        // Si no se encuentra el usuario, devolver un mensaje de error
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);//si lo encuentra envio el json del usuario
}

export const postRegister_Ctrl =  async (req, res) => {
    res.render('login')
    }

export const postLogin_Ctrl =  async (req, res) => {
    if (!req.user) res.render('login-error',);
    if (req.user.email=='adminCoder@coder.com'){
        req.session.admin=true;
        req.session.user=req.user.email;
        res.redirect('/products')
    }else{
        req.session.user = req.user.email;
      res.redirect('/products')
    }
    }