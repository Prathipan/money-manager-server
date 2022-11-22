var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
let connection,db;

const connectDb = async () => {
    connection  = await mongoClient.connect(process.env.mongoapi);

    db =  connection.db("Transaction");

    return db;
}

async function closeConnection () {
    if(connection){
        await connection.close();
    }else {
        console.log("no connection");
    }
}

module.exports = {connectDb,db,connection,closeConnection}