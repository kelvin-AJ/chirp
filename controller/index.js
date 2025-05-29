const mongoDb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;



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
            console.log(chirps)
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
        

        const response = await collection.insertOne(chirp)
        if (response.acknowledged) {
            res.status(201).json(response);
        
         }}
          catch (err) {
            res.status(500).json(error || "Couldn't create chirp");
        }
    }
}