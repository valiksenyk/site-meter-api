const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require('../middleware/check-auth');

const Site = require('../models/site');

router.get("/", checkAuth, (req, res, next) => {
    Site.find()
        .select("site origin generalResult timeToFirstPaint domSize")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                sites: docs.map(doc => {
                    return {
                        origin: doc.origin,
                        generalResult: doc.generalResult,
                        timeToFirstPaint: doc.timeToFirstPaint,
                        domSize: doc.domSize,
                        _id: doc._id
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/", checkAuth, (req, res, next) => {
    Site.find({origin: req.body.origin})
        .exec()
        .then(site => {
            if (site.length >= 1) {
                return res.status(409).json({
                    message: "Site exists"
                });
            } else {
                const site = new Site({
                    _id: new mongoose.Types.ObjectId(),
                    origin: req.body.origin,
                    generalResult: req.body.generalResult,
                    timeToFirstPaint: req.body.timeToFirstPaint,
                    domSize: req.body.domSize,
                });
                site
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Site added successfully",
                            createdProduct: {
                                origin: result.origin,
                                generalResult: result.generalResult,
                                timeToFirstPaint: result.timeToFirstPaint,
                                domSize: result.domSize,
                                _id: result._id,
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
});

module.exports = router;