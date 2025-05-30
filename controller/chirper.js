const mongoDb = require("../database/connect");

module.exports = {
        async getChirpers(req, res) {

        try{

            const collection = mongoDb.getDb().db().collection("chirpers");
            const chirpers = await collection.find().toArray();

            res.status(200).json(chirpers);

         }catch (err) {
             res.status(500).json(err || "Couldn't get chirps");
        }
    },

    async chirperExists(res, name){

        try{
            const collection = mongoDb.getDb().db().collection("chirpers");
            const chirper = await collection.findOne({chirperName: name});
            
            return  typeof chirper.chirperName == "string"? true : false;
        }catch(err) {
            res.status(500).json(err || "Error confirming chirper");
        }
        
    },

    async addChirper(res, name){
        try{
            const collection = mongoDb.getDb().db().collection("chirpers");
            const chirper = {chirperName: name};
        

        const response = await collection.insertOne(chirper);
        return response.acknowledged;
        }
          catch (err) {
            res.status(500).json(err.message || "Couldn't create chirper");
        }
    }
}