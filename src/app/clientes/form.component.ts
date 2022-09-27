import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  public titulo: string = "Crear Cliente"
  public errores!: string[];

  constructor(private ClienteService: ClienteService,
  private router: Router,
  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();

  }

  cargarCliente():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.ClienteService.getCliente(id).subscribe((cliente)=>this.cliente = cliente)
      }
    })

  }

  public create(): void{
    this.ClienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente',` El cliente  : ${cliente.nombre} ha sido creado con exito `, 'success')
      },
      err => {
        this.errores = err.error.error as string[];
        console.error('Codigo del error desde el backend '+err.status);
        console.error(err.error.error)

      }
    );
    console.log("Cliked")
    console.log(this.cliente)
  }

  update():void{
    this.ClienteService.update(this.cliente).subscribe(
      json=>{
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado',` ${json.mensaje} : ${json.cliente.nombre} `, 'success')
      },
      err => {
        this.errores = err.error.error as string[];
        console.error('Codigo del error desde el backend'+err.status);
        console.error(err.error.error)
      }
    );
  }



}
