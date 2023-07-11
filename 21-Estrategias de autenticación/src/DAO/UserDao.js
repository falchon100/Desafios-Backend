import { userModel } from "./model/user.model.js";

export default class UserDao{
 constructor (){
    this.model= userModel;
 }
async getAll(){
    let result;
    try {
        result = await userModel.find()
    } catch (error) {
        console.log(error)
    }
    return result;
}

async getByEmail(email){
    let result;
    try {
        result = await userModel.findOne({ email })
    } catch (error) {
       return {status:'error',message:'No se encontro ese email registrado'}
    }
    return result; 
}

async createUser(user){
    let result;
    try {
        result = await userModel.create(user)
    } catch (error) {
        console.log(error)
    }
    return result;
}

async getById(id){
    let result;
    try {
        result = await userModel.findOne({id})
    } catch (error) {
        console.log(error)
    }
    return result;
}

}





