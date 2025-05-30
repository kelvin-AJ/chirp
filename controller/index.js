const mongoDb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;
const chirperController = require("./chirper")



module.exports = {
    async getAllChirps(req, res) {
        try{
            const collection = mongoDb.getDb().db().collection("chirps");
            const chirps = await collection.find().toArray();
            res.status(200).json(chirps)
        }catch (err) {
             res.status(500).json(err || "Couldn't get chirps");
        }
    },

    async getOneChirp(req, res) {
        try{
            const chirpID = req.params.id;

            if (!ObjectId.isValid(chirpID)) {
             res.status(400).json("Must use a valid Chirp ID");
            }     

            const collection = mongoDb.getDb().db().collection("chirps");
            const chirps = await collection.find({_id: new ObjectId(chirpID)}).toArray();
            res.status(200).json(chirps)
        }catch (err) {
             res.status(500).json(err || "Couldn't get chirps");
        }
    },


    async addChirp(req, res) {
        try{
            const collection = mongoDb.getDb().db().collection("chirps");
            const chirp = {
                chirperName: req.body.chirperName,
                chirp: req.body.chirp,
                timestamp: Date.now(),
                likes: 0,
                dislikes: 0
            };
            
            
        // Create Chirpers
        if(!await chirperController.chirperExists(res, req.body.chirperName)){
            chirperController.addChirper(res, req.body.chirperName)
        }

        const response = await collection.insertOne(chirp);
        if (response.acknowledged) {
            res.status(201).json(response);
            return
        
         }else {
            res.status(400).json(response || "Couldn't create Chirp")
         }
        }
          catch (err) {
            res.status(500).json(err.message || "Couldn't create chirp");
        }
    },


    async updateChirp(req, res) {
        try{
            const chirpID = req.params.id;

            if (!ObjectId.isValid(chirpID)) {
             res.status(400).json("Must use a valid Chirp ID");
            }   
            console.log(chirpID)

            const collection = mongoDb.getDb().db().collection("chirps");
            const chirp = {
                chirperName: req.body.chirperName,
                chirp: req.body.chirp,
                timestamp: req.body.timestamp,
                likes: req.body.likes,
                dislikes: req.body.dislikes,
                modifiedDate: Date.now()
            }

            if(!await chirperController.chirperExists(res, req.body.chirperName)){
                chirperController.addChirper(res, req.body.chirperName)
            }
            
            const response = await collection.replaceOne({_id: new ObjectId(chirpID)}, chirp);
            console.log(response)
            if(response.modifiedCount > 0){
                res.status(200).json(response);
            }else if(response.acknowledged){
                res.status(400).json("No Changes made")
            }else{
                res.status(400).json("couldn't update chirp")
            }

        }catch (err) {
            res.status(500).json(err.message || "Couldn't update Chirp");
        }
    },

    async deleteChirp(req, res) {
        try{
            const chirpID = req.params.id;

            if (!ObjectId.isValid(chirpID)) {
             res.status(400).json("Must use a valid Chirp ID");
            }     

            const collection = mongoDb.getDb().db().collection("chirps");
            const response = await collection.deleteOne({_id: new ObjectId(chirpID)}, true)


            if(response.deletedCount > 0){
                res.status(200).json("Chirp deleted Successfully")
            }else{
            res.status(404).json("Chirp not found or already deleted")
            }
        }catch (err) {
             res.status(500).json(err.message || "Couldn't delete Chirp");
        }
    },



    async createServererror(req, res) {
        try{

            const collection = mongoDb.getDb().db().collection("chirps");
            const response = await collection.deleteOne({problem: "this should cause an error"}, true)

            console.log(response / nonExistent)
        }catch (err) {
             res.status(500).json("Yup, that's an error alright 😉");
        }
    }
}