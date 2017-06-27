import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProveedorService } from '../services/proveedor.service';
import { Proveedor } from '../models/proveedor';


@Component({
	selector: 'proveedor-detail',
	templateUrl: '../views/proveedor-detail.html',
	providers: [UserService, ProveedorService]
})

export class ProveedorDetailComponent implements OnInit{
	public proveedor: Proveedor;
	public identity;
	public token;
	public url: string;
	public alertMessage;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _proveedorService: ProveedorService
	){
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		console.log('Proveedor-edit componente add cargado');
		//llamar al método del api para sacar un artista en base a su id getproveedor

		this.getProveedor();
	}

	getProveedor(){
		this._route.params.forEach((params: Params) =>{
			let id = params['id'];
			this._proveedorService.getProveedor(this.token, id).subscribe(
				response => {
					//this.proveedor = response.proveedor;
					if (!response.proveedor) {
						this._router.navigate(['/']);
					}else{
						this.proveedor = response.proveedor;

						// Sacar los servicios del proveedor

					}
				},
				error => {
		  			var errorMessage = <any>error;

		  			if (errorMessage != null) {
		  				var body = JSON.parse(error._body);
		  				//this.alertMessage = body.message;
		  			}
				}
			);
		});
	}

}






