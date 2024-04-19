const {Schema, model, Types} = require('../connection');

const myschema = new Schema({
    user : {type : Types.ObjectId, ref : 'users'},
    items: {type : Array},
    intentId: {type : String, unique : true, required : true},
    details: {type : Object},
    shipping: {type : Object},
    status: {type : String, default : 'placed'},
    createdAt: {type : Date, default : Date.now}
});

module.exports = model('order', myschema);

