const express = require('express');

const model = require('../models/productmodel');

const router = express.Router();
router.post('/add', (req, res) => {
    console.log(req.body)
    new model(req.body).save()

        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    // res.send("add response from user ")
});



router.get('/getall', (req, res) => {
    model.find()
        .then((result) => {
            res.json(result);

        }).catch((err) => {
            console.log(err)
            res.json(err)
        });
});
router.get('/getbyid/:id', (req, res) => {
    model.findById(req.params.id)
        .then((result) => {
            res.json(result);

        }).catch((err) => {
            console.log(err)
            res.json(err)
        });
});

router.get('/getbygender/:gender', (req, res) => {
    model.find({gender : req.params.gender})
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err)
            res.json(err)
        });
});

router.get('/update/:id', (req, res) => {
    model.findByIdAndUpdate(req.params.id, req.body, {new : true})
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
            res.json(err)
        });
});

router.delete('/delete/:id', (req, res) => {

    model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result);

        }).catch((err) => {
            console.log(err);
            res.json(err)
        });
});
module.exports = router;
//getall
//getbyid
// update
//delete
//product router

