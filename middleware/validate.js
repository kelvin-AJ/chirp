const validator = require("../utilities")

module.exports = {
    addChirp (req, res, next) {
        const validationRule = {
            chirperName: "required|string|min:3",
            chirp: "required|string|min:3"
        }

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }});
    },


    updateChirp (req, res, next) {
            const validationRule = {
            chirperName: "required|string|min:3",
            chirp: "required|string|min:3",
            timestamp: "required",
            likes: "required",
            dislikes: "required"
        }


    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
        });
        } else {
            next();
    }});
    }
}