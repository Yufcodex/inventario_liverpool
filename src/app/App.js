import React, { Component } from 'react';

class App extends Component {

	constructor(){
		super();
		this.state = {
			product_name: "",
			product_price: "",
			product_image: "",
			inventario: []
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
			this.setState({product_name: '', product_price: '', product_image:''});
			this.fetchInventario();
		})
		.catch(err => console.log(err));

		console.log(this.state)
		e.preventDefault();
	}

	deleteProd(id){
		fetch('/api/inventario/'+id, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}			
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			M.toast({html: 'Porducto borrado'});
			this.fetchInventario();
		})
		.catch(err => console.log(err));
	}

	componentDidMount(){
		this.fetchInventario();
	}

	fetchInventario(){
		fetch('/api/inventario')
		.then(res => res.json())
		.then(data => {
			this.setState({inventario: data})
		})
		.catch(err => console.log(err));
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
							<table>
								<thead>
									<tr>
										<th>Producto</th>
										<th>Precio</th>
										<th>Imagen</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.inventario.map(prod => {
											return(
												<tr key={prod._id}>
													<td>{prod.product_name}</td>
													<td>{prod.product_price}</td>
													<td>{prod.product_image}</td>
													<td>
														<button onClick={() => this.deleteProd(prod._id)}><i className="material-icons">delete</i></button>
														<button style={{margin: '4px'}}><i className="material-icons">edit</i></button>
													</td>
												</tr>
											)

										})
									}
								</tbody>
							</table>
						</div>						
					</div>
				</div>
			</div>	
		)
	}
}


export default App;