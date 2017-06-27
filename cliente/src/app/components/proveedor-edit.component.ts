import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ProveedorService } from '../services/proveedor.service';
import { UploadService } from '../services/upload.service';
import { Proveedor } from '../models/proveedor';


@Component({
	selector: 'proveedor-edit',
	templateUrl: '../views/proveedor-add.html',
	providers: [UserService, ProveedorService, UploadService]
})

export class ProveedorEditComponent implements OnInit{
	public titulo: string;
	public proveedor: Proveedor;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public is_edit;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _uploadService: UploadService,
		private _proveedorService: ProveedorService
	){
		this.titulo = 'Editar Proveedor';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.proveedor = new Proveedor('', '', '');
		this.is_edit = true;
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

	onSubmit(){
		console.log(this.proveedor);
		this._route.params.forEach((params: Params) =>{
			let id = params['id'];

			this._proveedorService.editProveedor(this.token, id, this.proveedor).subscribe(
				response => {
					if(!response.proveedor){
						this.alertMessage = 'Error en el servidor.';
					}else{
						this.alertMessage = 'El Proveedor ha sido actualizado correctamente a la Base de Datos. ';

						// Subir la imagen de proveedores
						this._uploadService.makeFileRequest(this.url+'upload-image-proveedor/'+id, [], this.filesToUpload, this.token, 'image').then(
							(result) => {
								 this._router.navigate(['/proveedores', 1]);
							},
							(error) => {
								console.log(error);
							}
						);

						//this.proveedor = response.proveedor;
						//this._router.navigate(['/editar-proveedor'], response.proveedor._id);
					}
				},
				error => {
		  			var errorMessage = <any>error;

		  			if (errorMessage != null) {
		  				var body = JSON.parse(error._body);
		  				this.alertMessage = body.message;
		  			}
				}
			);
		});
	}

	public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}






