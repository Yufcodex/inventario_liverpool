import React, { Component } from 'react';

class App extends Component {

	constructor(){
		super();
		this.state = {
			product_name: "",
			product_price: "",
			product_image: ""
		};
		this.addProduct = this.addProduct.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	addProduct(e){
		fetch('/api/inventario', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			M.toast({html: 'Producto Guardado con exito'});
			this.setState({product_name: '', product_price: '', product_image:''})
		})
		.catch(err => console.log(err));

		console.log(this.state)
		e.preventDefault();
	}

	handleChange(e){
		const {name, value} = e.target;
		this.setState({
			[name]: value
		});
	}

	render(){
		return (
			<div>
				<nav className="pink accent-4">
					<div className="container">
						<a className="brand-logo" href="/">Inventario Liverpool con React (MERN)</a>
					</div>	
				</nav>

				<div className="container">
					<div className="row">
						<div className="col s5">
							<div className="card">
								<div className="card-content">
									<form onSubmit={this.addProduct}>
										<div className="row">
											<div className="input-field col s12">
												<input name="product_name" onChange={this.handleChange} type="text" placeholder="Nombre de producto" value={this.state.product_name} />
											</div>
										</div>
										<div className="row">
											<div className="input-field col s12">
												<input name="product_price" onChange={this.handleChange} type="text" placeholder="Precio del producto" value={this.state.product_price}/>
											</div>
										</div>
										<div className="row">
											<div className="input-field col s12">
												<input name="product_image" type="file" value={this.state.product_image}/>
											</div>
										</div>	
										<button type="submit"className="btn pink accent-4">Guardar
										</button>																
									</form>
								</div>
							</div>
						</div>
						<div className="col s7">
						</div>						
					</div>
				</div>
			</div>	
		)
	}
}


export default App;