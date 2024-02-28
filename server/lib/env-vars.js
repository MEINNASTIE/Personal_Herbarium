import 'dotenv/config';


console.log( "env",process.env);

const uri=process.env.DB_URI;
const port=process.env.PORT;
const dbName=process.env.DB_NAME;
const JWT_SECRET=process.env.JWT_SECRET
const client_app_url = process.env.CLIENT_APP_URL;

export {uri,port,dbName,JWT_SECRET,client_app_url};