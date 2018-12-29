const mongoose = require ('mongoose');
const URI = 'mongodb://localhost/mern-liverpool';


mongoose.connect(URI)
	.then(db => console.log('Conectado a mongodb'))
	.catch(err => console.log(err));

module.exports = mongoose;