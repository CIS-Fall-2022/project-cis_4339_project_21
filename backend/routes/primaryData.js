const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { primarydata } = require("../models/models"); 
//let { eventdata } = require("../models/models"); 
let { organizations } = require("../models/models"); 


const ORGANIZATION = process.env.ORGANIZATION;

//{ organization: organization_id }, 
//GET all entries
router.get("/", (req, res, next) => { 
    organizations.findOne({ organizationName: ORGANIZATION }, (error, data) => {
        if (error) {
            console.log(error)
        } else {
            primarydata.find({organization: data._id},
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

/*
//GET all entries
router.get("/", (req, res, next) => { 
    primarydata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});
*/
//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    primarydata.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };

    organizations.findOne({ organizationName: ORGANIZATION }, (error, data) => { 
        if (error) {
            console.log(error)
        } else {
            dbQuery['organization'] = data._id
            console.log(dbQuery)
            primarydata.find(
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

    /*
    primarydata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
    */
});

//GET events for a single client
router.get("/events/:id", (req, res, next) => { 
    
});

//POST
router.post("/", (req, res, next) => {    
    organizations.findOne({ organizationName: req.body.organization }, function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            if (doc) {
                console.log(doc)
                req.body.organization = doc._id
                primarydata.create(
                    req.body,
                    (error, data) => {
                        if (error) {
                            return next(error);
                        } else {
                            res.json(data);
                        }
                    }
                );
                primarydata.createdAt;
                primarydata.updatedAt;
                primarydata.createdAt instanceof Date;    
            }
            
        }
    });
});

/*
router.post("/", (req, res, next) => { 
    primarydata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});
*/

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
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

module.exports = router;