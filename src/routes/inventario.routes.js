const express = require ('express');
const router = express.Router();

const Inventario = require('../model/inventario');

router.get('/',async (req, res) => {
	const productos = await Inventario.find();
	console.log(productos);
	res.json(productos);
});

router.get('/:id',async (req, res) => {
	const productos = await Inventario.findById(req.params.id);
	res.json(productos);
});

router.post('/',async (req, res) => {
	const {product_name, product_price, product_image} = req.body;
	const product = new Inventario({product_name, product_price, product_image});
	await product.save();
	res.json({status: 'Guardado con exito.'});
});

router.put('/:id', async (req, res) => {
	const {product_name, product_price, product_image} = req.body;
	const newInventario = {product_name, product_price, product_image};
	await Inventario.findByIdAndUpdate(req.params.id, newInventario);
	res.json({status : 'Actualizado con exito.'});
});

router.delete('/:id',async (req, res) =>{
	await Inventario.findByIdAndRemove(req.params.id);
	res.json({status : 'Producto eliminado.'});
});

module.exports = router;