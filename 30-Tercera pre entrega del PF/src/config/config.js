import dotenv from 'dotenv';


dotenv.config();


export default {
    port: process.env.PORT,
    MONGO_URL :process.env.MONGO_URL,
    KEY_SECRET : process.env.KEY_SECRET,
    ADMIN_EMAIL : process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD : process.env.ADMIN_PASSWORD
}