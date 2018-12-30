import React, { Component } from 'react';

class App extends Component {

	constructor(){
		super();
		this.state = {
			product_name: "",
			product_price: "",
			product_image: null,
			inventario: [],
			_id: ""
		};
		this.addProduct = this.addProduct.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	addProduct(e){
		if(this.state._id){
			fetch('/api/inventario/'+this.state._id, {
				method: 'PUT',
				body: JSON.stringify(this.state),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}				
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				M.toast({html: 'Producto Actualizado con exito'});
				this.setState({product_name: '', product_price: '', product_image:null, inventario: [], _id: ""});
				this.fetchInventario();
			})
			.catch(err => console.log(err));
		}
		else{
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
				this.setState({product_name: '', product_price: '', product_image:null, inventario: [], _id: ""});
				this.fetchInventario();
			})
			.catch(err => console.log(err));
		}

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

	editProd(id){
		fetch('/api/inventario/'+id)
		.then(res => res.json())
		.then(data => {
			this.setState({
				product_name: data.product_name,
				product_price: data.product_price,
				product_image: null,
				_id: data._id			
			});
		});
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

	fileSelected (event) {
		console.log(event.target.files[0]);
		let image = event.target.files[0];
		this.setState({
			product_image: image
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
						<div className="col s5" style={{padding: '25px'}}>
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
												<input name="product_image" type="file" onChange={this.fileSelected}/>
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
														<button onClick={() => this.editProd(prod._id)} style={{margin: '4px'}}><i className="material-icons">edit</i></button>
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
				<footer className="page-footer pink accent-4" style={{marginTop: '285px'}}>
		          	<div className="footer-copyright pink accent-4">
			            <div className="container pink accent-4">
			            Fernando Eugenio Vidal Jimenéz
			            <a className="grey-text text-lighten-4 right" href="#!">Buscar en Liverpool</a>
			            </div>
		          	</div>
            	</footer>				
			</div>	
		)
	}
}


export default App;