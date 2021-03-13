import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Result } from 'src/app/models/result.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result-details',
  templateUrl: './result-details.component.html',
  styleUrls: ['./result-details.component.scss']
})
export class ResultDetailsComponent implements OnInit {
  result:Result;
  colProceso:number;
  colActividad:number;
  colCaracteristica:number;
  constructor(public dialogoReg:MatDialogRef<ResultDetailsComponent>) { }

  ngOnInit(): void {
    this.inicializarColumnas();
    console.log("Resultado en details:  ",this.result.proceso[0].nombre);
  }
  inicializarColumnas(){
    this.colProceso=this.columnsProceso();
    this.colCaracteristica=0;
    this.colActividad=0;

  }
  generarNombre(){
    Swal.fire({
      title: 'El sistema en el proceso leer huella con la actividad Cargar huella, con respecto a la seguridad en la atenticidad deberá: a traves de la huella dactilar, deberá almacenar la imagen y los archivos distancia en formatos .JPEG y .TXT respectivamente',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
  columnsProceso():number{
    let maxColumns=0;
    for(let p of this.result.proceso){
      for(let a of p.actividad){
        for(let c of a.caracteristica){
          for(let r of c.rnf){
            for(let e of r.elemento){
             if(maxColumns<e.datos.length)
             {
               maxColumns=e.datos.length;
             }
            }
          }
        }
      }
    }
    console.log("Numero de columnas de Proceso:  ",maxColumns);
    return maxColumns;
  }

}
