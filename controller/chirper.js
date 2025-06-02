const mongoDb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;
const chirperHelper = require("../utilities/chirperHelper")

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
     async getOneChirper(req, res) {
            try{
                const chirperID = req.params.id;
                
                if (!ObjectId.isValid(chirperID)) {
                 res.status(400).json("Must use a valid Chirper ID");
                }     
    
                const collection = mongoDb.getDb().db().collection("chirpers");
                const chirpers = await collection.find({_id: new ObjectId(chirperID)}).toArray();
                res.status(200).json(chirpers)
            }catch (err) {
                 res.status(500).json(err || "Couldn't get chirpers");
            }
        },

    async addChirperAdimin(req, res) {
        try{

            const collection = mongoDb.getDb().db().collection("chirpers");
            const chirper = {
                chirperName: req.body.chirperName
            }

            if(await chirperHelper.chirperExists(res, chirper.chirperName)) {
                    res.status(400).json("Chirper already exists")
                    return
            }

            
            const response = await collection.insertOne(chirper);
            if (response.acknowledged) {
                res.status(201).json(response);
                return
            
            }else {
                res.status(400).json(response || "Couldn't create Chirper")
            }
            }
            catch (err) {
                res.status(500).json(err.message || "Couldn't create chirper");
            }
    },
    
    
    async updateChirper(req, res) {
        try{
            const chirperID = req.params.id;

            if (!ObjectId.isValid(chirperID)) {
                res.status(400).json("Must use a valid Chirper ID");
            }   

            const collection = mongoDb.getDb().db().collection("chirpers");
            const chirper = {
                chirperName: req.body.chirperName
            }

            
            const response = await collection.replaceOne({_id: new ObjectId(chirperID)}, chirper);
            if(response.modifiedCount > 0){
                res.status(200).json(response);
            }else if(response.acknowledged){
                res.status(400).json("No Changes made")
            }else{
                res.status(400).json("couldn't update chirper")
            }

        }catch (err) {
            res.status(500).json(err.message || "Couldn't update Chirper");
        }
    },

    async deleteChirper(req, res) {
        try{
            const chirperID = req.params.id;

            if (!ObjectId.isValid(chirperID)) {
                res.status(400).json("Must use a valid Chirper ID");
            }     

            const collection = mongoDb.getDb().db().collection("chirpers");
            const response = await collection.deleteOne({_id: new ObjectId(chirperID)}, true)


            if(response.deletedCount > 0){
                res.status(200).json("Chirper deleted Successfully")
            }else{
            res.status(404).json("Chirper not found or already deleted")
            }
        }catch (err) {
                res.status(500).json(err.message || "Couldn't delete Chirper");
        }
    }
}