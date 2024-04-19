const { Schema, model } = require('../connection')

// import Schema from 'mongoose'
const mySchema = new Schema({
    title: { type: String, required: true, unique: true },
    image: [{ type: String, required: true }],
    description: { type: String, required: true },
    color: String,
    material: String,
    embroidery: String,
    price: { type: Number, required: true },
    stitched: Boolean,
    discount: { type: Number, default: 0 },
    gender: { type: String, required: true },
    stock: { type: Number },
    sizes: { type: String, required: true },
    offer: { type: Number, default: 0 },
})

module.exports = model('chikanproducts', mySchema);

