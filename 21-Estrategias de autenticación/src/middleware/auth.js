
//si hay una session activa , puede continuar
export const requireLogin = (req, res, next) => {
    if(req.session.user){
        next()
    }else{
        res.render('login', { status: 'Necesita Logearse, para ver los productos'})
    }
}
//si no hay una session , puede continuar
export const requireLogout = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.render('profile',{status:'Ya tienes una session abierta'});
    }
}