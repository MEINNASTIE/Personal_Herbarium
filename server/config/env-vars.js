import "dotenv/config";

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const port = process.env.PORT;
const jwt = process.env.JWT_SECRET;

export{uri, dbName, port, jwt};