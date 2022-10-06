const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 
let { organizations } = require("../models/models"); 

//allow using a .env file
require("dotenv").config();  

const ORGANIZATION = process.env.ORGANIZATION;

//GET all entries
router.get("/", (req, res, next) => { 
    organizations.findOne({ organizationName: ORGANIZATION }, (error, data) => { 
        if (error) {
            console.log(error)
        } else {
            eventdata.find({organization: data._id},
                (error, data) => {
                    if (error) {
                        return next(error);
                    } else {
                        res.json(data);
                    }
                }
            ).sort({ 'updatedAt': -1 }).limit(10);
        }
    });
});


//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => { const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 
let { organizations } = require("../models/models"); 

//allow using a .env file
require("dotenv").config();

const ORGANIZATION = process.env.ORGANIZATION;

//GET all entries
router.get("/", (req, res, next) => { 
    organizations.findOne({ organizationName: ORGANIZATION }, (error, data) => { 
        if (error) {
            console.log(error)
        } else {
            eventdata.find({organization: data._id},
                (error, data) => {
                    if (error) {
                        return next(error);
                    } else {
                        res.json(data);
                    }
                }
            ).sort({ 'updatedAt': -1 }).limit(10);
        }
    });
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
        eventdata.find({ _id: req.params.id }, (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        });
});

//GET entries based on search query
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    organizations.findOne({ organizationName: ORGANIZATION }, (error, data) => { 
        if (error) {
            console.log(error)
        } else {
            dbQuery['organization'] = data._id
            console.log(dbQuery)
            eventdata.find(
                dbQuery,
                (error, data) => {
                    if (error) {
                        return next(error);
                    } else {
                        res.json(data);
                    }
                }
            );
        }
    });
    
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => {
    organizations.findOne({ organizationName: req.body.organization }, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            if (doc) {
                req.body.organization = doc._id
                eventdata.create(
                    req.body,
                    (error, data) => {
                        if (error) {
                            return next(error);
                        } else {
                            res.json(data);
                        }
                    }
                );
            }
        }
    });
});
;

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//PUT add attendee to event
router.put("/addAttendee/:id", (req, res, next) => {
    //only add attendee if not yet signed up yet
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                console.log(data, data.length)
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                return next(error);
                            } else {
                                res.json(data);
                            }
                        }
                    );
                } else {
                    res.json({"message": "failed", "data": "Client has already signed up for this event"});
                }
                
            }
        }
    );
    
});


module.exports = router;