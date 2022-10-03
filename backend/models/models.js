const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        require: true
    },
    orgID: {
        type: String,   
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    contact: {
        email: {
            type: String
        },
        phoneNumbers: {
            type: Array,
            required: true
        },
        address: {
            line1: {
                type: String
            },
            line2: {
                type: String,
            },
            city: {
                type: String,
                required: true
            },
            county: {
                type: String,
            },
            zip: {
                type: int,
            }
        }
    },          
    
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    eventName: {
        type: String,
        require: true
    },
    orgID: {
        type: int
    },
    chwID: {
        type: int
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: int,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }]
}, {
    collection: 'eventData'
});

//collection for ORG data
let ORGDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    orgCode: {
        type: int,
        require: true
    },
    orgName: {
        type: String
    },
    contact: {
        email: {
            type: String
        },
        phoneNumbers: {
            type: Array,
            required: true
        },
        address: {
            line1: {
                type: String
            },
            line2: {
                type: String,
            },
            city: {
                type: String,
                required: true
            },
            county: {
                type: String,
            },
            zip: {
                type: int,
            }
        }
    },          
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }]
}, {
    collection: 'orgData'
});

//collection for ORG data
let chwDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    chwID: {
        type: int,
        require: true
    },
    contact: {
        email: {
            type: String
        },
        phoneNumbers: {
            type: Array,
            required: true
        },
        address: {
            line1: {
                type: String
            },
            line2: {
                type: String,
            },
            city: {
                type: String,
                required: true
            },
            county: {
                type: String,
            },
            zip: {
                type: int,
            }
        }
    },          
}, {
    collection: 'chwData'
});
// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const orgdata = mongoose.model('orgData', eventDataSchema);
const chwdata = mongoose.model('chwtData', eventDataSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata }
