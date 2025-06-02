const mongoDb = require("../database/connect");


module.exports= {
    async chirperExists(res, name){
        try{
            const collection = mongoDb.getDb().db().collection("chirpers");
            const chirper = await collection.findOne({chirperName: name})

            return chirper != null? true : false;
        }catch(err) {
            res.status(500).json(err || "Error confirming chirper");
            return 
        }
        
    }
}