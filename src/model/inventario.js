const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
	product_name : { type: String, required: true},
	product_price : { type: Number, required: true},
	product_image : { contentType: String, data: Buffer}
});


module.exports = mongoose.model('Productos', ProductSchema);