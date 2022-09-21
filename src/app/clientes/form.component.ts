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
        swal.fire('Nuevo Cliente',`Cliente ${cliente.nombre} creado con exito`, 'success')
      }
    );
    console.log("Cliked")
    console.log(this.cliente)
  }

  update():void{
    this.ClienteService.update(this.cliente).subscribe(
      cliente=>{
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado',`Cliente ${cliente.nombre} actualizado con exito`, 'success')
      }
    )
  }



}
