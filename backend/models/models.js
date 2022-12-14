const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//collection for organization
let organizationSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    organizationName: {
        type: String,
        require: true,
        unique: true
    }
}, {
    collection: 'organizations'
});

//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
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
            type: String,
        }
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organization',
        required: true
    }
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
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }],
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'organization',
        required: true
    }
}, {
    collection: 'eventData'
});



// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const organizations = mongoose.model('organizations', organizationSchema);

// package the models in an object to export 
module.exports = { primarydata, eventdata, organizations }
