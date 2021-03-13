import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Result } from 'src/app/models/result.model';

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
