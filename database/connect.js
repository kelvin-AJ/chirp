require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let _db;


module.exports = {
    async initializeDb(callback) {
        if(_db) {
            console.log("Db is already initialized!")
            return callback(null, _db)
        };


        try{
            _db = await MongoClient.connect(process.env.MONGODB_URI);
        callback(null, _db);
        }catch (error) {
            callback(error)
        };
    },


    getDb() {
        if(!_db){
            throw Error("Database not initialized.'")
        }
        return _db
    }
}