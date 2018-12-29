const express = require ('express');
const router = express.Router();

const Inventario = require('../model/inventario');

router.get('/',async (req, res) => {

	const productos = await Inventario.find();
	console.log(productos);
	res.json(productos);

});

router.post('/',async (req, res) => {
	const {product_name, product_price, product_image} = req.body;
	const product = new Inventario({product_name, product_price, product_image});
	await product.save();
	res.json({status: 'Guardado con exito.'});
});

module.exports = router;